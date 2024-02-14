import { Plus } from '../../assets/icons';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import {
  addWorkspaceTasksGroup,
  deleteWorkspaceTasksGroup,
  setEditMode,
  updateTasksGroupName,
} from '../../store/slices/actions';
import { generateId } from '../../utils';
import { Button } from '../UI/button';
import { Input } from '../UI/input/Input';
import { WorkspaceSideBarElementWrapper } from '../workspacesSidebar/workspaceSideBarElement/WorkspaceSideBarElementWrapper';
import './Workspace.scss';

export const Workspace = ({ id }: { id: string }) => {
  const tasksGroups =
    useAppSelector(
      ({ workspace }) =>
        workspace.workspaces?.find((workspace) => workspace.id === id)
          ?.tasksGroups
    ) || [];

  const dispatch = useAppDispatch();
  return (
    <div className='workspace'>
      {!!tasksGroups?.length &&
        tasksGroups?.map((tasksGroup, index) => (
          <div className='tasks-group'>
            <div className='tasks-group-header'>
              <WorkspaceSideBarElementWrapper
                key={index}
                id={tasksGroup.id}
                name={tasksGroup.name}
                boardElementClass='workspace-tasks-group'
                deleteAction={() =>
                  dispatch(deleteWorkspaceTasksGroup(tasksGroup.id))
                }
                onBlur={(inputValue) => {
                  dispatch(updateTasksGroupName(inputValue || tasksGroup.name));
                  dispatch(setEditMode({ id: '' }));
                }}
                editingAction={() =>
                  dispatch(setEditMode({ id: tasksGroup.id }))
                }
              />
            </div>
            <div className='tasks-group-main'></div>
            <div className='tasks-group-footer'>
              <Button
                text='Add a card'
                onClick={() => console.log('test')}
                iconComponent={<Plus color='#88819f' />}
              />
            </div>
          </div>
        ))}
      <div className='tasks-group-new'>
        <Input
          placeholder='Title of the new list...'
          boardElementClass='workspace-tasks-group-new'
          onBlur={(inputValue) => {
            if (inputValue !== '') {
              dispatch(
                addWorkspaceTasksGroup({
                  id: generateId(),
                  name: inputValue,
                  tasks: [],
                })
              );
            }
          }}
        />
      </div>
    </div>
  );
};
