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
    setInputValue('');
  };

  return (
    <>
      {iconComponent && (
        <div className={`${boardElementClass}-icon`}>{iconComponent}</div>
      )}
      <input
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
