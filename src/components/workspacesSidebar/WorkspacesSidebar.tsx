import './WorkspacesSidebar.scss';
import { UserProfile } from '../userProfile';
import { WorkspaceSettings } from '../workspaceSettings';

import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { changedElementsOrder, generateId, getTaskPosition } from '../../utils';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  DndContext,
  DragOverEvent,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { WorkspacesColumn } from './workspacesColumn/WorkspacesColumn';
import { Button } from '../UI/button';
import { Plus, Success } from '../../assets/icons';
import {
  createWorkspace,
  setCreateVisible,
  setEditMode,
  setSaveButtonDisabled,
  setWorkspaceEditing,
  setWorkspacesOrder,
} from '../../store/slices/actions';

export const WorkspacesSidebar = () => {
  const workspace = useAppSelector(({ workspace }) => workspace);

  const dispatch = useAppDispatch();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const createNewWorkspace = () => {
    const newWorkspace = {
      name: '',
      id: generateId(),
      tasksGroups: [],
    };

    dispatch(createWorkspace(newWorkspace));
    dispatch(setWorkspaceEditing(newWorkspace.id));
    dispatch(
      setEditMode({
        id: newWorkspace.id,
      })
    );
    dispatch(setCreateVisible(false));
  };
  const saveWorkspace = () => {
    dispatch(setCreateVisible(true));
    dispatch(setSaveButtonDisabled(true));
    dispatch(setEditMode({ id: '' }));
  };

  const handleDragEnd = (event: DragOverEvent) => {
    const { active, over } = event;

    if (active.id === over?.id) return;

    if (active.id && over?.id) {
      dispatch(
        setWorkspacesOrder(
          changedElementsOrder(
            workspace.workspaces,
            getTaskPosition(workspace.workspaces, active.id as string),
            getTaskPosition(workspace.workspaces, over.id as string)
          )
        )
      );
    }
    return;
  };

  return (
    <div className='workspaces'>
      <div className='workspaces-header'></div>
      <div className='workspaces-main'>
        <DndContext
          sensors={sensors}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
          collisionDetection={closestCorners}
        >
          <WorkspacesColumn workspaces={workspace.workspaces} />
        </DndContext>
        <Button
          onClick={workspace.create ? createNewWorkspace : saveWorkspace}
          text={workspace.create ? 'Create workspace' : 'Save new workspace'}
          disabled={!workspace.create && workspace.save}
          iconComponent={
            workspace.create ? (
              <Plus />
            ) : (
              <Success
                color={!workspace.create && workspace.save ? '' : '#fff'}
              />
            )
          }
          type={workspace.create ? '' : 'primary'}
        />
      </div>
      <div className='workspaces-footer'>
        <UserProfile />
        <WorkspaceSettings />
      </div>
    </div>
  );
};
