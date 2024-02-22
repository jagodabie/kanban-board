import { setEditMode, setSubtasks } from '../store/slices/actions';
import { SubtaskInterface, TaskInterface } from '../store/types';
import { useAppDispatch } from './useAppDispatch';

export const useUpdateSubtask = (
  subtask: SubtaskInterface,
  task: TaskInterface
) => {
  const dispatch = useAppDispatch();

  const updateSubtaskProperty = (key: string, value: string | boolean) => {
    if (value && value !== subtask.name) {
      const updatedSubtask = {
        ...subtask,
        [key]: value,
      };

      dispatch(
        setSubtasks({
          subtasks: task.subtasks.map((subtaskItem: SubtaskInterface) =>
            subtaskItem.id === updatedSubtask.id ? updatedSubtask : subtaskItem
          ),
          tasksGroupId: task.tasksGroupId,
          taskId: task.id,
        })
      );
      key !== 'done' ? dispatch(setEditMode({ id: '' })) : null;
    }
  };

  return updateSubtaskProperty;
};
