import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Plus } from '../../../assets/icons';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppDispatch';
import {
  deleteWorkspaceTasksGroup,
  setTasks,
  setEditMode,
  updateTasksGroupName,
} from '../../../store/slices/actions';
import { TasksGroupInterface } from '../../../store/types';
import { Button } from '../../UI/button';
import { WorkspaceElement } from '../../workspaceElement/WorkspaceElement';
import { Task } from '../../task/Task';
import './TasksGroup.scss';
import { generateId } from '../../../utils';
import { Input } from '../../UI/input/Input';
import { useState } from 'react';

export const TasksGroups = ({
  tasksGroup,
}: {
  tasksGroup: TasksGroupInterface;
}) => {
  const { id, name, tasks } = tasksGroup;
  const dispatch = useAppDispatch();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const [isActionVisible, setIsActionVisible] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const doneTasks = useAppSelector((state) =>
    state.workspace.workspaces.find(
      (workspace) => workspace.id === state.workspace.workspaceEditing
    )
  )?.tasksGroups.find((group) => group.id === tasksGroup.id)?.doneTasks;

  return (
    <div
      className='tasks-group'
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      onMouseOver={() => setIsActionVisible(true)}
      onMouseLeave={() => setIsActionVisible(false)}
    >
      <div className='tasks-group-header'>
        <WorkspaceElement
          key={id}
          id={id}
          name={name}
          boardElementClass='tasks-group'
          deleteAction={() => dispatch(deleteWorkspaceTasksGroup(id))}
          onBlur={(inputValue) => {
            dispatch(updateTasksGroupName(inputValue || name));
            dispatch(setEditMode({ id: '' }));
          }}
          editingAction={() => dispatch(setEditMode({ id: id }))}
          isActionVisible={isActionVisible}
        />
        {`${doneTasks || 0}/${tasksGroup?.tasks?.length}`}
      </div>
      <div className='tasks-group-main' key={id}>
        {!!tasks?.length &&
          tasks.map((task) => (
            <SortableContext items={tasks}>
              <Task task={task} key={task.id} tasksGroup={tasksGroup} />
            </SortableContext>
          ))}
        {showInput && (
          <div className='task'>
            <Input
              placeholder='Title of the new card...'
              boardElementClass='task-new'
              onBlur={(inputValue) => {
                if (inputValue !== '') {
                  dispatch(
                    setTasks({
                      tasksGroupId: id,
                      tasks: [
                        ...tasks,
                        {
                          id: generateId(),
                          name: inputValue,
                          done: false,
                          tasksGroupId: id,
                          subtasks: [],
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
      <div className='tasks-group-footer'>
        <Button
          text='Add a card'
          onClick={() => setShowInput(true)}
          iconComponent={<Plus color='#88819f' />}
        />
      </div>
    </div>
  );
};
