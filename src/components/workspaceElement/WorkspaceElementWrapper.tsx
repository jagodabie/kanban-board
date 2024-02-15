import { useState } from 'react';
import { WorkspaceElement } from './WorkspaceElement';
import './WorkspaceElement.scss';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const WorkspaceSideBarElementWrapper = ({
  id,
  name,
  iconComponent,
  placeholder,
  onClick,
  deleteAction,
  boardElementClass,
  editingAction,
  onBlur,
}: {
  id: string;
  name?: string;
  iconComponent?: JSX.Element;
  placeholder?: string;
  onClick?: () => void;
  deleteAction?: () => void;
  boardElementClass: string;
  editingAction?: () => void;
  onBlur?: (inputValue?: string) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const [isActionVisible, setIsActionVisible] = useState(false);

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      onClick={onClick}
      className={`${boardElementClass}`}
      onMouseOver={() => setIsActionVisible(true)}
      onMouseLeave={() => setIsActionVisible(false)}
    >
      <WorkspaceElement
        key={id}
        name={name}
        iconComponent={iconComponent}
        placeholder={placeholder}
        id={id}
        deleteAction={deleteAction}
        boardElementClass={boardElementClass}
        editingAction={editingAction}
        onBlur={onBlur}
        isActionVisible={isActionVisible}
      />
    </div>
  );
};
