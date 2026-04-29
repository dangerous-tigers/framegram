import { useQuery } from '@tanstack/react-query';

import { feedApi, FeedComment } from '../../model/feed.api';

import s from '../FeedPage.module.scss';

export function FeedComments({ postId }: { postId: number }) {
  const { data } = useQuery({
    queryKey: ['feed-comments', postId],
    queryFn: () => feedApi.getCommentsPreview(postId),
  });

  if (!data?.length) {
    return null;
  }

  return (
    <>
      <button className={s.viewComments}>View All Comments</button>
      <ul className={s.comments}>
        {data.map((comment: FeedComment) => (
          <li key={comment.id}>
            <span className={s.commentUser}>{comment.from.username}</span>
            <span>{comment.content}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
