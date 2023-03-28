import React from 'react';

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input
} from '@chakra-ui/react'

interface InputProps {
  label: string;
  value: string;
  placeholder?: string;
  isRequired?: boolean;
  errorMessage?: boolean;
  onChange: (e) => void;
}

export function InputField(props: InputProps) {
  const { label, value, isRequired, errorMessage, onChange, placeholder } = props;
  return (
    <FormControl mb="1em" isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      <Input value={value} onChange={onChange} placeholder={placeholder} />
      {errorMessage && (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      )}
    </FormControl>
  )
}