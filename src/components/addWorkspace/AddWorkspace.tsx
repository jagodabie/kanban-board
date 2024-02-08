import { Plus } from '../../assets/icons';
import './AddWorkspace.scss';

interface AddWorkspaceProps {
  addWorkspace: () => void;
}

export const AddWorkspace: React.FC<AddWorkspaceProps> = ({ addWorkspace }) => {
  return (
    <button type='button' className='workspaces-create' onClick={addWorkspace}>
      <span className='workspaces-create-icon'>
        <Plus />
      </span>
      <span className='workspaces-create-text'>Create workspace</span>
    </button>
  );
};
