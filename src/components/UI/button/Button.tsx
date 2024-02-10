import './Button.scss';

interface ButtonProps {
  onClick: () => void;
  iconComponent?: JSX.Element;
  text: string;
  disabled?: boolean;
  type?: 'primary' | '';
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  iconComponent,
  text,
  disabled,
  type,
}) => {
  return (
    <button
      type='button'
      className={`button${type ? ` button-${type}` : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className='button-icon'>{iconComponent}</span>
      <span className='button-text'>{text}</span>
    </button>
  );
};
