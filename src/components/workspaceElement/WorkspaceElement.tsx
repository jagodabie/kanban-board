import './WorkspaceElement.scss';
import { useAppSelector } from '../../hooks/useAppDispatch';
import { ReadModeElement } from '../UI/readModeElement/ReadModeElement';
import { Input } from '../UI/input/Input';

export const WorkspaceElement = ({
  name,
  id,
  iconComponent,
  placeholder,
  deleteAction,
  isActionVisible,
  boardElementClass,
  editingAction,
  onBlur,
  type,
  createSubtask,
  onChange,
  done,
}: {
  name?: string;
  id?: string;
  done?: boolean;
  type?: string;
  isActionVisible?: boolean;
  iconComponent?: JSX.Element;
  onClick?: () => void;
  placeholder?: string;
  boardElementClass: string;
  deleteAction?: () => void;
  editingAction?: () => void;
  onBlur?: (inputValue?: string) => void;
  createSubtask?: () => void;
  onChange?: (inputValue?: string | boolean) => void;
}) => {
  const editMode = useAppSelector((state) => state.workspace.editMode);

  if (editMode.id === id) {
    return (
      <Input
        placeholder={placeholder || ''}
        onBlur={onBlur || (() => {})}
        boardElementClass={boardElementClass}
        iconComponent={iconComponent}
        name={name}
        id={id}
        type={type}
        onChange={onChange}
      />
    );
  }

  return (
    <ReadModeElement
      boardElementClass={boardElementClass}
      iconComponent={iconComponent}
      name={name || ''}
      type={type || ''}
      done={done || false}
      isActionVisible={isActionVisible || false}
      deleteAction={deleteAction || (() => {})}
      onChange={onChange}
      editingAction={editingAction || (() => {})}
      createSubtask={createSubtask || (() => {})}
    />
  );
};
