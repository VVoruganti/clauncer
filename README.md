# Clauncher

A minimal web scraper that allows you to extract the main content from web
pages. It is primarily for articles and pages with a lot of text content. It is
not aimed at scraping web apps or pages that rely on a lot of javascript. 

It uses the [Mozilla Readability](https://github.com/mozilla/readability) library to
extract the main content from the web page. This library powers the reader mode
in Mozilla Firefox.

This project was developed using NodeJS v20.10.0 and [pnpm](https://pnpm.io/)

## Installation

This project requires NodeJS and Git.

Clone the Repo and install the necessary dependencies.

```bash
git clone https://github.com/VVoruganti/clauncher.git
cd clauncher
pnpm install
```

## Usage

```bash
pnpm start
```
This launches an express API that you can send requests too. It takes a `url`
parameter to the base route. An example `curl` request in below.

```bash
curl "http://localhost:3000/?url=https://vineeth.io"
```

This returns the `JSON` response from the `readability` library. To prettify the
output on your terminal you can pipe the results in `jq`

```bash
curl "http://localhost:3000/?url=https://vineeth.io" | jq
```

## Deploying

The project contains a `Dockerfile` and `fly.toml` for hosting
[fly.io](fly.io) or wherever you can host docker containers.

### Docker

You can build and run the project with the following `docker` commands

```bash
docker build -t clauncher .
docker run -p 3000:3000 clauncher
```

### Fly

You can deploy to fly.io using `flyctl`, and the command `fly launch`

## Roadmap

These are a few other features that could be nice to implement at some point. 

- [ ] puppeteer based scraping for JS sites - This
[guide](https://macarthur.me/posts/puppeteer-with-docker/) has details on how to
work with puppeteer in docker

## License

This project is licensed under the Apache 2.0 license. Read more at
[LICENSE](./LICENSE.md)
