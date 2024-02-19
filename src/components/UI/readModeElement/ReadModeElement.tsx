import { Delete } from '../../../assets/icons/Delete';
import { Edit } from '../../../assets/icons/Edit';
import { Plus } from '../../../assets/icons/Plus';

export const ReadModeElement = ({
  boardElementClass,
  iconComponent,
  name,
  type,
  isActionVisible,
  deleteAction,
  editingAction,
  createSubtask,
}: {
  boardElementClass: string;
  iconComponent: React.ReactNode;
  name: string;
  type?: string;
  isActionVisible: boolean;
  deleteAction: () => void;
  editingAction: () => void;
  createSubtask?: () => void;
}) => {
  console.log('ReadModeElement', type);
  return (
    <>
      <div className={`${boardElementClass}-container`}>
        {iconComponent && (
          <div className={`${boardElementClass}-icon`}>{iconComponent}</div>
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
