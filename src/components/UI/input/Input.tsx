import { useEffect, useState } from 'react';
import './Input.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppDispatch';
import { updateWorkspaceName } from '../../../store/slices/actions';

export const Input = ({
  placeholder,
  onBlur,
  onChange,
  boardElementClass,
  iconComponent,
  name,
  type,
  id,
}: {
  boardElementClass: string;
  placeholder: string;
  iconComponent?: JSX.Element;
  name?: string;
  id?: string;
  type?: string;
  onBlur: (inputValue: string) => void;
  onChange?: (inputValue?: string) => void;
}) => {
  const [inputValue, setInputValue] = useState(id ? name : '');
  const dispatch = useAppDispatch();
  const handleLeaveInput = () => {
    onBlur(inputValue || '');
    id ? setInputValue(name) : setInputValue('');
  };
  const save = useAppSelector(({ workspace }) => workspace.save);

  const handleChange = (value: string) => {
    setInputValue(value);
    onChange && onChange(value);
  };

  useEffect(() => {
    if (!save && type === 'workspace') {
      dispatch(updateWorkspaceName(inputValue || ''));
    }
  }, [dispatch, inputValue, save]);

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
        onChange={(e) => handleChange(e.target.value)}
      />
    </>
  );
};
