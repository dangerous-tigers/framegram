import { ReactNode } from 'react';
import clsx from 'clsx';

import styles from './PaginationItem.module.scss';

type Props = {
  children?: ReactNode;
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel: string;
  tabIndex: number;
};
export const PaginationItem = (props: Props) => {
  return (
    <button
      className={clsx(styles.button, props.active && styles.active)}
      tabIndex={props.tabIndex}
      role={'button'}
      aria-label={props.ariaLabel}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
