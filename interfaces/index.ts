export interface Field {
  id: number;
  name: string;
  input_type: string;
  label: string;
  regex?: string;
  regexErrorMessage?: string;
  placeholder?: string;
  required: boolean;
  options?: { label: string; value: string | number }[];
}

export interface FieldValue {
  id: number;
  value: string | boolean;
}

export interface Template {
  id: number;
  name: string;
  fields: Field[];
}

export interface Source {
  id?: number;
  name: string;
  templateId: number;
  fields: FieldValue[];
}

export interface SourceModal {
  id?: number;
  onClose: () => void;
  templates: Template[];
  sourceName?: string;
  source?: Source;
  onSubmit: (source: Source) => void;
}