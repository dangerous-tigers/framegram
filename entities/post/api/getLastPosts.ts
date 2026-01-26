export const getLastPosts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/public-posts/all/0`);

  if (!res.ok) throw new Error('Failed');

  return res.json();
};
