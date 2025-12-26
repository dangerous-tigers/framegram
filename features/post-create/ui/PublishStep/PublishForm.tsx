import { useCreatePostMutation } from '@/entities/post/api/post.api';
import { useCreatePostStore } from '@/features/post-create/model/storeCreatePost';
import s from './publishStep.module.scss';

export const PublishForm = () => {
  const images = useCreatePostStore((s) => s.images);
  const description = useCreatePostStore((s) => s.description);
  const reset = useCreatePostStore((s) => s.reset);

  const { mutate, isPending } = useCreatePostMutation();

  const onPublish = () => {
    mutate(
      {
        files: images.map((i) => i.file),
        description,
      },
      {
        onSuccess: () => {
          reset();
        },
      },
    );
  };

  return (
    <div className={s.wrapper}>
      <div className={s.swiper}></div>
      <div className={s.content}>
        <div className={s.profile}></div>
      </div>
      <textarea
        maxLength={500}
        placeholder='Add a description...'
        value={description}
        onChange={(e) => useCreatePostStore.getState().setDescription(e.target.value)}
      />

      <button
        disabled={isPending}
        onClick={onPublish}
      >
        {isPending ? 'Publishing...' : 'Publish'}
      </button>
    </div>
  );
};
