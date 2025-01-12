import { ZodType } from "zod";

export const customFetch = async <T>(
  input: RequestInfo,
  schema: ZodType<T>,
  init?: RequestInit
) => {
  console.debug(process.env.BACKEND_BASE_URL);
  const response = await fetch(`${process.env.BACKEND_BASE_URL}/${input}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const res = schema?.parse(await response.json());

  return res;
};
