 import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import { Container, Error } from './style';
import { IconBaseProps } from "react-icons"
import { useCallback } from 'react';
import { useRef } from 'react';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon?: React.ComponentType<IconBaseProps>;
    error?: any
    // children: ReactNode
}

export default function Input ({ name, icon: Icon, ...props}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  //console.log(inputRef)

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, registerField, error} = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  const handleInputFocus = useCallback(()=>{
    setIsFocused(true)
  },[])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    
    setIsFilled(!!inputRef.current?.value)
    // if (inputRef.current?.value) {
    //   setIsFilled(true)
    // } else {
    //   setIsFilled(false)
    // }
  }, [])

  return (
    <Container isError={!!error} isFilled={isFilled} isFocused={isFocused}>
      { Icon && <Icon size={20}/>}
      <input 
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        ref={inputRef}
        {...props}/>
        {error && (
        <Error title={error}>
          <FiAlertCircle color='#c53030' size={20}  />
        </Error>) }
    </Container>
  )
}