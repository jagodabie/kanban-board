import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { WorkspaceInterface, BoardInterface } from '../types';

// TODO: If i use good object name
const initialState: BoardInterface = {
  workspaces: [{ id: '1', name: 'Acme Corp workspace' }],
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addWorkspace: (state, action: PayloadAction<WorkspaceInterface>) => {
      state.workspaces.push(action.payload);
    },
  },
});
export default boardSlice.reducer;
export const { addWorkspace } = boardSlice.actions;
