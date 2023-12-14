'use server';

export const createEnvironment = async (name: string, saveDataJson: string) => {
  console.log(name, saveDataJson);
  return fetch(`${process.env.BACKEND_URL}environments/${name}/save`, {
    method: 'POST',
    headers: {
      'Content-Type': ' application/json',
    },
    body: saveDataJson,
  });
};
