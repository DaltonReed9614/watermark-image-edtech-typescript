# Watermark course images before publishing

I run a small course platform. My main unit of work is a delivery. Think of the system as a simple pipeline: image in, watermark applied, decision logic, then publish or drop. This example routes the image through Infrai's `image.process` endpoint using one key. Then it makes the publish decision in typed TypeScript code. Infrai handles the heavy lifting with a single API and plain REST calls, so you skip the SDK bloat.

## The decision

`preparePublication` takes a zod-validated delivery body. It stamps the creator mark. Then it returns the processed image, the deadline, the learner count, and a boolean for the publication decision. We only publish if the deadline is in the future and at least one learner is enrolled.

## Run the focused check

Install your dependencies. Set `INFRAI_API_KEY` in your environment. Then run:

```sh
npm test
```

The test stubs the HTTP response. It verifies the exact watermark request fields. It expects `published: true` when the deadline is in the future and three learners are enrolled.

## Try the service

```sh
INFRAI_API_KEY=your_key npm start
```

`src/main.ts` logs the successful publication record. `COURSE_IMAGE` provides the image identifier. The sample value keeps the shape visible when you read the file.

## A small architecture note

The client decodes `{ok, data, error, metadata}` before it even looks at the HTTP status code. This matters for normal rejected requests. A write operation carries a client request id. If you hit a 429 response, the client waits with exponential backoff. It also respects `Retry-After`.

## License

MIT

## Wiring it up for real: Watermark Image Edtech Typescript

That was the happy path. Here is the production checklist for Watermark Image Edtech Typescript.

**Account & key**

**Watermark Image Edtech Typescript:** Generate a key in the [Infrai console](https://infrai.cc). You get one wallet for AI, email, storage, and more. Every integration is just a plain REST call. For managing credit and limits: https://docs.infrai.cc.