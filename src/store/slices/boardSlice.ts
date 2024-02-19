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
          workspaceId: '1',
          tasks: [
            {
              id: '21',
              name: 'Task 1',
              done: false,
              tasksGroupId: '1233',
              subtasks: [
                { id: '215454', name: 'XXXX', done: false, taskId: '1233' },
                { id: '224545', name: 'YYYY', done: false, taskId: '1233' },
              ],
            },
            {
              id: '22',
              name: 'Task 2',
              done: false,
              tasksGroupId: '1233',
              subtasks: [
                {
                  id: '2154545',
                  name: 'Subtask 1',
                  done: false,
                  taskId: '1233',
                },
                {
                  id: '22212',
                  name: 'Subtask 2',
                  done: false,
                  taskId: '1233',
                },
                {
                  id: '23541541',
                  name: 'Subtask 3',
                  done: false,
                  taskId: '1233',
                },
              ],
            },
          ],
        },
        {
          id: '34545',
          name: 'TEST 1 ',
          workspaceId: '1',
          tasks: [
            {
              id: '34543235',
              name: 'Task 1',
              done: false,
              tasksGroupId: '34545',
              subtasks: [
                { id: '345451', name: 'WWW', done: false, taskId: '34545' },
                {
                  id: '34545155645',
                  name: 'QQQ',
                  done: false,
                  taskId: '34545',
                },
              ],
            },
            {
              id: '46545',
              name: 'Task 2',
              done: false,
              tasksGroupId: '34545',
              subtasks: [
                {
                  id: '54564sdsd',
                  name: 'Subtask 11',
                  done: false,
                  taskId: '34545',
                },
                {
                  id: 'sds545',
                  name: 'Subtask 24',
                  done: false,
                  taskId: '34545',
                },
                {
                  id: '54584sd',
                  name: 'Subtask 34',
                  done: false,
                  taskId: '34545',
                },
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
