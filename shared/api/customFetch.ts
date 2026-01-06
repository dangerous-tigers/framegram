let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

export async function customFetch(input: RequestInfo, init?: RequestInit) {
  const token = localStorage.getItem('accessToken');

  const isFormData = init?.body instanceof FormData;

  const modifiedInit: RequestInit = {
    ...init,
    headers: {
      ...(init?.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      // Content-Type добавляем ТОЛЬКО если это НЕ FormData
      ...(!isFormData ? { 'Content-Type': 'application/json' } : {}),
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
      ...(!isFormData ? { 'Content-Type': 'application/json' } : {}),
    },
    credentials: 'include',
  };

  return fetch(input, retryInit);
}

async function refreshToken(): Promise<string> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/auth/update`, {
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
