import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { ChangeEvent, useEffect } from 'react';

import s from './EditMode.module.scss';

import { useConfirmStore } from '@/features/post/editPost/modal/useConfirmStore';
import { ProfileImage } from '@/features/post/viewPost';
import { useViewPostStore } from '@/features/post/viewPost/model';
import { client } from '@/shared/api/client';
import { ConfirmActionModal } from '@/shared/components/confirmActionModal';
import { TEXT_AREA_MAX_LENGTH } from '@/shared/constants/constants';
import { Button } from '@/shared/ui';
import { useAlertStore } from '@/shared/ui/alert/model/alert-store';
import { Textarea } from '@/shared/ui/textarea';

type Props = {
  profileImage: string | undefined;
  userName: string | undefined;
  description: string | undefined;
  postId: number;
};

export const EditMode = ({ profileImage, userName, postId, description }: Props) => {
  const { value, setValue } = useConfirmStore();
  const { show } = useAlertStore();
  const { setIsEdit } = useViewPostStore();
  const { open } = useConfirmStore();
  const t = useTranslations('confirmActions');

  useEffect(() => {
    setValue(description);
  }, []);

  const queryClient = useQueryClient();

  const saveChangesMutation = useMutation({
    mutationFn: async (value: string) => {
      const response = await client.PUT('/posts/{postId}', {
        body: {
          description: value,
        },
        params: {
          path: {
            postId: postId,
          },
        },
      });

      if (response.error) {
        throw response.error;
      }
    },
    onError: (error) => {
      show({
        error: error.message ? error.message : 'Some occurred error',
        severity: 'error',
        variant: 'default',
        description: null,
      });
      // An error happened!
    },
    onSuccess: () => {
      setIsEdit(false);
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      // Boom baby!
    },
    onSettled: () => {
      // Error or success... doesn't matter!
    },
  });

  const onValueHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value);
  };

  const saveChanges = () => {
    if (value !== undefined) {
      saveChangesMutation.mutate(value);
    }
  };

  return (
    <div className={s.editContainer}>
      <ProfileImage
        avatar={profileImage}
        userName={userName}
      />
      <div className={s.textArea}>
        <span>Add publication descriptions</span>
        <Textarea
          value={value}
          onChange={onValueHandler}
        />
        <span className={s.textAreaLength}>
          {value?.length === undefined ? 0 : value?.length} / {TEXT_AREA_MAX_LENGTH}
        </span>
      </div>
      <Button
        variant='primary'
        onClick={saveChanges}
        disabled={value !== undefined && value.length > TEXT_AREA_MAX_LENGTH}
      >
        Save changes
      </Button>
      {open && (
        <ConfirmActionModal confirmCallback={() => setIsEdit(false)}>
          <span>{t('closeEditMode')}</span>
        </ConfirmActionModal>
      )}
    </div>
  );
};
