import React, { InputHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';

import { Label, Container, Error } from './styles';
import { FiAlertCircle } from 'react-icons/fi';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  name: string;
  label?: string;
  placeholder?: string;
  containerStyle?: object;
}

const Input: React.FC<IInputProps> = ({ name, id, label, placeholder, containerStyle = {}, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { registerField, defaultValue, error, fieldName } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <>
      <Label htmlFor={id}>{label}</Label>

      <Container
        style={containerStyle}
        isErrored={!!error}
        isFilled={isFilled}
        isFocused={isFocused}
        data-testid="input-container"
      >
        <input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          ref={inputRef}
          id={id}
          placeholder={placeholder}
          {...rest}
        />

        {error && (
          <Error title={error}>
            <FiAlertCircle color="#c53030" size={20}/>
          </Error>
        )}
      </Container>
    </>
  );
};

export default Input;
