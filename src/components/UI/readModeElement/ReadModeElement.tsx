import { Delete } from '../../../assets/icons/Delete';
import { Edit } from '../../../assets/icons/Edit';

export const ReadModeElement = ({
  boardElementClass,
  iconComponent,
  name,
  isActionVisible,
  deleteAction,
  editingAction,
}: {
  boardElementClass: string;
  iconComponent: React.ReactNode;
  name: string;
  isActionVisible: boolean;
  deleteAction: () => void;
  editingAction: () => void;
}) => {
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
