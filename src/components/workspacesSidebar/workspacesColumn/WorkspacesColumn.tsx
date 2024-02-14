import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { WorkspaceDefault } from '../../../assets/icons/WorkspaceDefault';
import { WorkspaceIcon } from '../../../assets/icons';
import { WorkspaceInterface } from '../../../store/types';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { WorkspaceSideBarElementWrapper } from '../workspaceSideBarElement/WorkspaceSideBarElementWrapper';
import {
  deleteWorkspace,
  setEditMode,
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
            id={workspace.id}
            name={workspace.name}
            boardElementClass='workspace-side-element'
            onBlur={() => {
              dispatch(setEditMode({ id: '' }));
            }}
            // TODO: czuy jeszcze tego potrzebuje w ogóle?
            onClick={() => {
              dispatch(setWorkspaceEditing(workspace.id));
            }}
            deleteAction={() => dispatch(deleteWorkspace(workspace.id))}
            placeholder='Workspace name'
            iconComponent={!index ? <WorkspaceDefault /> : <WorkspaceIcon />}
          />
        ))}
      </SortableContext>
    </div>
  );
};
