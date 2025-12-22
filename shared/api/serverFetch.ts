import { cookies } from 'next/headers';

export async function getMeServer() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!refreshToken) throw new Error('No refresh token');

  // функция для получения нового accessToken
  const fetchMe = async () => {
    const res = await fetch('https://inctagram.work/api/v1/auth/me', {
      headers: { Cookie: `refreshToken=${refreshToken}` },
      credentials: 'include',
      cache: 'no-store',
    });

    if (res.status === 401) {
      // пробуем обновить токен
      const updateRes = await fetch('https://inctagram.work/api/v1/auth/update', {
        method: 'POST',
        headers: { Cookie: `refreshToken=${refreshToken}` },
        credentials: 'include',
      });

      if (!updateRes.ok) throw new Error('Cannot refresh token');

      return fetchMe(); // повторяем me после обновления
    }

    if (!res.ok) throw new Error('Unauthorized');

    return res.json();
  };

  return fetchMe();
}
