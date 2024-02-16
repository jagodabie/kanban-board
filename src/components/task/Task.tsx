import { SubtasksInterface } from '../../store/types';
import { WorkspaceSideBarElementWrapper } from '../workspaceElement/WorkspaceElementWrapper';
import './Task.scss';

export const Task: React.FC<{
  name: string;
  id: string;
  subtasks: SubtasksInterface[];
}> = ({ name, id }) => {
  return (
    <WorkspaceSideBarElementWrapper
      key={id}
      id={id}
      name={name}
      placeholder='Title of the new card...'
      boardElementClass='task'
      deleteAction={() => {}}
      editingAction={() => {}}
      onBlur={() => {}}
    />
  );
};
