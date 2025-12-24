'use client';

import { ComponentPropsWithRef, useState } from 'react';
import clsx from 'clsx';

import { Search, EyeOutline, EyeOffOutline } from '@/assets/icons';

import s from './Input.module.scss';

type Props = {
  type?: 'text' | 'password' | 'search' | 'email';
  label?: string;
  error?: string;
  disabled?: boolean;
} & ComponentPropsWithRef<'input'>;

/**
 * - `type?` — тип поля ввода (`'text'`, `'password'`, `'search'`, `'email'`)
 * - `label?` — метка над полем
 * - `error?` — сообщение об ошибке
 * - `disabled?` — отключает поле
 *
 * Наследует все пропсы `<input>`.
 */

export const Input = (p: Props) => {
  const { type = 'text', label, error, disabled, ...rest } = p;

  const [showPassword, setShowPassword] = useState(false);

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
      <label>
        {label && <span className={s.label}>{label}</span>}
        <div className={s.inputContainer}>
          {isSearch && (
            <Search
              className={clsx(s.leftIcon, { [s.leftIconColorWhite]: error })}
              aria-hidden='true'
            />
          )}

          <input
            type={inputType}
            className={clsx(s.input, {
              [s.withLeftIcon]: isSearch,
              [s.withRightIcon]: isPassword,
            })}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${rest.name}-error` : undefined}
            disabled={disabled}
            {...rest}
          />
          {isPassword && (
            <button
              type='button'
              onClick={togglePasswordVisibility}
              className={clsx(s.rightIcon, { [s.disabled]: disabled })}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              aria-pressed={showPassword}
              aria-disabled={disabled}
              disabled={disabled}
            >
              {showPassword ? <EyeOutline /> : <EyeOffOutline />}
            </button>
          )}
        </div>
      </label>

      {hasError && (
        <p
          id={`${rest.name}-error`}
          className={s.errorText}
          role='alert'
          aria-live='polite'
        >
          {error}
        </p>
      )}
    </div>
  );
};
