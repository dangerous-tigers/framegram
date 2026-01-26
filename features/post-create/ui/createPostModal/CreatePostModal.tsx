import { useEffect, useState } from 'react';

import s from './createPostModal.module.scss';

import { useCreatePostMutation } from '@/entities/post-create/api/useCreatePostMutation';
import { CreatePostStep } from '@/features/post-create/model/CreatePostType';
import { useCreatePostStore } from '@/features/post-create/model/storeCreatePost';
import { CropStep } from '@/features/post-create/ui/CropStep';
import { FilterStep } from '@/features/post-create/ui/filterStep/FilterStep';
import { PublishStep } from '@/features/post-create/ui/PublishStep/PublishStep';
import { UploadStep } from '@/features/post-create/ui/uploadStep/UploadStep';
import { applyFilterToFile } from '@/shared/lib/image';
import { Modal, ModalHeaderWithClose, ModalHeaderWithNext } from '@/shared/ui';
import { PolymorphicButton } from '@/shared/ui/polymorphic-button';

export const CreatePostModal = () => {
  const step = useCreatePostStore((s) => s.step);
  const setStep = useCreatePostStore((s) => s.setStep);
  const reset = useCreatePostStore((s) => s.reset);

  const [showCloseModal, setShowCloseModal] = useState(false);

  const [sizeModal, setSizeModal] = useState<'sm' | 'md' | 'lg' | 'xl' | undefined>('md');

  const images = useCreatePostStore((s) => s.images);

  const description = useCreatePostStore((s) => s.description);

  const { mutate, isPending } = useCreatePostMutation();

  const onPublish = async () => {
    const filteredFiles = await Promise.all(images.map((img) => applyFilterToFile(img.file, img.filter)));

    mutate(
      {
        files: filteredFiles,
        description,
      },
      {
        onSuccess: () => {
          if (isPending) return;

          reset();
          setShowCloseModal(false);
          setOpen(false);
        },
      },
    );
  };

  useEffect(() => {
    setSizeModal(step === 'publish' || step === 'filter' ? 'xl' : 'md');
  }, [step]);

  const discardHandler = async () => {
    await reset();
    setShowCloseModal(false);
    setOpen(false);
  };

  const saveDraftHandler = () => {
    setShowCloseModal(false);
    setOpen(false);
  };

  const closeHandler = () => {
    setShowCloseModal(true);
  };

  const isOpen = useCreatePostStore((s) => s.isOpen);
  const setOpen = useCreatePostStore((s) => s.setOpen);

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
            onNext={onPublish}
            titleNext='Publish'
            nextDisabled={isPending}
          />
        );
      }
    }
  };

  return (
    <>
      {/* ОСНОВНАЯ МОДАЛКА */}
      <Modal
        className={s.rootBaseModal}
        size={sizeModal}
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) closeHandler();
        }}
        header={getCurrentStep(step)}
      >
        {step === 'upload' && <UploadStep />}
        {step === 'crop' && <CropStep />}
        {step === 'filter' && <FilterStep />}
        {step === 'publish' && (isPending ? <p>Loading</p> : <PublishStep />)}
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
