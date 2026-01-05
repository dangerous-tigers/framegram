import { ProfileImage } from '@/features/post/viewPost';
import { useViewPostStore } from '@/features/post/viewPost/model';
import { client } from '@/shared/api/client';
import { Button } from '@/shared/ui';
import { useAlertStore } from '@/shared/ui/alert/model/alert-store';
import { Textarea } from '@/shared/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, useEffect, useState } from 'react';
import s from './EditMode.module.scss';

type Props = {
  profileImage: string | undefined;
  userName: string | undefined;
  description: string | undefined;
  postId: number;
};

export const EditMode = ({ profileImage, userName, description, postId }: Props) => {
  const { setIsEdit } = useViewPostStore();
  const { show } = useAlertStore();

  const [value, setValue] = useState<string | undefined>(undefined);
  const textAreaMaxLenght = 500;

  useEffect(() => {
    setValue(description);
  }, [description]);

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
        <span className={s.textAreaLenght}>
          {value?.length === undefined ? 0 : value?.length} / {textAreaMaxLenght}
        </span>
      </div>
      <Button
        variant='primary'
        onClick={saveChanges}
      >
        Save changes
      </Button>
    </div>
  );
};
