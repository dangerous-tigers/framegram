'use client';

import { ComponentPropsWithoutRef, useState } from 'react';
import clsx from 'clsx';

import { Search, EyeOutline, EyeOffOutline, Close } from '@/assets/icons';

import s from './Input.module.scss';

type Props = {
  type?: 'text' | 'password' | 'search' | 'email';
  label?: string;
  error?: string;
  disabled?: boolean;
  value: string;
  clearable?: boolean;
  onChange: (value: string) => void;
} & Omit<ComponentPropsWithoutRef<'input'>, 'onChange' | 'value'>;

/**
 * - `type?` — тип поля ввода (`'text'`, `'password'`, `'search'`, `'email'`)
 * - `label?` — метка над полем
 * - `error?` — сообщение об ошибке
 * - `disabled?` — отключает поле
 * - `value` — текущее значение (обязательное)
 * - `clearable?` — показывает иконку очистки
 * - `onChange` — обработчик изменения значения
 *
 * Наследует все пропсы `<input>`, кроме `value` и `onChange` (переопределены).
 */

export const Input = (p: Props) => {
  const { type = 'text', label, error, disabled, value, onChange, clearable, ...rest } = p;

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

              [s.withRightIcon]: isPassword || value.length > 0,
            })}
            value={value}
            aria-invalid={hasError}
            aria-describedby={error}
            disabled={disabled}
            onChange={(e) => onChange(e.currentTarget.value)}
            {...rest}
          />
          {!isPassword && value.length > 0 && clearable && (
            <Close
              style={{ width: 20 }}
              className={clsx(s.rightIcon, { [s.disabled]: disabled })}
              onClick={() => onChange('')}
            />
          )}

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
          id={error}
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
