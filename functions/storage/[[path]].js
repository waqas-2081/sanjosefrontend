const ADMIN = 'https://admin.sanjoselogodesign.com';

export async function onRequest(context) {
  const incoming = new URL(context.request.url);
  const target = new URL(`${incoming.pathname}${incoming.search}`, ADMIN);
  const headers = new Headers(context.request.headers);
  headers.delete('host');

  return fetch(target.toString(), {
    method: context.request.method,
    headers,
    redirect: 'follow',
  });
}
