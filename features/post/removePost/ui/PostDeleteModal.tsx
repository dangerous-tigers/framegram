import { useTranslations } from 'next-intl';

import { Modal, ModalHeaderWithClose, Button } from '@/shared/ui';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading?: boolean;
};

export const PostDeleteModal = ({ open, onOpenChange, onConfirm, isLoading }: Props) => {
  const t = useTranslations('deletePostModal');

  const handleConfirm = () => {
    onConfirm();
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      size='sm'
      header={
        <ModalHeaderWithClose
          title={t('title')}
          onClose={handleClose}
        />
      }
    >
      <div style={{ padding: '24px' }}>
        <p style={{ marginBottom: '24px' }}>{t('message')}</p>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button
            variant='secondary'
            onClick={handleClose}
            disabled={isLoading}
            fullWidth
          >
            {t('no')}
          </Button>
          <Button
            variant='primary'
            onClick={handleConfirm}
            disabled={isLoading}
            fullWidth
          >
            {t('yes')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
