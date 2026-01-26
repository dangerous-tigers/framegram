import { notFound } from 'next/navigation';

import { postApi } from '@/entities/post/api/post.api';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const post = await postApi.getPostByIdServer(+id);
    return <div>{post.id}</div>;
  } catch {
    notFound();
  }
}
