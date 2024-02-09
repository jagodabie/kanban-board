import './WorkspacesSidebar.scss';
import { UserProfile } from '../userProfile';
import { WorkspaceSettings } from '../workspaceSettings';

import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { addWorkspace } from '../../store/slices';
import { generateId } from '../../utils';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Column } from '../column/Column';
import { Button } from '../UI/button';
import { Plus } from '../../assets/icons';

export const WorkspacesSidebar = () => {
  const workspaces = useAppSelector((state) => state.board.workspaces);
  const dispatch = useAppDispatch();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  return (
    <div className='workspaces'>
      <div className='workspaces-header'></div>
      <div className='workspaces-main'>
        {/* TODO: zastanowić czy tego używać albo jak to ulepszyć :D
         */}
        <DndContext sensors={sensors} modifiers={[restrictToVerticalAxis]}>
          <Column workspaces={workspaces} />
        </DndContext>
        {/* TODO: delete mock  Januszex*/}
        <Button
          onClick={() =>
            dispatch(addWorkspace({ name: 'Januszex', id: generateId() }))
          }
          text='Create workspace'
          iconComponent={<Plus />}
        />
      </div>
      <div className='workspaces-footer'>
        <UserProfile />
        <WorkspaceSettings />
      </div>
    </div>
  );
};
