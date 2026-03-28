import { InputHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

import s from './inputWithIcon.module.scss';

type InputWithIconProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode;
  label?: string;
};

export const InputWithIcon = ({ icon, className, label, ...props }: InputWithIconProps) => {
  return (
    <label className={clsx(s.wrapper, className)}>
      <span className={s.label}>{label}</span>
      <div className={s.inputWrapper}>
        <input
          className={s.input}
          {...props}
        />
        {icon && <span className={s.icon}>{icon}</span>}
      </div>
    </label>
  );
};
