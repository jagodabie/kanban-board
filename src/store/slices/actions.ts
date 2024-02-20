import { boardSlice } from './boardSlice';

export const {
  createWorkspace,
  deleteWorkspace,
  setEditMode,
  setCreateVisible,
  setSaveButtonDisabled,
  saveEditedWorkspace,
  setWorkspaceEditing,
  createWorkspaceTasksGroup,
  deleteWorkspaceTasksGroup,
  updateWorkspaceName,
  updateTasksGroupName,
  setWorkspacesOrder,
  setTasksGroupOrder,
  setTasks,
  setSubtasks,
  setDoneTasks,
} = boardSlice.actions;
