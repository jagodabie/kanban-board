import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setEditMode, setSubtasks } from '../../store/slices/actions';
import { SubtasksInterface, TaskInterface } from '../../store/types';
import { WorkspaceSideBarElementWrapper } from '../workspaceElement/WorkspaceElementWrapper';

export const Subtask = ({
  subtask,
  task,
}: {
  subtask: SubtasksInterface;
  task: TaskInterface;
}) => {
  const dispatch = useAppDispatch();

  const updateSubtaskProperty = (key: string, value?: string | boolean) => {
    if (value && value !== subtask.name) {
      const updatedSubtask = {
        ...subtask,
        [key]: value,
      };

      dispatch(
        setSubtasks({
          subtasks: task.subtasks.map((subtaskItem) => {
            return subtaskItem.id === updatedSubtask.id
              ? updatedSubtask
              : subtaskItem;
          }),
          tasksGroupId: task.tasksGroupId,
          taskId: task.id,
        })
      );
      dispatch(setEditMode({ id: '' }));
    }
    return;
  };

  return (
    <div>
      <WorkspaceSideBarElementWrapper
        key={subtask.id}
        id={subtask.id}
        type='subtask'
        name={subtask.name}
        placeholder='Title of the new subtask...'
        boardElementClass='subtask'
        deleteAction={() =>
          dispatch(
            setSubtasks({
              subtasks: [
                ...task.subtasks.filter((item) => item.id !== subtask.id),
              ],
              tasksGroupId: task.tasksGroupId,
              taskId: task.id,
            })
          )
        }
        editingAction={() => dispatch(setEditMode({ id: subtask.id }))}
        onBlur={(inputValue) => {
          updateSubtaskProperty('name', inputValue);
        }}
        onChange={(checked) => updateSubtaskProperty('done', checked)}
      />
    </div>
  );
};
