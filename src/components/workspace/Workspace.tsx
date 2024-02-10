import './Workspace.scss';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { setSaveButtonDisabled } from '../../store/slices';

export const Workspace = ({
  name,
  id,
  iconComponent,
  onClick,
}: {
  name: string;
  id: string;
  iconComponent: JSX.Element;
  onClick?: () => void;
}) => {
  const [inputValue, setInputValue] = useState('');
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const editMode = useAppSelector((state) => state.workspace.editMode);
  const dispatch = useAppDispatch();
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  if (editMode === id) {
    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className='workspace'
        onClick={onClick}
      >
        <div className='workspace-icon'>{iconComponent}</div>
        <input
          value={inputValue}
          placeholder='Workspace name'
          onChange={(e) => {
            setInputValue(e.target.value);
            if (e.target.value) {
              dispatch(setSaveButtonDisabled(false));
              /// Workspace update
            }
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className='workspace'
      onClick={onClick}
    >
      <div className='workspace-icon'>{iconComponent}</div>
      <span className='workspace-name'>{name}</span>
    </div>
  );
};
