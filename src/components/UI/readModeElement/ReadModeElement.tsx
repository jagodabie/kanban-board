import { useState } from 'react';
import { Delete } from '../../../assets/icons/Delete';
import { Edit } from '../../../assets/icons/Edit';
import { Plus } from '../../../assets/icons/Plus';

export const ReadModeElement = ({
  boardElementClass,
  iconComponent,
  name,
  type,
  done,
  isActionVisible,
  deleteAction,
  editingAction,
  createSubtask,
  onChange,
}: {
  boardElementClass: string;
  iconComponent: React.ReactNode;
  name: string;
  type?: string;
  done: boolean;
  isActionVisible: boolean;
  deleteAction: () => void;
  editingAction: () => void;
  createSubtask?: () => void;
  onChange?: (checkValue?: string | boolean) => void;
}) => {
  const [checked, setChecked] = useState(done || false);

  const handleChange = (checked: boolean) => {
    setChecked(checked);
    onChange && onChange(checked);
  };

  return (
    <>
      <div className={`${boardElementClass}-container`}>
        {iconComponent && (
          <div className={`${boardElementClass}-icon`}>{iconComponent}</div>
        )}
        {(type === 'subtask' || type === 'task') && (
          <input
            type='checkbox'
            checked={checked}
            className={`${boardElementClass}-checkbox`}
            onChange={(e) => handleChange(e.target.checked)}
          />
        )}

        <span className={`${boardElementClass}-name`}>{name}</span>
      </div>
      {isActionVisible && (
        <div className={`${boardElementClass}-actions`}>
          {type === 'task' && (
            <div onClick={createSubtask}>
              <Plus />
            </div>
          )}
          <div onClick={deleteAction}>
            {' '}
            <Delete />
          </div>
          <div onClick={editingAction}>
            <Edit />
          </div>
        </div>
      )}
    </>
  );
};
