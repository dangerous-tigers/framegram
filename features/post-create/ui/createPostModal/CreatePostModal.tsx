import { useCreatePostStore } from '@/features/post-create/model/storeCreatePost';
import { Modal, ModalHeaderWithClose, ModalHeaderWithNext } from '@/shared/ui';
import { UploadStep } from '@/features/post-create/ui/UploadStep/UploadStep';
import { PublishStep } from '@/features/post-create/ui/PublishStep/PublishStep';
import { CropStep } from '@/features/post-create/ui/CropStep';
import { FilterStep } from '@/features/post-create/ui/FilterStep';
import { CreatePostStep } from '@/features/post-create/model/CreatePostType';
import { useEffect, useState } from 'react';
import { PolymorphicButton } from '@/shared/ui/buttonComponent';
import s from './createPostModal.module.scss';

export const CreatePostModal = () => {
  const step = useCreatePostStore((s) => s.step);
  const setStep = useCreatePostStore((s) => s.setStep);
  const reset = useCreatePostStore((s) => s.reset);

  const [showCloseModal, setShowCloseModal] = useState(false);
  const [sizeModal, setSizeModal] = useState<'sm' | 'md' | 'lg' | 'xl' | undefined>('md');

  useEffect(() => {
    if (step === 'publish') {
      setSizeModal('xl');
    } else {
      setSizeModal('md'); // остальные шаги
    }
  }, [step]);

  const discardHandler = async () => {
    await reset();
    setShowCloseModal(false);
    setStep('');
  };

  const saveDraftHandler = () => {
    setShowCloseModal(false);
    setStep('');
  };

  const closeHandler = () => {
    setShowCloseModal(true);
  };

  const getCurrentStep = (step: CreatePostStep) => {
    switch (step) {
      case 'upload': {
        return (
          <ModalHeaderWithClose
            title='Add Photo'
            onClose={closeHandler}
          />
        );
      }
      case 'crop': {
        return (
          <ModalHeaderWithNext
            title='Cropping'
            onBack={() => setStep('upload')}
            onNext={() => setStep('filter')}
          />
        );
      }
      case 'filter': {
        return (
          <ModalHeaderWithNext
            title='Filters'
            onBack={() => setStep('crop')}
            onNext={() => setStep('publish')}
          />
        );
      }
      case 'publish': {
        return (
          <ModalHeaderWithNext
            title='Publication'
            onBack={() => setStep('filter')}
            onNext={() => setStep('')}
            titleNext='Publish'
          />
        );
      }
    }
  };

  return (
    <>
      {/* ОСНОВНАЯ МОДАЛКА */}
      <Modal
        size={sizeModal}
        open={!!step}
        onOpenChange={closeHandler}
        header={getCurrentStep(step)}
      >
        {step === 'upload' && <UploadStep />}
        {step === 'crop' && <CropStep />}
        {step === 'filter' && <FilterStep />}
        {step === 'publish' && <PublishStep />}
      </Modal>

      {/* МОДАЛКА ПОДТВЕРЖДЕНИЯ ЗАКРЫТИЯ */}
      <Modal
        size='sm'
        open={showCloseModal}
        onOpenChange={() => null}
        header={
          <ModalHeaderWithClose
            title='Сlose'
            onClose={() => setShowCloseModal(false)}
          />
        }
      >
        <div className={s.modalConfirmClose}>
          <div>
            <p>Do you really want to close the creation of a publication?</p>
            <p>If you close everything will be deleted</p>
          </div>
          <div className={s.btns}>
            <PolymorphicButton
              onClick={discardHandler}
              variant='outline'
            >
              Discard
            </PolymorphicButton>
            <PolymorphicButton onClick={saveDraftHandler}>Save draft</PolymorphicButton>
          </div>
        </div>
      </Modal>
    </>
  );
};
