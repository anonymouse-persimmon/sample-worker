export default {
	async fetch(request, env, ctx) {
		const origin = new URL(request.url);
		const url = new URL(request.url);
		url.protocol = "https"
		url.hostname = "sample-ecl.pages.dev";
		url.port = ""
		console.log(origin.toString() + " → " + url.toString())
		let res = await fetch(url.toString(), request);
		res = new Response(res.body, res);
		res.headers.set('X-Sample-Proxy', 'Sample');
		return res;

	},
};
