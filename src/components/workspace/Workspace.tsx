import { SortableContext } from '@dnd-kit/sortable';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import {
  createWorkspaceTasksGroup,
  setTasks,
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
  const handleDragEnd = (event: DragOverEvent) => {
    const { active, over } = event;

    if (active.id === over?.id) return;

    const isActiveATask = active.data.current?.type === 'task';
    const isOverATask = over?.data.current?.type === 'task';
    const columnActiveId = active?.data.current?.element?.tasksGroupId || '';
    const columnOverId = over?.data.current?.element?.tasksGroupId || '';
    const activeTask = active.data.current?.element;

    // DnD within in range  tasks group
    if (isActiveATask && isOverATask && columnOverId === columnActiveId) {
      const columnId = over?.data.current?.element.tasksGroupId || '';

      const tasksGroupActive = tasksGroups.find(
        (group) => group.id === columnId
      );

      dispatch(
        setTasks({
          tasksGroupId: columnId,
          tasks: changedElementsOrder(
            tasksGroupActive?.tasks || [],
            getTaskPosition(tasksGroupActive?.tasks || [], active.id as string),
            getTaskPosition(tasksGroupActive?.tasks || [], over.id as string)
          ),
        })
      );
    }
    // DnD between columns
    if (active.id && over?.id && !isOverATask && !isActiveATask) {
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
    if (isActiveATask && isOverATask && columnOverId !== columnActiveId) {
      const tasksGroupActive = tasksGroups.find(
        (group) => group.id === columnActiveId
      );

      const tasksGroupOver =
        tasksGroups.find((group) => group.id === columnOverId)?.tasks || [];

      const newActiveTasks = tasksGroupActive?.tasks?.filter((task) => {
        return task.id !== activeTask.id;
      });

      dispatch(
        setTasks({
          tasks: newActiveTasks?.length ? newActiveTasks : [],
          tasksGroupId: columnActiveId,
        })
      );

      dispatch(
        setTasks({
          tasks: [...tasksGroupOver, activeTask]?.length
            ? [...tasksGroupOver, activeTask]
            : [],
          tasksGroupId: columnOverId,
        })
      );
    }

    return;
  };

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
