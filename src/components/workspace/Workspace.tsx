import { SortableContext } from '@dnd-kit/sortable';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { addWorkspaceTasksGroup } from '../../store/slices/actions';
import { generateId } from '../../utils';
import { Input } from '../UI/input/Input';
import './Workspace.scss';
import { TasksGroups } from './tasksGoup.tsx/TasksGroup';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

export const Workspace = ({ id }: { id: string }) => {
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
  const dispatch = useAppDispatch();
  return (
    <div className='workspace'>
      <DndContext sensors={sensors}>
        <SortableContext items={tasksGroups}>
          {!!tasksGroups?.length &&
            tasksGroups?.map(({ id, name, tasks }) => (
              <TasksGroups id={id} name={name} tasks={tasks || []} />
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
                addWorkspaceTasksGroup({
                  id: generateId(),
                  name: inputValue,
                  tasks: [],
                })
              );
            }
          }}
        />
      </div>
    </div>
  );
};
