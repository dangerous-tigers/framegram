import { PostDeleteButtonClient } from './PostDeleteButtonClient';

type Props = {
  postId: number;
  disabled?: boolean;
};

export const PostDeleteButton = ({ postId, disabled }: Props) => {
  return (
    <PostDeleteButtonClient
      postId={postId}
      disabled={disabled}
    />
  );
};
