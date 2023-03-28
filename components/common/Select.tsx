import React from 'react';

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select
} from '@chakra-ui/react'

interface InputProps {
  label: string;
  value: string | number;
  placeholder?: string;
  isRequired?: boolean;
  errorMessage?: boolean;
  onChange: (e) => void;
  options: { label: string; value: string | number }[];
}

export function SelectField(props: InputProps) {
  const { label, value, isRequired, errorMessage, onChange, placeholder } = props;
  return (
    <FormControl mb="1rem" isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      <Select >
        {props.options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </Select>
      {errorMessage && (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      )}
    </FormControl>
  )
}