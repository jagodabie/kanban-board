import { boardSlice } from './boardSlice';

export const {
  createWorkspace,
  deleteWorkspace,
  setEditMode,
  setCreateVisible,
  setSaveButtonDisabled,
  saveEditedWorkspace,
  setWorkspaceEditing,
  addWorkspaceTasksGroup,
  deleteWorkspaceTasksGroup,
  updateWorkspaceName,
  updateTasksGroupName,
} = boardSlice.actions;
