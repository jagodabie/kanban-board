import './App.scss';
import { Workspace } from './components/workspace/Workspace';
import { WorkspacesSidebar } from './components/workspacesSidebar';
import { useAppSelector } from './hooks/useAppDispatch';

export const App = () => {
  const workspaceEditing = useAppSelector(
    (state) => state.workspace.workspaceEditing
  );
  return (
    <div className='container'>
      {/* TO: Remove mock */}
      <WorkspacesSidebar />
      {workspaceEditing ? (
        <Workspace id={workspaceEditing} />
      ) : (
        <p className='no-task'>
          No tasks to show! <br />
          Please choose a workspace to edit or create new one.
        </p>
      )}
    </div>
  );
};
