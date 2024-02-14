import { PayloadAction } from '@reduxjs/toolkit';
import {
  BoardInterface,
  TasksGroupInterface,
  WorkspaceInterface,
} from '../types';

export const createWorkspace = (
  state: BoardInterface,
  action: PayloadAction<WorkspaceInterface>
) => {
  state.workspaces = [...state.workspaces, action.payload];
};

export const updateWorkspaceName = (
  state: BoardInterface,
  action: PayloadAction<string>
) => {
  const workspaceFound = state.workspaces.find(
    (workspace) => workspace.id === state.workspaceEditing
  );
  if (workspaceFound) {
    const updatedWorkspace = {
      ...workspaceFound,
      name: action.payload,
    };

    state.workspaces = [...state.workspaces, updatedWorkspace];
  }
};

export const deleteWorkspace = (
  state: BoardInterface,
  action: PayloadAction<string>
) => {
  state.workspaces = state.workspaces.filter(
    (workspace) => workspace.id !== action.payload
  );
};

export const addWorkspaceTasksGroup = (
  state: BoardInterface,
  action: PayloadAction<TasksGroupInterface>
) => {
  const workspaceFound = state.workspaces.find(
    (workspace) => workspace.id === state.workspaceEditing
  );
  if (workspaceFound) {
    const updatedWorkspace = {
      ...workspaceFound,
      tasksGroups: [...workspaceFound.tasksGroups, action.payload],
    };
    state.workspaces = [...state.workspaces].map((workspace) => {
      return workspace.id === state.workspaceEditing
        ? updatedWorkspace
        : workspace;
    });
  }
};
export const updateTasksGroupName = (
  state: BoardInterface,
  action: PayloadAction<string>
) => {
  const workspaceFound = state.workspaces.find(
    (workspace) => workspace.id === state.workspaceEditing
  );
  const tasksGroupFound = workspaceFound?.tasksGroups.find(
    (tasksGroup) => tasksGroup.id === state.editMode.id
  );

  if (workspaceFound && tasksGroupFound) {
    const updatedTasksGroup = {
      ...tasksGroupFound,
      name: action.payload,
    };

    const updatedTasksGoups = [
      { ...updatedTasksGroup, ...workspaceFound.tasksGroups },
    ];
    const updatedWorkspace = {
      ...workspaceFound,
      tasksGroups: updatedTasksGoups,
    };

    state.workspaces = [...state.workspaces].map((workspace) => {
      return workspace.id === state.workspaceEditing
        ? updatedWorkspace
        : workspace;
    });
  }
};

export const deleteWorkspaceTasksGroup = (
  state: BoardInterface,
  action: PayloadAction<string>
) => {
  const workspaceFound = state.workspaces.find(
    (workspace) => workspace.id === state.workspaceEditing
  );
  if (workspaceFound) {
    workspaceFound.tasksGroups = workspaceFound.tasksGroups.filter(
      (tasksGroup) => tasksGroup.id !== action.payload
    );
    state.workspaces = [...state.workspaces, workspaceFound];
  }
};

export const setEditMode = (
  state: BoardInterface,
  action: PayloadAction<{ id: string }>
) => {
  state.editMode = action.payload;
};

export const setCreateVisible = (
  state: BoardInterface,
  action: PayloadAction<boolean>
) => {
  state.create = action.payload;
};

export const setSaveButtonDisabled = (
  state: BoardInterface,
  action: PayloadAction<boolean>
) => {
  state.save = action.payload;
};

export const saveEditedWorkspace = (
  state: BoardInterface,
  action: PayloadAction<WorkspaceInterface>
) => {
  state.workspaces = state.workspaces.map((workspace) => {
    return workspace.id === action.payload.id ? action.payload : workspace;
  });
};

export const setWorkspaceEditing = (
  state: BoardInterface,
  action: PayloadAction<string>
) => {
  state.workspaceEditing = action.payload;
};
