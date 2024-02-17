import { SortableContext } from '@dnd-kit/sortable';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import {
  addWorkspaceTasksGroup,
  setColumnTasksOrder,
  setTasksGroupOrder,
} from '../../store/slices/actions';
import { changedElementsOrder, generateId, getTaskPosition } from '../../utils';
import { Input } from '../UI/input/Input';
import './Workspace.scss';
import { TasksGroups } from './tasksGoup.tsx/TasksGroup';
import {
  DndContext,
  DragOverEvent,
  PointerSensor,
  closestCorners,
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
        distance: 5,
      },
    })
  );
  const handleDragEnd = (event: DragOverEvent) => {
    const { active, over } = event;

    if (active.id === over?.id) return;

    const isActiveATask = active.data.current?.type === 'task';
    const isOverATask = over?.data.current?.type === 'task';

    if (isActiveATask && isOverATask) {
      // const activeTaskId = active.data.current.element.id;
      // const activeTaskId = over?.data.current.element.id;
      // TODO: zatualizuj taski w grupach

      const columnId = over?.data.current?.element.tasksGroupId || '';

      const tasksGroupActive = tasksGroups.find(
        (group) => group.id === columnId
      );

      const changedElementsOrder1 = changedElementsOrder(
        tasksGroupActive?.tasks || [],
        getTaskPosition(tasksGroupActive?.tasks || [], active.id as string),
        getTaskPosition(tasksGroups[columnId]?.tasks || [], over.id as string)
      );

      dispatch(
        setColumnTasksOrder({
          tasks: changedElementsOrder1,
          activeTaskId: active.id as string,
          overTaskId: over.id as string,
        })
      );
    }

    if (active.id && over?.id) {
      dispatch(
        setTasksGroupOrder(
          changedElementsOrder(
            tasksGroups,
            getTaskPosition(tasksGroups, active.id as string),
            getTaskPosition(tasksGroups, over.id as string)
          )
        )
      );
    }
    return;
  };
  const dispatch = useAppDispatch();
  return (
    <div className='workspace'>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
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
