import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { WorkspaceDefault } from '../../assets/icons/WorkspaceDefault';
import { WorkspaceIcon } from '../../assets/icons';
import { Workspace } from '../workspace';
import { WorkspaceInterface } from '../../store/types';
import { setEditMode } from '../../store/slices';
import { useAppDispatch } from '../../hooks/useAppDispatch';

export const Column: React.FC<{ workspaces: WorkspaceInterface[] }> = ({
  workspaces,
}) => {
  const dispatch = useAppDispatch();
  return (
    <div className='columns'>
      <SortableContext
        items={workspaces}
        strategy={verticalListSortingStrategy}
      >
        {workspaces?.map((workspace, index) => (
          <Workspace
            key={index}
            id={workspace.id}
            name={workspace.name}
            onClick={() => dispatch(setEditMode(workspace.id))}
            iconComponent={!index ? <WorkspaceDefault /> : <WorkspaceIcon />}
          />
        ))}
      </SortableContext>
    </div>
  );
};
