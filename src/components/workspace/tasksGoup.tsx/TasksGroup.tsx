import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Plus } from '../../../assets/icons';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import {
  deleteWorkspaceTasksGroup,
  setEditMode,
  updateTasksGroupName,
} from '../../../store/slices/actions';
import { TaskInterface } from '../../../store/types';
import { Button } from '../../UI/button';
import { useState } from 'react';
import { WorkspaceElement } from '../../workspaceElement/WorkspaceElement';

export const TasksGroups = ({
  id,
  name,
  tasks,
}: {
  id: string;
  name: string;
  tasks: TaskInterface[];
}) => {
  const dispatch = useAppDispatch();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const [isActionVisible, setIsActionVisible] = useState(false);

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
        <div className='workspace-tasks-group'>
          <WorkspaceElement
            key={id}
            id={id}
            name={name}
            boardElementClass='workspace-tasks-group'
            deleteAction={() => dispatch(deleteWorkspaceTasksGroup(id))}
            onBlur={(inputValue) => {
              dispatch(updateTasksGroupName(inputValue || name));
              dispatch(setEditMode({ id: '' }));
            }}
            editingAction={() => dispatch(setEditMode({ id: id }))}
            isActionVisible={isActionVisible}
          />
        </div>
      </div>
      <div className='tasks-group-main'>
        {!!tasks?.length &&
          tasks.map((task, index) => (
            <div key={index} className='tasks-group-task'>
              {task.name}
            </div>
          ))}
      </div>
      <div className='tasks-group-footer'>
        <Button
          text='Add a card'
          onClick={() => console.log('test')}
          iconComponent={<Plus color='#88819f' />}
        />
      </div>
    </div>
  );
};
