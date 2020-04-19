### 🚧 Request for maintainers

A community-driven platform to track **which OSS repositories need a maintainer**.

Find repos by keywords, languages, topics, etc.

### Why?

You're interested in this project if you've been in any of these situations:

- As a user, uou find and interesting library. But it seems unmaintained. How to know for sure?
- As a maintainer, you can't find anyone who wants to take the lead. Where to find them?
- As a developer, you want to contribute to the community but don't know where to start. Which projects need help?

### How does it work?

It heavily relies on the Github public API (which is awesome).

1. Every request is an Issue labeled as `search` in this repository.
2. The body of the issue contains a JSON with the searchable data.
3. It uses the Github Search API to find tickets.
4. To avoid undesired format errors the web has a request genertor, as well.

### Contribute

1. 🤗 PR are more than welcome
2. 🕵🏽‍♀️ Add any repo you find that's unmaintained.
3. 🌎 Spread the word

_Hand-crafted with 💜 by [@sospedra](https://sospedra.me)_
