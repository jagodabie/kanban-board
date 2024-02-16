import { createSlice } from '@reduxjs/toolkit';
import { BoardInterface } from '../types';
import * as reducers from './reducers';

const initialState: BoardInterface = {
  workspaces: [
    {
      id: '1',
      name: 'Acme Corp workspace',
      tasksGroups: [
        {
          id: '1233',
          name: 'Tasks group 1',
          tasks: [],
        },
      ],
    },
    {
      id: '223213',
      name: 'Acme Corp workspace 223213',
      tasksGroups: [],
    },
  ],
  // TODO:
  // jakiś element z listy workspaces będzie edytowany =>
  //  nie obchodzi nas jaki to element tylko jego id
  editMode: {
    id: '',
  },
  workspaceEditing: '',
  create: true,
  save: true,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers,
});

export default boardSlice.reducer;
