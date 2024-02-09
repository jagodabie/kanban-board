import './Button.scss';

interface ButtonProps {
  onClick: () => void;
  iconComponent?: JSX.Element;
  text: string;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  iconComponent,
  text,
}) => {
  return (
    <button type='button' className='button' onClick={onClick}>
      <span className='button-icon'>{iconComponent}</span>
      <span className='button-text'>{text}</span>
    </button>
  );
};
