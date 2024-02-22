import { SortableContext } from '@dnd-kit/sortable';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { createWorkspaceTasksGroup } from '../../store/slices/actions';
import { generateId } from '../../utils';
import { Input } from '../UI/input/Input';
import './Workspace.scss';
import {
  DndContext,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { TasksGroups } from './tasksGroup/TasksGroup';
import { useTasksGroupHandleDragEnd } from '../../hooks/useTasksGroupHandleDragEnd';

export const Workspace = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const tasksGroups =
    useAppSelector(
      ({ workspace }) =>
        workspace.workspaces?.find((workspace) => workspace.id === id)
          ?.tasksGroups
    ) || [];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );
  const handleDragEnd = useTasksGroupHandleDragEnd(tasksGroups);

  return (
    <div className='workspace'>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <SortableContext items={tasksGroups}>
          {!!tasksGroups?.length &&
            tasksGroups?.map((tasksGroup) => (
              <TasksGroups tasksGroup={tasksGroup} key={tasksGroup.id} />
            ))}
        </SortableContext>
      </DndContext>
      <div className='tasks-group-new'>
        <Input
          placeholder='Title of the new list...'
          boardElementClass='workspace-tasks-group-new'
          onBlur={(inputValue) => {
            if (inputValue !== '') {
              dispatch(
                createWorkspaceTasksGroup({
                  id: generateId(),
                  name: inputValue,
                  tasks: [],
                  workspaceId: id,
                })
              );
            }
          }}
        />
      </div>
    </div>
  );
};
