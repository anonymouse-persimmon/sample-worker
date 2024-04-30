# 目的

一つのドメインで複数のcloudflare上のPages、Workersを使用できるようにするため、proxyを行う。

## ゴール

下記のPages、Workersを一つのドメインで管理する。

- 静的サイト Pages
- SPAサイト Pages
- API Workers
- OGPを含むサイト Workers

# KV値

| KEY                   | VALUE                            |
|-----------------------|----------------------------------|
| DEFAULT_ROOT_PROTOCOL | protocol to proxy                |
| DEFAULT_ROOT_HOST     | host to proxy                    |
| DEFAULT_ROOT_PORT     | port to proxy                    |
| MODIFY_APP_PROXY      | set ture if modify app is enable |
| MODIFY_APP_PROTOCOL   | protocol to modify app proxy     |
| MODIFY_APP_HOST       | host to modify app proxy         |
| MODIFY_APP_PORT       | port to modify app proxy         |

## production and staging

Set on cloudflare console

## dev(local)

Set value to local KV.
A command like the one below.
`wrangler kv:key put --namespace-id=f10879569fe94cc6ae9a35f4b655c2fd "<KEY>" "<VALUE>" --local`
Include examples as comments in the dev.vars file


