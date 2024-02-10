import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BoardInterface, WorkspaceInterface } from '../types';

const initialState: BoardInterface = {
  workspaces: [
    {
      id: '1',
      name: 'Acme Corp workspace',
      tasksGroups: [
        {
          id: '1',
          name: 'Tasks group 1',
          tasks: [
            { id: '1', name: 'Task 1', done: false },
            { id: '2', name: 'Task 2', done: true },
          ],
        },
      ],
    },
  ],
  editMode: '',
  create: true,
  save: true,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    createWorkspace: (state, action: PayloadAction<WorkspaceInterface>) => {
      state.workspaces.push(action.payload);
    },
    // updateWorkspace: (state, action: PayloadAction<WorkspaceInterface>) => {
    //   state.workspaces = state.workspaces.map((workspace) => {
    //     return workspace.id === action.payload.id ? action.payload : workspace;
    //   });
    // },
    deleteWorkspace: (state, action: PayloadAction<string>) => {
      state.workspaces = state.workspaces.filter(
        (workspace) => workspace.id !== action.payload
      );
    },
    setEditMode: (state, action: PayloadAction<string>) => {
      state.editMode = action.payload;
    },
    setCreateVisible: (state, action: PayloadAction<boolean>) => {
      state.create = action.payload;
    },
    setSaveButtonDisabled: (state, action: PayloadAction<boolean>) => {
      state.save = action.payload;
    },
    saveEditedWorkspace: (state, action: PayloadAction<WorkspaceInterface>) => {
      state.workspaces = state.workspaces.map((workspace) => {
        return workspace.id === action.payload.id ? action.payload : workspace;
      });
    },
  },
});

export default boardSlice.reducer;
export const {
  createWorkspace,
  // updateWorkspace,
  deleteWorkspace,
  setEditMode,
  setCreateVisible,
  setSaveButtonDisabled,
  saveEditedWorkspace,
} = boardSlice.actions;
