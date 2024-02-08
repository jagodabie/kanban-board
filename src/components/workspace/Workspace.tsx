import { WorkspaceIcon } from '../../assets/icons/WorkspaceIcon';
import './Workspace.scss';

export const Workspace = ({ name }: { name: string }) => {
  return (
    <div className='workspace'>
      <div className='workspace-icon'>
        <WorkspaceIcon />
      </div>
      <span className='workspace-name'>{name}</span>
    </div>
  );
};
