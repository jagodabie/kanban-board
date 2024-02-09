import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { WorkspaceDefault } from '../../assets/icons/WorkspaceDefault';
import { WorkspaceIcon } from '../../assets/icons';
import { Workspace } from '../workspace';
import { WorkspaceInterface } from '../../store/types';

export const Column: React.FC<{ workspaces: WorkspaceInterface[] }> = ({
  workspaces,
}) => {
  // TODO: adjust to css naming convention
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
            iconComponent={!index ? <WorkspaceDefault /> : <WorkspaceIcon />}
          />
        ))}
      </SortableContext>
    </div>
  );
};
