import { TaskStorageAdapter } from "@/types/TasksTypes";
import { localStorageTaskAdapter } from "@/lib/tasks/localStorageTaskAdapter";

// Single place components import the active storage backend from. Today this
// resolves to the browser localStorage adapter; once Google Drive sync ships
// (behind Google sign-in) this can pick the Drive-backed adapter instead
// without any component changes.
export function getTaskAdapter(): TaskStorageAdapter {
	return localStorageTaskAdapter;
}
