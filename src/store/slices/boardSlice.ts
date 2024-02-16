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
          tasks: [
            { id: '1', name: 'Task 1', done: false, subtasks: [] },
            {
              id: '2',
              name: 'Task 2',
              done: false,
              subtasks: [
                { id: '1', name: 'Subtask 1', done: false },
                { id: '2', name: 'Subtask 2', done: false },
                { id: '3', name: 'Subtask 3', done: false },
              ],
            },
          ],
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
  isActionVisible: false,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers,
});

export default boardSlice.reducer;
