import { useState } from 'react';

export const Input = ({
  placeholder,
  onBlur,
  boardElementClass,
  iconComponent,
  name,
}: {
  boardElementClass: string;
  placeholder: string;
  iconComponent?: JSX.Element;
  name?: string;
  onBlur: (inputValue: string) => void;
}) => {
  const [inputValue, setInputValue] = useState(name || '');

  return (
    <>
      {iconComponent && (
        <div className={`${boardElementClass}-icon`}>{iconComponent}</div>
      )}
      <div className={boardElementClass}>
        <input
          value={inputValue}
          placeholder={placeholder}
          onBlur={() => onBlur(inputValue)}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </div>
    </>
  );
};
