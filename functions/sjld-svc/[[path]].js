const ADMIN = 'https://admin.sanjoselogodesign.com';

export async function onRequest(context) {
  const incoming = new URL(context.request.url);
  // /sjld-svc/v1/portfolios → /api/v1/portfolios
  const suffix = incoming.pathname.replace(/^\/sjld-svc\/?/, '') || '';
  const target = new URL(`/api/${suffix}${incoming.search}`, ADMIN);
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

  const res = await fetch(target.toString(), init);
  const contentType = res.headers.get('content-type') || '';
  if (res.status === 403 && contentType.includes('text/html')) {
    return new Response(
      JSON.stringify({
        success: false,
        message:
          'API blocked by Cloudflare. Skip WAF/Bot Fight for /api/* on admin.sanjoselogodesign.com.',
      }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }
  return res;
}
