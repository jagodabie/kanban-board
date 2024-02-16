import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setEditMode } from '../../store/slices/actions';
import { SubtasksInterface } from '../../store/types';
import { WorkspaceSideBarElementWrapper } from '../workspaceElement/WorkspaceElementWrapper';
import './Task.scss';

export const Task: React.FC<{
  name: string;
  id: string;
  subtasks: SubtasksInterface[];
}> = ({ name, id, subtasks }) => {
  const dispatch = useAppDispatch();

  return (
    <div onClick={() => console.log(id)}>
      <WorkspaceSideBarElementWrapper
        key={id}
        id={id}
        name={name}
        placeholder='Title of the new card...'
        boardElementClass='task'
        deleteAction={() => {}}
        editingAction={() => dispatch(setEditMode({ id: id }))}
        onBlur={() => {}}
      />
      {!!subtasks?.length && (
        <>
          {subtasks.map((subtask) => (
            <WorkspaceSideBarElementWrapper
              key={subtask.id}
              id={subtask.id}
              name={subtask.name}
              placeholder='Title of the new subtask...'
              boardElementClass='subtask'
              deleteAction={() => {}}
              editingAction={() => dispatch(setEditMode({ id: id }))}
              onBlur={() => {}}
            />
          ))}
        </>
      )}
    </div>
  );
};
