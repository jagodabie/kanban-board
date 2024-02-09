import './Workspace.scss';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const Workspace = ({
  name,
  id,
  iconComponent,
}: {
  name: string;
  id: string;
  iconComponent: JSX.Element;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className='workspace'
    >
      <div className='workspace-icon'>{iconComponent}</div>
      <span className='workspace-name'>{name}</span>
    </div>
  );
};
