import { PostViewModal } from '@/features/post/viewPost';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  async function getPostById() {
    const response = await fetch(`https://inctagram.work/api/v1/posts/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
  const post = await getPostById();

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
