import React, { useState } from 'react';

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Checkbox,
  Select
} from '@chakra-ui/react'

import { Field } from '../../interfaces';

interface InputProps {
  field: Field;
  value: string;
  errorMessage?: boolean;
  onChange: (id: number, val: string | boolean, error: boolean) => void;
}

export function FieldInput(props: InputProps) {
  const { value, errorMessage, onChange, field } = props;
  const [error, setError] = useState<string | null>(null);

  const onChangeVal = (e) => {
    const value = field.input_type === 'checkbox' ? e.target.checked : e.target.value;
    let err = false;
    if (field.input_type === 'text' && field.regex) {
      const exp = RegExp(`${field.regex}`, 'g');
      const matches = (value as string).match(exp);
      if (!matches || (matches.length !== value.length)) {
        err = true;
        setError(field.regexErrorMessage)
      }else {
        setError(null)
      }
    }
    onChange(field.id, value, err);
  }

  return (
    <FormControl isInvalid={!!error} mb="1em" isRequired={field.required}>
      <FormLabel>{field.label}</FormLabel>
      {(field.input_type === 'text') && (
        <Input value={value} name={field.name} onChange={onChangeVal} placeholder={field.placeholder || ''} />
      )}
      {(field.input_type === 'checkbox') && (
        <Checkbox isChecked={value as unknown as boolean} name={field.name} onChange={onChangeVal} />
      )}
      {(field.input_type === 'singleSelect') && (
        <Select name={field.name} onChange={onChangeVal} value={value}>
          {field.options?.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </Select>
      )}
      {error && (
        <FormErrorMessage>{error}</FormErrorMessage>
      )}
    </FormControl>
  )
}