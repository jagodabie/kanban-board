import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setEditMode, setTasks } from '../../store/slices/actions';
import { TaskInterface, TasksGroupInterface } from '../../store/types';
import { WorkspaceSideBarElementWrapper } from '../workspaceElement/WorkspaceElementWrapper';
import './Task.scss';

export const Task: React.FC<{
  task: TaskInterface;
  tasksGroup: TasksGroupInterface;
}> = ({ task, tasksGroup }) => {
  const { id, name, subtasks } = task;
  const dispatch = useAppDispatch();

  const updateTaskName = (inputValue?: string) => {
    if (inputValue && inputValue !== name) {
      const updatedTask = {
        ...task,
        name: inputValue,
      };

      dispatch(
        setTasks({
          tasks: tasksGroup.tasks.map((task) => {
            return task.id === updatedTask.id ? updatedTask : task;
          }),
          tasksGroupId: tasksGroup.id,
        })
      );
      dispatch(setEditMode({ id: '' }));
    }
    return;
  };

  return (
    <div key={id}>
      <WorkspaceSideBarElementWrapper
        key={id}
        id={id}
        name={name}
        element={task}
        placeholder='Title of the new card...'
        boardElementClass='task'
        type='task'
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
          updateTaskName(inputValue);
        }}
      />
      {!!subtasks?.length &&
        subtasks.map((subtask) => (
          <WorkspaceSideBarElementWrapper
            key={subtask.id}
            id={subtask.id}
            type='subtask'
            element={subtask}
            name={subtask.name}
            placeholder='Title of the new subtask...'
            boardElementClass='subtask'
            deleteAction={() => {}}
            editingAction={() => dispatch(setEditMode({ id }))}
            onBlur={() => {}}
          />
        ))}
    </div>
  );
};
