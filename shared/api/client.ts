import createClient, { Middleware } from 'openapi-fetch';

//import { useAlertStore } from '../ui/alert/model/alert-store';
import type { paths } from './schema';

let refreshPromise: Promise<void> | null = null;

function makeRefreshToken() {
  if (!refreshPromise) {
    refreshPromise = (async (): Promise<void> => {
      const response = await refreshClient.POST('/auth/update');

      if (response.error) {
        localStorage.removeItem('accessToken');
      }

      if (!response.data?.accessToken) {
        localStorage.removeItem('accessToken');
        return;
      }

      localStorage.setItem('accessToken', response.data.accessToken);
    })();

    refreshPromise.finally(() => {
      refreshPromise = null;
    });

    return refreshPromise;
  }
}

const retryMap = new WeakMap<Request, Request>();

const authMiddleware: Middleware = {
  onRequest({ request }) {
    // set "foo" header
    const token = localStorage.getItem('accessToken');
    if (token) {
      request.headers.set('Authorization', `Bearer ${token}`);
    }

    //request._retryRequest = request.clone();
    retryMap.set(request, request.clone());

    return request;
  },
  async onResponse({ request, response }) {
    if (response.ok) return response;

    if (response.status !== 401) {
      return response;
    }

    const token = localStorage.getItem('accessToken');

    if (!token) return response;

    try {
      await makeRefreshToken();

      //const originalRequest: Request = request._retryRequest;
      const originalRequest = retryMap.get(request);

      if (!originalRequest) {
        throw new Error('Original request not found');
      }

      const retryRequest = new Request(originalRequest, {
        headers: new Headers(originalRequest.headers),
      });
      retryRequest.headers.set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);

      return fetch(retryRequest);
    } catch {
      localStorage.removeItem('accessToken');
      return response;
    }
  },
};

export const client = createClient<paths>({
  baseUrl: `${process.env.NEXT_PUBLIC_BASEURL}`,
  credentials: 'include',
});

export const refreshClient = createClient<paths>({
  baseUrl: `${process.env.NEXT_PUBLIC_BASEURL}`,
  credentials: 'include',
});

client.use(authMiddleware);
