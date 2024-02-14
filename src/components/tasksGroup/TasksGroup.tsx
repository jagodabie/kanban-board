import { Plus } from '../../assets/icons';
import { Button } from '../UI/button';
import { Task } from '../task/Task';
import './TasksGroup.scss';
export const TasksGroup: React.FC<{
  name: string;
  tasks: Record<string, string>[] | [];
}> = ({ name, tasks }) => {
  return (
    <div className='tasks-group'>
      <div className='tasks-group-header'>{name}</div>
      <div className='tasks-group-main'>
        {/* TODO: remove mock */}
        {tasks?.map((task) => (
          <Task key={task.id} name={task.name} />
        ))}
      </div>
      <div className='tasks-group-footer'>
        <Button
          text='Add a card'
          onClick={() => console.log('test')}
          iconComponent={
            <Plus
              color='#background: #88819F
          '
            />
          }
        />
      </div>
    </div>
  );
};
