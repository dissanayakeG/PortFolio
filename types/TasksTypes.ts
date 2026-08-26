// Core data model for the Daily Task Tracker feature.
// Data is currently persisted client-side (see lib/tasks/localStorageTaskAdapter.ts)
// with each task list stored as its own JSON document, so this can later be swapped
// for a Google Drive-backed adapter without changing any UI code.

export interface TaskEntry {
    id: string;
    itemName: string;
    quantity?: number;
    note?: string;
    loggedAt: string; // ISO date-time the entry was recorded
};

// Entries grouped by day, keyed as "YYYY-MM-DD"
export type TaskEntriesByDate = Record<string, TaskEntry[]>;

export interface TaskList {
    id: string;
    name: string;
    description?: string;
    trackQuantity: boolean; // e.g. workout reps/sets vs. a simple meal checklist
    quantityLabel?: string; // e.g. "Reps", "Sets", "Minutes" - used when trackQuantity is true
    items: string[]; // dropdown options pool (e.g. exercises, meal foods)
    entries: TaskEntriesByDate;
    createdAt: string;
    updatedAt: string;
};

export interface TaskListSummary {
    id: string;
    name: string;
    description?: string;
    trackQuantity: boolean;
    itemCount: number;
    totalEntries: number;
    lastLoggedAt?: string;
    createdAt: string;
};

export interface CreateTaskListInput {
    name: string;
    description?: string;
    trackQuantity: boolean;
    quantityLabel?: string;
    items: string[];
};

export interface UpdateTaskListMetaInput {
    name?: string;
    description?: string;
    quantityLabel?: string;
};

export interface AddTaskEntryInput {
    date: string; // "YYYY-MM-DD"
    itemName: string;
    quantity?: number;
    note?: string;
};

// Storage abstraction so the localStorage implementation can later be swapped
// for a Google Drive (or other remote) backed adapter without touching components.
export interface TaskStorageAdapter {
    listSummaries(): Promise<TaskListSummary[]>;
    getList(id: string): Promise<TaskList | null>;
    createList(input: CreateTaskListInput): Promise<TaskList>;
    updateListMeta(id: string, updates: UpdateTaskListMetaInput): Promise<TaskList>;
    deleteList(id: string): Promise<void>;
    addItem(id: string, itemName: string): Promise<TaskList>;
    removeItem(id: string, itemName: string): Promise<TaskList>;
    addEntry(id: string, input: AddTaskEntryInput): Promise<TaskList>;
    removeEntry(id: string, date: string, entryId: string): Promise<TaskList>;
};

export interface NewTaskListFormData {
    name: string;
    description?: string;
    listType: "checklist" | "quantity";
    quantityLabel?: string;
    itemsList: string;
};

export interface AddEntryFormData {
    itemName: string;
    quantity?: string;
    note?: string;
};

export interface EditTaskListFormData {
    name: string;
    description?: string;
    quantityLabel?: string;
};
