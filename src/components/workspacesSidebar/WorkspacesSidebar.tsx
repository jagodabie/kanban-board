import './WorkspacesSidebar.scss';
import { UserProfile } from '../userProfile';
import { WorkspaceSettings } from '../workspaceSettings';
import { AddWorkspace } from '../addWorkspace';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { addBoard } from '../../store/slices';
import { Workspace } from '../workspace/Workspace';

export const WorkspacesSidebar = () => {
  const workspaces = useAppSelector((state) => state.board.workspaces);
  const dispatch = useAppDispatch();
  return (
    <div className='workspaces'>
      <div className='workspaces-header'></div>
      <div className='workspaces-main'>
        {workspaces?.map((workspace, index) => (
          <Workspace key={index} name={workspace.name} />
        ))}
        {/* TODO: delete mock  Januszex*/}
        <AddWorkspace
          addWorkspace={() => dispatch(addBoard({ name: 'Januszex' }))}
        />
      </div>
      <div className='workspaces-footer'>
        <UserProfile />
        <WorkspaceSettings />
      </div>
    </div>
  );
};
