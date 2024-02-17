import { PayloadAction } from '@reduxjs/toolkit';
import {
  BoardInterface,
  TaskInterface,
  TasksGroupInterface,
  WorkspaceInterface,
} from '../types';

export const createWorkspace = (
  state: BoardInterface,
  action: PayloadAction<WorkspaceInterface>
) => {
  state.workspaces = [...state.workspaces, action.payload];
};
export const setWorkspacesOrder = (
  state: BoardInterface,
  action: PayloadAction<WorkspaceInterface[]>
) => {
  state.workspaces = action.payload;
};

export const setTasksGroupOrder = (
  state: BoardInterface,
  action: PayloadAction<TasksGroupInterface[]>
) => {
  state.workspaces = state.workspaces.map((workspace) => {
    return workspace.id === state.workspaceEditing
      ? { ...workspace, tasksGroups: action.payload }
      : workspace;
  });
};
// TODO: działa
export const setColumnTasksOrder = (
  state: BoardInterface,
  action: PayloadAction<{
    tasks: TaskInterface[];
    activeTaskId: string;
    overTaskId: string;
  }>
) => {
  const foundWorkspace = state.workspaces.find(
    (workspace) => workspace.id === state.workspaceEditing
  );
  if (foundWorkspace) {
    const foundTasksGroupActive = foundWorkspace?.tasksGroups.find(
      (TasksGroups) => TasksGroups.id === action.payload.tasks[0].tasksGroupId
    );
    if (foundTasksGroupActive) {
      const updatedTasksGroup = {
        ...foundTasksGroupActive,
        tasks: action.payload.tasks,
      };

      const updatedTasksGroups = [
        ...foundWorkspace.tasksGroups.filter(
          (taskGroup) => taskGroup.id !== action.payload.tasks[0].tasksGroupId
        ),
        updatedTasksGroup,
      ];

      const updatedWorkspace: WorkspaceInterface = {
        ...foundWorkspace,
        tasksGroups: updatedTasksGroups,
      };
      state.workspaces = state.workspaces.map((workspace) => {
        return workspace.id === state.workspaceEditing
          ? updatedWorkspace
          : workspace;
      });
    }
  }
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

    state.workspaces = [...state.workspaces].map((workspace) => {
      return workspace.id === state.workspaceEditing
        ? updatedWorkspace
        : workspace;
    });
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

    const updatedTasksGroups = workspaceFound.tasksGroups.map((tasksGroup) => {
      return tasksGroup.id === state.editMode.id
        ? updatedTasksGroup
        : tasksGroup;
    });

    const updatedWorkspace = {
      ...workspaceFound,
      tasksGroups: updatedTasksGroups,
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
    const updatedWorkspace = workspaceFound.tasksGroups.filter(
      (tasksGroup) => tasksGroup.id !== action.payload
    );
    state.workspaces = [...state.workspaces].map((workspace) => {
      return workspace.id === state.workspaceEditing
        ? { ...workspace, tasksGroups: updatedWorkspace }
        : workspace;
    });
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
