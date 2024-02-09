export interface WorkspaceInterface {
  name: string;
  id: string;
}
export interface BoardInterface {
  workspaces: WorkspaceInterface[];
}
