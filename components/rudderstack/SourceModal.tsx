import React, { useEffect, useMemo, useState } from 'react';

import { ModalContainer } from '../common/Modal';
import { InputField } from '../common/Input';
import { SelectField } from '../common/Select';
import { FieldInput } from './Field';
import { SourceModal, Source } from '../../interfaces';

export function SourceModal(props: SourceModal) {
  const [source, setSource] = useState<Source | null>(window.structuredClone(props.source));
  const [errors, setErrors] = useState(new Set());

  const onChangeName = (e) => {
    setSource((s) => ({
      ...s,
      name: e.target.value
    }))
  }

  const onChangeTemplate = (e) => {
    const templateId = Number(e.target.value)
    setSource((s) => ({
      ...s,
      templateId,
      fields: props.templates.find(t => t.id === templateId)?.fields.map((f) => ({ id: f.id, value: null }))
    }))
  }

  const onChangeField = (id: number, value, error) => {
    setSource((s) => ({
      ...s,
      fields: s.fields.map((f) => f.id !== id ? f : { id, value })
    }))
    if (error) {
      errors.add(id)
      setErrors(errors)
    } else {
      errors.delete(id)
      setErrors(errors)
    }
  }

  if (!props.templates) return null;

  const templateOptions = useMemo(() => {
    return (props.templates || []).map((t) => ({ label: t.name, value: t.id }));
  }, [props.templates])

  const fields = useMemo(() => {
    return props.templates.find((t) => t.id === source.templateId)?.fields;
  }, [source.templateId]);

  const fieldsValMap = useMemo(() => {
    const obj = {};
    (source.fields || []).forEach((f) => {
      obj[f.id] = f.value
    })
    return obj
  }, [source.fields]);

  const isSubmitDisabled = errors.size > 0 || !source.name || !source.templateId || source.fields.length === 0;

  const primaryButton = {
    label: source.id ? 'Update' : 'Create',
    disabled: isSubmitDisabled,
    onClick: () => props.onSubmit(source)
  }

  console.log('isSubmitDisabled, ', isSubmitDisabled);

  console.log('source?', source);
  return (
    <ModalContainer 
      primaryButton={primaryButton} 
      title={source.id ? 'Update Source' : 'Create New Source'} 
      isOpen 
      onClose={props.onClose}
      onDelete={() => props.onDeleteSource(source.id)}
    >
      <InputField isRequired label="Name" placeholder="Source name" value={source.name || ''} onChange={onChangeName} />
      <SelectField isRequired label="Template" onChange={onChangeTemplate} value={source.templateId || ''} options={templateOptions} />
      {(fields || []).map((field) => (
        <FieldInput 
          value={fieldsValMap[field.id]} 
          field={field}
          onChange={onChangeField}
        />
      ))}
    </ModalContainer>
  )
}