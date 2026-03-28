import { JSX, memo } from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';

import { Checkbox } from '@/shared/ui';

type Props<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
};

function FieldCheckboxInner<T extends FieldValues>(props: Props<T>) {
  const { name, control, label } = props;

  const { field } = useController({
    name,
    control,
  });

  return (
    <>
      <Checkbox
        checked={!!field.value}
        onCheckedChange={field.onChange}
        label={label}
      />
    </>
  );
}

export const FieldCheckbox = memo(FieldCheckboxInner) as <T extends FieldValues>(props: Props<T>) => JSX.Element;
