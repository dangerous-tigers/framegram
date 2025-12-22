import { cookies } from 'next/headers';

export async function getMeServer() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;
  // console.log('SSR refreshToken:', refreshToken); // <- важно

  if (!refreshToken) throw new Error('No refresh token');

  const res = await fetch('https://inctagram.work/api/v1/auth/me', {
    headers: { Cookie: `refreshToken=${refreshToken}` },
    credentials: 'include',
    cache: 'no-store',
  });

  // console.log('SSR /me status:', res.status);

  if (res.status === 401) {
    const updateRes = await fetch('https://inctagram.work/api/v1/auth/update', {
      method: 'POST',
      headers: { Cookie: `refreshToken=${refreshToken}` },
      credentials: 'include',
    });
    // console.log('SSR /update status:', updateRes.status);

    if (!updateRes.ok) throw new Error('Cannot refresh token');

    return getMeServer();
  }

  if (!res.ok) throw new Error('Unauthorized');

  return res.json();
}
