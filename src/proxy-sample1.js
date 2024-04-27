export default {
	async fetch(request, env, ctx) {
		const origin = new URL(request.url);
		const url = new URL(request.url);
		url.hostname = "localhost";
		url.port = "5173"
		console.log(origin.toString() + " → " + url.toString())
		let res = await fetch(url.toString(), request);
		res = new Response(res.body, res);
		res.headers.set('X-Sample-Proxy', 'Sample1');
		return res;
	},
};
