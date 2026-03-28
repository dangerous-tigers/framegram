import { ArrowIosBackOutline } from '@/assets/icons';
import * as Dialog from '@radix-ui/react-dialog';

import { Button } from '../button/Button';

import styles from './ModalHeader.module.scss';

type Props = {
  title: string;
  titleNext?: string;
  onBack: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
};

export const ModalHeaderWithNext = ({ title, titleNext = 'Next', onBack, onNext, nextDisabled = false }: Props) => {
  return (
    <div className={styles.header}>
      <button
        className={styles.iconButton}
        onClick={onBack}
        type='button'
        aria-label='Back'
      >
        <ArrowIosBackOutline />
      </button>
      <Dialog.Title asChild>
        <h2 className={styles.title}>{title}</h2>
      </Dialog.Title>
      <Button
        variant='text'
        onClick={onNext}
        disabled={nextDisabled}
        fullWidth={false}
      >
        {titleNext}
      </Button>
    </div>
  );
};
