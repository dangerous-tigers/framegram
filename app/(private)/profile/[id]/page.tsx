import { getMeServer } from '@/entities/user/model/getMeServer';
import { PostDeleteButton } from '@/features/post/removePost';
import { postApi } from '@/entities/post/api/post.api';
import { Post } from '@/entities/post/model/types';

// Серверная функция для получения постов пользователя
async function getUserPosts(userId: number) {
  try {
    const response = await postApi.getPostsByUser(userId);
    return response.data;
  } catch (error) {
    console.error('Error fetching user posts:', error);
    return null;
  }
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const userId = Number(id);

  // Получаем информацию о текущем пользователе
  const me = await getMeServer();
  const currentUserId = me?.id;

  // Проверяем, является ли текущий пользователь владельцем профиля
  const isOwner = currentUserId === userId;

  // Получаем посты пользователя
  const postsData = await getUserPosts(userId);

  return (
    <div>
      <h1>Profile by user {id}</h1>
      <div>
        {postsData?.items?.map((post: Post) => (
          <div
            key={post.id}
            style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}
          >
            <p>{post.description}</p>
            {isOwner && <PostDeleteButton postId={post.id} />}
          </div>
        ))}
      </div>
    </div>
  );
}
