'use server';

export const getAllEnvironments: () => Promise<Response> = async () => {
  return fetch(`${process.env.BACKEND_URL}environments/`);
};
