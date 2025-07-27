import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const uid = localStorage.getItem("uid"); // GET uid dari localStorage
  const res = await fetch(url, {
    method,
    headers: {
      ...(data && { "Content-Type": "application/json" }),
      ...(uid && { "Authorization": uid }),
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";

export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const uid = localStorage.getItem("uid"); // GET dari localStorage
    
    const res = await fetch(queryKey.join("/") as string, {
      headers: {
        // Manual auth header dari localStorage
        ...(uid && { "Authorization": `${uid}` }),
        "Content-Type": "application/json",
      },
      credentials: "include", // PLUS auto cookies (jika backend butuh)
    });

    if (res.status === 401) {
      localStorage.removeItem("uid"); // Clear localStorage
      
      if (unauthorizedBehavior === "returnNull") {
        return null;
      }
      
      throw new Error("Unauthorized");
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
