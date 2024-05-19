
export default {
	async fetch(request, env, ctx) {
		const origin = new URL(request.url);
		const forward = new URL(request.url);
		let where

		const isMod = (origin.pathname.startsWith('/modify-my-store'))
		const isApi = (origin.pathname.startsWith('/api'))
		if (env.SETTINGS.get("MODIFY_APP_PROXY") && isMod) {
			where = "m"
			forward.protocol = await env.SETTINGS.get("MODIFY_APP_PROTOCOL")
			forward.hostname = await env.SETTINGS.get("MODIFY_APP_HOST")
			forward.port = await env.SETTINGS.get("MODIFY_APP_PORT")
			forward.pathname = origin.pathname.replace('/modify-my-store', '')
		} else if (env.SETTINGS.get("API_PROXY") && isApi) {
			where = "a"
			forward.protocol = await env.SETTINGS.get("API_PROTOCOL")
			forward.hostname = await env.SETTINGS.get("API_HOST")
			forward.port = await env.SETTINGS.get("API_PORT")
			forward.pathname = origin.pathname.replace('/api', '')
		} else {
			where = "d"
			forward.protocol = await env.SETTINGS.get("DEFAULT_ROOT_PROTOCOL")
			forward.hostname = await env.SETTINGS.get("DEFAULT_ROOT_HOST")
			forward.port = await env.SETTINGS.get("DEFAULT_ROOT_PORT")

		}

		console.log(where)
		console.log(origin.toString() + " → " + forward.toString())

		let res = await fetch(forward.toString(), request);
		res = new Response(res.body, res);
		res.headers.set('X-Sample-Proxy', where);
		return res;

	},
};
