import './App.scss';
import { TasksGroup } from './components/tasksGroup/TasksGroup';
import { WorkspacesSidebar } from './components/workspacesSidebar';

export const App = () => {
  return (
    <div className='container'>
      <WorkspacesSidebar />
      {/* TODO: Remove mock */}
      <TasksGroup name='Working on' tasks={[{ id: '', name: '' }]} />
    </div>
  );
};
