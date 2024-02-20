import { PayloadAction } from '@reduxjs/toolkit';
import {
  BoardInterface,
  SubtasksInterface,
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

export const setTasks = (
  state: BoardInterface,
  action: PayloadAction<{
    tasks: TaskInterface[];
    tasksGroupId: string;
  }>
) => {
  const foundWorkspace = state.workspaces.find(
    (workspace) => workspace.id === state.workspaceEditing
  );

  if (foundWorkspace) {
    const foundTasksGroup = foundWorkspace?.tasksGroups.find(
      (TasksGroups) => TasksGroups.id === action.payload.tasksGroupId
    );

    if (foundTasksGroup) {
      const updatedTasksGroup = {
        ...foundTasksGroup,
        tasks: action.payload.tasks,
      };

      const updatedTasksGroups = [
        ...foundWorkspace.tasksGroups.map((taskGroup) =>
          taskGroup.id === action.payload.tasksGroupId
            ? updatedTasksGroup
            : taskGroup
        ),
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
export const setSubtasks = (
  state: BoardInterface,
  action: PayloadAction<{
    subtasks: SubtasksInterface[];
    tasksGroupId: string;
    taskId: string;
  }>
) => {
  const foundWorkspace = state.workspaces.find(
    (workspace) => workspace.id === state.workspaceEditing
  );

  if (foundWorkspace) {
    const foundTasksGroup = foundWorkspace?.tasksGroups.find(
      (TasksGroups) => TasksGroups.id === action.payload.tasksGroupId
    );

    if (foundTasksGroup) {
      const foundTask = foundTasksGroup.tasks.find(
        (task) => task.id === action.payload.taskId
      );

      if (foundTask) {
        const updatedTask = {
          ...foundTask,
          subtasks: action.payload.subtasks,
        };

        const updatedTasks = [
          ...foundTasksGroup.tasks.map((task) =>
            task.id === action.payload.taskId ? updatedTask : task
          ),
        ];

        const updatedTasksGroup = {
          ...foundTasksGroup,
          tasks: updatedTasks,
        };

        const updatedTasksGroups = [
          ...foundWorkspace.tasksGroups.map((taskGroup) =>
            taskGroup.id === action.payload.tasksGroupId
              ? updatedTasksGroup
              : taskGroup
          ),
        ];
        const updatedWorkspace = {
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

export const createWorkspaceTasksGroup = (
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
