
export default {
	async fetch(request, env, ctx) {
		const origin = new URL(request.url);
		const forword = new URL(request.url);
		let where


		const isMod = (origin.pathname.startsWith('/modify-my-store'))
		if (env.MODIFY_APP_PROXY && isMod) {
			where = "m"
			forword.protocol = env.MODIFY_APP_PROTOCOL
			forword.hostname = env.MODIFY_APP_HOST
			forword.port = env.MODIFY_APP_PORT
		} else {
			where = "d"
			forword.protocol = env.DEFAULT_ROOT_PROTOCOL
			forword.hostname = env.DEFAULT_ROOT_HOST
			forword.port = env.DEFAULT_ROOT_PORT

		}

		console.log(origin.toString() + " → " + forword.toString())

		let res = await fetch(forword.toString(), request);
		res = new Response(res.body, res);
		res.headers.set('X-Sample-Proxy', where);
		return res;

	},
};
