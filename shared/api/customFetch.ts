let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

export async function customFetch(input: RequestInfo, init?: RequestInit) {
  const token = localStorage.getItem('accessToken');

  const modifiedInit: RequestInit = {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: 'include',
  };

  const response = await fetch(input, modifiedInit);

  // ---------- Если все ок ----------
  if (response.status !== 401) return response;

  // ---------- Если пришло 401 ----------
  if (!isRefreshing) {
    isRefreshing = true;
    refreshPromise = refreshToken().finally(() => {
      isRefreshing = false;
    });
  }

  const newToken = await refreshPromise!;

  // повторяем запрос с новым токеном
  const retryInit: RequestInit = {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: `Bearer ${newToken}`,
    },
    credentials: 'include',
  };

  return fetch(input, retryInit);
}

async function refreshToken(): Promise<string> {
  const res = await fetch('https://inctagram.work/api/v1/auth/update', {
    method: 'POST',
    credentials: 'include',
  });

  if (!res.ok) {
    localStorage.removeItem('accessToken');
    throw new Error('Cannot refresh token');
  }

  const data = await res.json();
  const newToken = data.accessToken;

  localStorage.setItem('accessToken', newToken);
  return newToken;
}
