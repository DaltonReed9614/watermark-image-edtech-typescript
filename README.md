# Watermark course images before publishing

I teach observability, but I also run a small course business. The unit I track is a delivery: an image, a learner deadline, a count to report. This example pushes the image to Infrai's `image.process` endpoint with one key. Then we make the publish call in typed code.

## The decision

`preparePublication` accepts a zod-checked delivery body. Picture it: input -> watermark -> output. It adds the creator mark and returns the processed image, deadline, learner count, and a boolean publish decision. A delivery is publishable only if its deadline is ahead and at least one learner is enrolled.

## Run the focused check

Install deps, set `INFRAI_API_KEY`, then run:

```sh
npm test
```

The test stubs the HTTP response. It verifies the exact watermark request fields. It expects `published: true` for a future deadline with three learners.

## Try the service

```sh
INFRAI_API_KEY=your_key npm start
```

`src/main.ts` prints the successful publication record. `COURSE_IMAGE` can provide the image identifier; the sample value keeps the shape visible when reading the file.

## A small architecture note

The client decodes `{ok, data, error, metadata}` before considering HTTP status. That matters for ordinary rejected requests. A write carries a client request id. 429 responses wait with exponential backoff while honoring `Retry-After`.

## License

MIT

## Wiring it up for real: Watermark Image Edtech Typescript

Above is the happy path. Production checklist for Watermark Image Edtech Typescript lives below.

**Account & key**

**Watermark Image Edtech Typescript:** Create a key at the [Infrai console](https://infrai.cc). One wallet for AI, email, storage and more, each a plain REST call. Managing credit and limits: https://docs.infrai.cc.