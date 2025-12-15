import { JSX, memo } from 'react';
import { useController, Control, FieldValues, FieldPath } from 'react-hook-form';
import { Input } from '@/shared/ui/input';

type Props<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  clearable?: boolean;
};

function FieldInputInner<T extends FieldValues>(props: Props<T>) {
  const { name, control, label, type = 'text', placeholder, clearable } = props;

  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <Input
      {...field}
      value={field.value ?? ''}
      type={type}
      label={label}
      placeholder={placeholder}
      clearable={clearable}
      error={error?.message}
    />
  );
}

export const FieldInput = memo(FieldInputInner) as <T extends FieldValues>(props: Props<T>) => JSX.Element;
