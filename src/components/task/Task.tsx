import { useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setEditMode, setSubtasks, setTasks } from '../../store/slices/actions';
import { TaskInterface, TasksGroupInterface } from '../../store/types';
import { Subtask } from '../subtask/Subtask';
import { WorkspaceSideBarElementWrapper } from '../workspaceElement/WorkspaceElementWrapper';
import './Task.scss';
import { Input } from '../UI/input/Input';
import { generateId } from '../../utils';
import { useUpdateTaskProperty } from '../../hooks/useUpdateTaskProperty';

export const Task: React.FC<{
  task: TaskInterface;
  tasksGroup: TasksGroupInterface;
}> = ({ task, tasksGroup }) => {
  const { id, name, subtasks } = task;
  const dispatch = useAppDispatch();
  const [showInput, setShowInput] = useState(false);

  const updateTaskProperty = useUpdateTaskProperty(task, tasksGroup);

  return (
    <div key={id}>
      <WorkspaceSideBarElementWrapper
        key={id}
        id={id}
        name={name}
        element={task}
        done={task.done}
        placeholder='Title of the new card...'
        boardElementClass='task'
        type='task'
        createSubtask={() => setShowInput(true)}
        deleteAction={() =>
          dispatch(
            setTasks({
              tasks: [...tasksGroup.tasks.filter((task) => task.id !== id)],
              tasksGroupId: tasksGroup.id,
            })
          )
        }
        editingAction={() => dispatch(setEditMode({ id: task.id }))}
        onBlur={(inputValue) => {
          updateTaskProperty('name', inputValue || '');
        }}
        onChange={(checked) => updateTaskProperty('done', checked || false)}
      />
      {!!subtasks?.length &&
        subtasks.map((subtask) => (
          <Subtask subtask={subtask} key={subtask.id} task={task} />
        ))}
      <div>
        {showInput && (
          <div className='subtask'>
            <Input
              placeholder='Title of the new subtask'
              boardElementClass='subtask-new'
              onBlur={(inputValue) => {
                if (inputValue !== '') {
                  dispatch(
                    setSubtasks({
                      tasksGroupId: tasksGroup.id,
                      taskId: id,
                      subtasks: [
                        ...subtasks,
                        {
                          id: generateId(),
                          name: inputValue,
                          done: false,
                          taskId: id,
                        },
                      ],
                    })
                  );
                  setShowInput(false);
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
