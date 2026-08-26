import {
	AddTaskEntryInput,
	CreateTaskListInput,
	TaskEntriesByDate,
	TaskEntry,
	TaskList,
	TaskListSummary,
	TaskStorageAdapter,
	UpdateTaskListMetaInput,
} from "@/types/TasksTypes";

// Each task list is stored as its own JSON document under its own key, plus a
// lightweight index of ids so we can list them without deserializing every
// list. This mirrors how the data will eventually be organized as separate
// JSON files synced to Google Drive - swapping the storage backend later only
// requires implementing TaskStorageAdapter against the Drive API.

const INDEX_KEY = "tasks:index";
const listKey = (id: string) => `tasks:list:${id}`;

function assertBrowser() {
	if (typeof window === "undefined") {
		throw new Error("localStorageTaskAdapter can only be used in the browser");
	}
}

function generateId(): string {
	if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
		return crypto.randomUUID();
	}
	return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function readIndex(): string[] {
	assertBrowser();
	const raw = window.localStorage.getItem(INDEX_KEY);
	if (!raw) return [];
	try {
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}

function writeIndex(ids: string[]) {
	assertBrowser();
	window.localStorage.setItem(INDEX_KEY, JSON.stringify(ids));
}

function readList(id: string): TaskList | null {
	assertBrowser();
	const raw = window.localStorage.getItem(listKey(id));
	if (!raw) return null;
	try {
		return JSON.parse(raw) as TaskList;
	} catch {
		return null;
	}
}

function writeList(list: TaskList) {
	assertBrowser();
	window.localStorage.setItem(listKey(list.id), JSON.stringify(list));
}

function countEntries(entries: TaskEntriesByDate): number {
	return Object.values(entries).reduce((sum, dayEntries) => sum + dayEntries.length, 0);
}

function lastLoggedAt(entries: TaskEntriesByDate): string | undefined {
	let latest: string | undefined;
	for (const dayEntries of Object.values(entries)) {
		for (const entry of dayEntries) {
			if (!latest || entry.loggedAt > latest) {
				latest = entry.loggedAt;
			}
		}
	}
	return latest;
}

async function listSummaries(): Promise<TaskListSummary[]> {
	const ids = readIndex();
	const summaries: TaskListSummary[] = [];

	for (const id of ids) {
		const list = readList(id);
		if (!list) continue;

		summaries.push({
			id: list.id,
			name: list.name,
			description: list.description,
			trackQuantity: list.trackQuantity,
			itemCount: list.items.length,
			totalEntries: countEntries(list.entries),
			lastLoggedAt: lastLoggedAt(list.entries),
			createdAt: list.createdAt,
		});
	}

	return summaries.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

async function getList(id: string): Promise<TaskList | null> {
	return readList(id);
}

async function createList(input: CreateTaskListInput): Promise<TaskList> {
	const now = new Date().toISOString();
	const list: TaskList = {
		id: generateId(),
		name: input.name.trim(),
		description: input.description?.trim() || undefined,
		trackQuantity: input.trackQuantity,
		quantityLabel: input.trackQuantity
			? input.quantityLabel?.trim() || "Reps"
			: undefined,
		items: Array.from(
			new Set(input.items.map((item) => item.trim()).filter(Boolean)),
		),
		entries: {},
		createdAt: now,
		updatedAt: now,
	};

	writeList(list);
	writeIndex([...readIndex(), list.id]);

	return list;
}

async function updateListMeta(
	id: string,
	updates: UpdateTaskListMetaInput,
): Promise<TaskList> {
	const list = readList(id);
	if (!list) throw new Error("Task list not found");

	const updated: TaskList = {
		...list,
		name: updates.name?.trim() || list.name,
		description:
			updates.description !== undefined
				? updates.description.trim() || undefined
				: list.description,
		quantityLabel:
			updates.quantityLabel !== undefined
				? updates.quantityLabel.trim() || undefined
				: list.quantityLabel,
		updatedAt: new Date().toISOString(),
	};

	writeList(updated);
	return updated;
}

async function deleteList(id: string): Promise<void> {
	window.localStorage.removeItem(listKey(id));
	writeIndex(readIndex().filter((existingId) => existingId !== id));
}

async function addItem(id: string, itemName: string): Promise<TaskList> {
	const list = readList(id);
	if (!list) throw new Error("Task list not found");

	const trimmed = itemName.trim();
	if (!trimmed) return list;

	if (list.items.some((item) => item.toLowerCase() === trimmed.toLowerCase())) {
		return list;
	}

	const updated: TaskList = {
		...list,
		items: [...list.items, trimmed],
		updatedAt: new Date().toISOString(),
	};

	writeList(updated);
	return updated;
}

async function removeItem(id: string, itemName: string): Promise<TaskList> {
	const list = readList(id);
	if (!list) throw new Error("Task list not found");

	const updated: TaskList = {
		...list,
		items: list.items.filter((item) => item !== itemName),
		updatedAt: new Date().toISOString(),
	};

	writeList(updated);
	return updated;
}

async function addEntry(id: string, input: AddTaskEntryInput): Promise<TaskList> {
	const list = readList(id);
	if (!list) throw new Error("Task list not found");

	const entry: TaskEntry = {
		id: generateId(),
		itemName: input.itemName.trim(),
		quantity: input.quantity,
		note: input.note?.trim() || undefined,
		loggedAt: new Date().toISOString(),
	};

	const dayEntries = list.entries[input.date] || [];

	const updated: TaskList = {
		...list,
		entries: {
			...list.entries,
			[input.date]: [...dayEntries, entry],
		},
		updatedAt: new Date().toISOString(),
	};

	writeList(updated);
	return updated;
}

async function removeEntry(
	id: string,
	date: string,
	entryId: string,
): Promise<TaskList> {
	const list = readList(id);
	if (!list) throw new Error("Task list not found");

	const dayEntries = (list.entries[date] || []).filter(
		(entry) => entry.id !== entryId,
	);

	const updatedEntries: TaskEntriesByDate = { ...list.entries };
	if (dayEntries.length > 0) {
		updatedEntries[date] = dayEntries;
	} else {
		delete updatedEntries[date];
	}

	const updated: TaskList = {
		...list,
		entries: updatedEntries,
		updatedAt: new Date().toISOString(),
	};

	writeList(updated);
	return updated;
}

export const localStorageTaskAdapter: TaskStorageAdapter = {
	listSummaries,
	getList,
	createList,
	updateListMeta,
	deleteList,
	addItem,
	removeItem,
	addEntry,
	removeEntry,
};

