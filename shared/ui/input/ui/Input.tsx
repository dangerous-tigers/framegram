'use client';

import { ComponentPropsWithoutRef, useState, useId } from 'react';
import clsx from 'clsx';

import { Search, EyeOutline, EyeOffOutline } from '@/assets/icons';
import s from './Input.module.scss';

type Props = {
  type?: 'text' | 'password' | 'search';
  label?: string;
  error?: string;
  disabled?: boolean;
} & ComponentPropsWithoutRef<'input'>;

export const Input = (p: Props) => {
  const { type = 'text', label, error, disabled, ...rest } = p;
  const [showPassword, setShowPassword] = useState(false);
  const id = useId();

  const isSearch = type === 'search';
  const isPassword = type === 'password';
  const hasError = !!error;
  const inputType = isPassword && showPassword ? 'text' : type;

  const togglePasswordVisibility = () => {
    if (!disabled) setShowPassword((prev) => !prev);
  };

  return (
    <div
      className={clsx(s.root, {
        [s.withError]: hasError,
        [s.disabled]: disabled,
      })}
    >
      {label && (
        <label
          htmlFor={id}
          className={s.label}
        >
          {label}
        </label>
      )}

      <div className={s.inputContainer}>
        {isSearch && (
          <Search
            className={s.leftIcon}
            aria-hidden='true'
          />
        )}

        <input
          id={id}
          type={inputType}
          className={clsx(s.input, {
            [s.withLeftIcon]: isSearch,
            [s.withRightIcon]: isPassword,
          })}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
          disabled={disabled}
          {...rest}
        />

        {isPassword && (
          <button
            type='button'
            onClick={togglePasswordVisibility}
            className={clsx(s.rightIcon, { [s.disabled]: disabled })}
            aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
            aria-disabled={disabled}
            disabled={disabled}
          >
            {showPassword ? <EyeOutline /> : <EyeOffOutline />}
          </button>
        )}
      </div>

      {hasError && (
        <p
          id={`${id}-error`}
          className={s.errorText}
          role='alert'
        >
          {error}
        </p>
      )}
    </div>
  );
};
