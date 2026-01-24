export const getTotalUsers = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/public-user`, { cache: 'no-store' });

  if (!res.ok) throw new Error('Failed');

  return (await res.json()) as Promise<{ totalCount: number }>;
};
