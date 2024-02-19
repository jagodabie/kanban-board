import { useState } from 'react';
import './Input.scss';

export const Input = ({
  placeholder,
  onBlur,
  boardElementClass,
  iconComponent,
  name,
  id,
}: {
  boardElementClass: string;
  placeholder: string;
  iconComponent?: JSX.Element;
  name?: string;
  id?: string;
  onBlur: (inputValue: string) => void;
}) => {
  const [inputValue, setInputValue] = useState(id ? name : '');

  const handleLeaveInput = () => {
    onBlur(inputValue || '');
    id ? setInputValue(name) : setInputValue('');
  };

  return (
    <>
      {iconComponent && (
        <div className={`${boardElementClass}-icon`}>{iconComponent}</div>
      )}
      <input
        className={boardElementClass ? `${boardElementClass}-input` : ''}
        value={inputValue}
        placeholder={placeholder}
        id={id}
        onKeyDown={(e) => {
          e.key === 'Enter' && handleLeaveInput();
        }}
        onBlur={() => handleLeaveInput()}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
    </>
  );
};
