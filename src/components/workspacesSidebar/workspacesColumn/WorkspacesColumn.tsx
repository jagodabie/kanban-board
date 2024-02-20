import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { WorkspaceDefault } from '../../../assets/icons/WorkspaceDefault';
import { WorkspaceIcon } from '../../../assets/icons';
import { WorkspaceInterface } from '../../../store/types';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { WorkspaceSideBarElementWrapper } from '../../workspaceElement/WorkspaceElementWrapper';
import {
  deleteWorkspace,
  setCreateVisible,
  setEditMode,
  setSaveButtonDisabled,
  setWorkspaceEditing,
} from '../../../store/slices/actions';

export const WorkspacesColumn: React.FC<{
  workspaces: WorkspaceInterface[];
}> = ({ workspaces }) => {
  const dispatch = useAppDispatch();

  return (
    <div className='workspaces-sidebar-column'>
      <SortableContext
        items={workspaces}
        strategy={verticalListSortingStrategy}
      >
        {workspaces?.map((workspace, index) => (
          <WorkspaceSideBarElementWrapper
            key={index}
            type='workspace'
            id={workspace.id}
            name={workspace.name}
            boardElementClass='workspace-side-element'
            onBlur={() => {
              dispatch(setEditMode({ id: '' }));
              dispatch(setSaveButtonDisabled(false));
            }}
            onClick={() => {
              dispatch(setWorkspaceEditing(workspace.id));
            }}
            editingAction={() => {
              dispatch(setEditMode({ id: workspace.id }));
              dispatch(setCreateVisible(false));
              dispatch(setSaveButtonDisabled(false));
            }}
            deleteAction={() => dispatch(deleteWorkspace(workspace.id))}
            placeholder='Workspace name'
            iconComponent={!index ? <WorkspaceDefault /> : <WorkspaceIcon />}
            onChange={(inputValue) => {
              if (inputValue) {
                dispatch(setSaveButtonDisabled(false));
              }
            }}
          />
        ))}
      </SortableContext>
    </div>
  );
};
