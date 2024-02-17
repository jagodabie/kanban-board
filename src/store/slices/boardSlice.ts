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
            {
              id: '21',
              name: 'Task 1',
              done: false,
              tasksGroupId: '1233',
              subtasks: [
                { id: '215454', name: 'XXXX', done: false },
                { id: '224545', name: 'YYYY', done: false },
              ],
            },
            {
              id: '22',
              name: 'Task 2',
              done: false,
              tasksGroupId: '1233',
              subtasks: [
                { id: '2154545', name: 'Subtask 1', done: false },
                { id: '22212', name: 'Subtask 2', done: false },
                { id: '23541541', name: 'Subtask 3', done: false },
              ],
            },
          ],
        },
        {
          id: '34545',
          name: 'TEST 1 ',
          tasks: [
            {
              id: '34543235',
              name: 'Task 1',
              done: false,
              tasksGroupId: '34545',
              subtasks: [
                { id: '345451', name: 'WWW', done: false },
                { id: '345451', name: 'QQQ', done: false },
              ],
            },
            {
              id: '46545',
              name: 'Task 2',
              done: false,
              tasksGroupId: '34545',
              subtasks: [
                { id: 'sdsd', name: 'Subtask 11', done: false },
                { id: 'sds', name: 'Subtask 24', done: false },
                { id: 'sdsd', name: 'Subtask 34', done: false },
              ],
            },
          ],
        },
      ],
    },
    {
      id: '5434534',
      name: 'Acme Corp workspace 223213',
      tasksGroups: [],
    },
  ],
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
