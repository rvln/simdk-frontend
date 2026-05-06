/**
 * Global SWR fetcher utility.
 *
 * Uses the native `fetch` API to align with the existing useAuth.ts pattern
 * (no axios dependency). Reads NEXT_PUBLIC_API_URL from the environment.
 */
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api';

export async function fetcher<T = unknown>(url: string): Promise<T> {
  const fullUrl = url.startsWith('http') ? url : `${API_BASE}${url}`;

  const res = await fetch(fullUrl, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    const error = new Error(
      errorBody?.message ?? `Request failed with status ${res.status}`
    );
    throw error;
  }

  return res.json();
}
