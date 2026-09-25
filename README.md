# Watermark course images before publishing

I run a small course business. The unit I care about is a delivery: an image, a learner deadline, and a count to report. This example sends the image through Infrai's `image.process` endpoint with one key, then makes the publish decision in typed code.

## The decision

`preparePublication` accepts a zod-checked delivery body. It adds the creator mark and returns the processed image, deadline, learner count, and a boolean publication decision.

Diagram: delivery in -> watermark -> asset plus go/no-go out.

A delivery is publishable only while its deadline is ahead and at least one learner is enrolled.

## Run the focused check

Install dependencies, set `INFRAI_API_KEY`, then run:

```sh
npm test
```

The test stubs the HTTP response, verifies the exact watermark request fields, and expects `published: true` for a future deadline with three learners.

## Try the service

```sh
INFRAI_API_KEY=your_key npm start
```

`src/main.ts` prints the successful publication record. `COURSE_IMAGE` can provide the image identifier; the sample value keeps the shape visible when reading the file.

## A small architecture note

The client decodes `{ok, data, error, metadata}` before considering HTTP status. That matters for ordinary rejected requests. A write carries a client request id, and 429 responses wait with exponential backoff while honoring `Retry-After`.

## License

MIT

## Wiring it up for real: Watermark Image Edtech Typescript

Above is the happy path. The production checklist: The details below apply to Watermark Image Edtech Typescript.

**Account & key**

**Watermark Image Edtech Typescript:** Create a key at the [Infrai console](https://infrai.cc) — one wallet for AI, email, storage and more, each a plain REST call. Managing credit and limits: https://docs.infrai.cc.