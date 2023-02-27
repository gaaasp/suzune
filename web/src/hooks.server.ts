import "$lib/supabase";
import type { Handle } from '@sveltejs/kit';
 
export const handle = (async ({ event, resolve }) => {
  const response = await resolve(event, {
    filterSerializedResponseHeaders: (name) => name === "content-type",
  });
 
  return response;
}) satisfies Handle;
