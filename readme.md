# pscan.js

A script for port scanning internal network hosts. It uses `fetch` and `AbortController` to quickly find open ports. Live demo: [pscanjs.web.app](https://pscanjs.web.app).


## Method

* Create a list of `(host, port)` pairs
* For each address, send an HTTPS request via `fetch`
* If the request hasn't resolved after 500 ms, ignore
* If it has resolved, `host:port` is probably open
