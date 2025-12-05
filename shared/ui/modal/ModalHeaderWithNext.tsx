import * as Dialog from '@radix-ui/react-dialog';
import styles from './ModalHeader.module.scss';
import { ArrowIosBackOutline } from '@/assets/icons';
type Props = {
  title: string;
  titleNext?: string;
  onBack: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
};

export const ModalHeaderWithNext = ({ title, titleNext = 'Next', onBack, onNext, nextDisabled = false }: Props) => {
  return (
    <>
      <button className={styles.iconButton} onClick={onBack} type='button' aria-label='Back'>
        <ArrowIosBackOutline />
      </button>
      <Dialog.Title asChild>
        <h2 className={styles.title}>{title}</h2>
      </Dialog.Title>
      <button onClick={onNext} disabled={nextDisabled} type='button'>
        {titleNext}
      </button>
    </>
  );
};
