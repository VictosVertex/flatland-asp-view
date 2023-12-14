import { createEnvironment } from '@flasp/server/environments/create';

interface EnvironmentCreateProps {
  params: {
    name: string;
  };
}

export async function POST(
  request: Request,
  { params }: EnvironmentCreateProps,
): Promise<Response> {
  const { name } = params;
  const body = await request.json();
  const savaData = JSON.stringify(body);
  return createEnvironment(name, savaData);
}
