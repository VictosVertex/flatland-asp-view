import { getAllEnvironments } from '@flasp/server/environments/get-all';

export async function GET() {
  return getAllEnvironments();
}
