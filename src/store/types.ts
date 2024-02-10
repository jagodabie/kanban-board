export interface TaskInterface {
  name: string;
  id: string;
  done: boolean;
}
export interface TasksGroupInterface {
  name: string;
  id: string;
  tasks?: TaskInterface[];
}

export interface WorkspaceInterface {
  name: string;
  id: string;
  tasksGroups?: TasksGroupInterface[];
}
export interface BoardInterface {
  workspaces: WorkspaceInterface[];
  create: boolean;
  save: boolean;
  editMode: string;
}
