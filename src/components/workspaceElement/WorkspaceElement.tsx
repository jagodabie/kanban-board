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
}: {
  name?: string;
  id?: string;
  isActionVisible?: boolean;
  iconComponent?: JSX.Element;
  onClick?: () => void;
  placeholder?: string;
  boardElementClass: string;
  deleteAction?: () => void;
  editingAction?: () => void;
  onBlur?: (inputValue?: string) => void;
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
      />
    );
  }

  return (
    <ReadModeElement
      boardElementClass={boardElementClass}
      iconComponent={iconComponent}
      name={name || ''}
      isActionVisible={isActionVisible || false}
      deleteAction={deleteAction || (() => {})}
      editingAction={editingAction || (() => {})}
    />
  );
};
