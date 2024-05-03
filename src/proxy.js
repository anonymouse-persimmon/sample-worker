
export default {
	async fetch(request, env, ctx) {
		const origin = new URL(request.url);
		const forword = new URL(request.url);
		let where

		const isMod = (origin.pathname.startsWith('/modify-my-store'))
		if (env.SETTINGS.get("MODIFY_APP_PROXY") && isMod) {
			where = "m"
			forword.protocol = await env.SETTINGS.get("MODIFY_APP_PROTOCOL")
			forword.hostname = await env.SETTINGS.get("MODIFY_APP_HOST")
			forword.port = await env.SETTINGS.get("MODIFY_APP_PORT")
			forword.pathname = origin.pathname.replace('/modify-my-store', '')
		} else {
			where = "d"
			forword.protocol = await env.SETTINGS.get("DEFAULT_ROOT_PROTOCOL")
			forword.hostname = await env.SETTINGS.get("DEFAULT_ROOT_HOST")
			forword.port = await env.SETTINGS.get("DEFAULT_ROOT_PORT")

		}

		console.log(where)
		console.log(origin.toString() + " → " + forword.toString())

		let res = await fetch(forword.toString(), request);
		res = new Response(res.body, res);
		res.headers.set('X-Sample-Proxy', where);
		return res;

	},
};
