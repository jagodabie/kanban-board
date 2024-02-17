import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { setEditMode } from '../../store/slices/actions';
import { SubtasksInterface, TaskInterface } from '../../store/types';
import { WorkspaceSideBarElementWrapper } from '../workspaceElement/WorkspaceElementWrapper';
import './Task.scss';

export const Task: React.FC<{
  name: string;
  id: string;
  task: TaskInterface;
  subtasks: SubtasksInterface[];
}> = ({ name, id, subtasks, task }) => {
  const dispatch = useAppDispatch();

  const updateTaskName = (inputValue?: string) => {
    if (inputValue) {
      const updatedTask = {
        ...task,
        name: inputValue,
      };
      console.log(updatedTask);
    }
  };

  return (
    <div onClick={() => console.log(id)}>
      <WorkspaceSideBarElementWrapper
        key={id}
        id={id}
        name={name}
        element={task}
        placeholder='Title of the new card...'
        boardElementClass='task'
        type='task'
        deleteAction={() => {}}
        editingAction={() => dispatch(setEditMode({ id: id }))}
        onBlur={(inputValue) => updateTaskName(inputValue)}
      />
      {!!subtasks?.length &&
        subtasks.map((subtask) => (
          <div onClick={() => console.log(subtask.id)}>
            <WorkspaceSideBarElementWrapper
              key={subtask.id}
              id={subtask.id}
              type='subtask'
              element={subtask}
              name={subtask.name}
              placeholder='Title of the new subtask...'
              boardElementClass='subtask'
              deleteAction={() => {}}
              editingAction={() => dispatch(setEditMode({ id: id }))}
              onBlur={() => {}}
            />
          </div>
        ))}
    </div>
  );
};
