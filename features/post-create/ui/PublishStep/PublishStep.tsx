import { useCreatePostStore } from '@/features/post-create/model/storeCreatePost';
import { PublishForm } from '@/features/post-create/ui/PublishStep/PublishForm';

export const PublishStep = () => {
  const images = useCreatePostStore((s) => s.images);
  const description = useCreatePostStore((s) => s.description);

  const publish = async () => {
    const formData = new FormData();
    images.forEach((img) => formData.append('files', img.file));
    formData.append('description', description);

    await postApi.create(formData);
  };

  return <PublishForm onSubmit={publish} />;
};
