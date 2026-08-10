# 🚧 RFM | Request for maintainers

## _The issue database behind [rfm.sospedra.me](https://rfm.sospedra.me)_

[![Request for maintainers - Find any OSS project calling for collaborators | Product Hunt Embed](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=195531&theme=dark)](https://www.producthunt.com/posts/request-for-maintainers?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-request-for-maintainers)

### What's this?

RFM is a community-driven platform to **track OSS repositories that need a maintainer** or support.

This repository holds no code. It is the database. The website lives in [sospedra/sospedra.me](https://github.com/sospedra/sospedra.me) under `apps/rfm`.

### Why?

You're interested in this project if you've been in any of these situations:

- As a **user**, you find an interesting library. But it seems unmaintained. How to know for sure?
- As a **maintainer**, you can't find anyone who wants to take the lead. Where to find them?
- As a **developer**, you want to contribute to the community but don't know where to start. Which projects need help?

### How does it work?

1. Every request is an Issue labeled `search` in this repository.
2. The body of the issue is a JSON document with the searchable data.
3. The website reads the issues through the GitHub Search API. No server, no key.
4. The [submit wizard](https://rfm.sospedra.me/submit) pre-fills the issue, so the format stays consistent.

The full architecture is in the paper [GaaS: GitHub as a Service](https://sospedra.me/papers/gaas).

### Contribute

1. 🕵🏽‍♀️ [Submit](https://rfm.sospedra.me/submit) any repo you find that's unmaintained
2. 🌎 Spread the word
3. Thank you!

_Hand-crafted with 💜 by [@sospedra](https://sospedra.me)_
