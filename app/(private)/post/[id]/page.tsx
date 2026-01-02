import { postApi } from '@/entities/post/api/post.api';
import { PostViewModal } from '@/features/post/viewPost';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const post = await postApi.getPostByIdServer(+id);

  return (
    <div>
      <PostViewModal
        open
        defaultOpen
        post={post}
      />
    </div>
  );
}
