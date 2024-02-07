import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BoardInterface, Workspace } from '../types';

// TODO: If i use good object name
const initialState: BoardInterface = {
  workspaces: [{ name: 'Jagoda' }],
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addBoard: (state, action: PayloadAction<Workspace>) => {
      state.workspaces.push(action.payload);
    },
  },
});
export default boardSlice.reducer;
export const { addBoard } = boardSlice.actions;
