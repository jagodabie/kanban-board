import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useUpdateSubtask } from '../../hooks/useUpdateSubtaskProperty';
import { setEditMode, setSubtasks } from '../../store/slices/actions';
import { SubtaskInterface, TaskInterface } from '../../store/types';
import { WorkspaceSideBarElementWrapper } from '../workspaceElement/WorkspaceElementWrapper';

export const Subtask = ({
  subtask,
  task,
}: {
  subtask: SubtaskInterface;
  task: TaskInterface;
}) => {
  const dispatch = useAppDispatch();
  const updateSubtaskProperty = useUpdateSubtask(subtask, task);

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
          updateSubtaskProperty('name', inputValue || '');
        }}
        onChange={(checked) => updateSubtaskProperty('done', checked || false)}
      />
    </div>
  );
};
