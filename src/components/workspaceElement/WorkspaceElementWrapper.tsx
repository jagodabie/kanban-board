import { useState } from 'react';
import { WorkspaceElement } from './WorkspaceElement';
import './WorkspaceElement.scss';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SubtasksInterface, TasksGroupInterface } from '../../store/types';

export const WorkspaceSideBarElementWrapper = ({
  id,
  name,
  iconComponent,
  placeholder,
  onClick,
  deleteAction,
  boardElementClass,
  editingAction,
  createSubtask,
  onBlur,
  onChange,
  element,
  done,
  type,
}: {
  id: string;
  name?: string;
  done?: boolean;
  iconComponent?: JSX.Element;
  placeholder?: string;
  type?: string;
  element?: SubtasksInterface | TasksGroupInterface | TasksGroupInterface;
  onClick?: () => void;
  createSubtask?: () => void;
  deleteAction?: () => void;
  boardElementClass: string;
  editingAction?: () => void;
  onBlur?: (inputValue?: string) => void;
  onChange?: (inputValue?: string | boolean) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      data: {
        type,
        element,
      },
    });
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
        done={done || false}
        iconComponent={iconComponent}
        placeholder={placeholder}
        id={id}
        deleteAction={deleteAction}
        boardElementClass={boardElementClass}
        editingAction={editingAction}
        onBlur={onBlur}
        createSubtask={createSubtask}
        isActionVisible={isActionVisible}
        type={type}
        onChange={onChange}
      />
    </div>
  );
};
