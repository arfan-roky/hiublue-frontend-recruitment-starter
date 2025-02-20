export const fetchClient = async <T>(url: string, options?: RequestInit) => {
  const token = localStorage.getItem("auth");
  const auth = token ? JSON.parse(token) : null;

  if (auth) {
    options = {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${auth.token}`,
      },
    };
  }

  return fetch(process.env.NEXT_PUBLIC_API_URL + url, {
    ...options,
    headers: {
      ...options?.headers,
      "Content-Type": "application/json",
    },
  });
};
