export interface SubtasksInterface {
  name: string;
  id: string;
  done: boolean;
}

export interface TaskInterface {
  tasksGroupId?: string;
  name: string;
  id: string;
  done: boolean;
  subtasks?: SubtasksInterface[];
}
export interface TasksGroupInterface {
  name: string;
  id: string;
  tasks?: TaskInterface[];
}

export interface WorkspaceInterface {
  name: string;
  id: string;
  tasksGroups: TasksGroupInterface[];
}
export interface BoardInterface {
  workspaces: WorkspaceInterface[];
  create: boolean;
  save: boolean;
  workspaceEditing: string;
  editMode: {
    id: string;
  };
}
