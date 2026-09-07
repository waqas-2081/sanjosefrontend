const ADMIN = 'https://admin.sanjoselogodesign.com';

export async function onRequest(context) {
  const incoming = new URL(context.request.url);
  const target = new URL(`${incoming.pathname}${incoming.search}`, ADMIN);
  const headers = new Headers(context.request.headers);
  headers.delete('host');

  const init = {
    method: context.request.method,
    headers,
    redirect: 'follow',
  };

  if (!['GET', 'HEAD'].includes(context.request.method)) {
    init.body = context.request.body;
  }

  return fetch(target.toString(), init);
}
