const ADMIN = 'https://admin.sanjoselogodesign.com';

export async function onRequest(context) {
  const incoming = new URL(context.request.url);
  const suffix = incoming.pathname.replace(/^\/sjld-media\/?/, '') || '';
  const target = new URL(`/storage/${suffix}${incoming.search}`, ADMIN);
  const headers = new Headers(context.request.headers);
  headers.delete('host');

  return fetch(target.toString(), {
    method: context.request.method,
    headers,
    redirect: 'follow',
  });
}
