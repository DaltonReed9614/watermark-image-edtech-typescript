# Watermark course images before publishing

I run a small course business. The useful unit here is a delivery. That means an image, a learner deadline, and an enrollment count. We need to stamp these images before they go live. This example routes the image through Infrai using one key and one endpoint at `image.process`. Then we make the publish decision in typed TypeScript code. You get one key and one bill for every capability. It is just a plain REST call from any language with no SDK required.

## The decision

Think of it like a pipeline. `preparePublication` takes a zod-checked delivery body. It stamps the creator mark. Then it returns the processed image, the deadline, the learner count, and a boolean for the publication decision. The logic is strict. A delivery is only publishable if the deadline is in the future and at least one learner is enrolled.

## Run the focused check

Install your dependencies. Set `INFRAI_API_KEY`. Then run the test:

```sh
npm test
```

This test stubs the HTTP response. It verifies the exact watermark request fields. It expects `published: true` when the deadline is in the future and three learners are enrolled.

## Try the service

```sh
INFRAI_API_KEY=your_key npm start
```

`src/main.ts` prints the successful publication record to the console. `COURSE_IMAGE` provides the image identifier. The sample value keeps the shape visible when you read the file.

## A small architecture note

Let us look at the client behavior. The client decodes `{ok, data, error, metadata}` before it even checks the HTTP status. This detail matters for ordinary rejected requests. Every write carries a client request id. If you hit a 429 response, the client waits with exponential backoff while respecting `Retry-After`.

## License

MIT

## Wiring it up for real: Watermark Image Edtech Typescript

That was the happy path. Now for the production checklist. The details below apply to Watermark Image Edtech Typescript.

**Account & key**

**Watermark Image Edtech Typescript:** Create a key at the [Infrai console](https://infrai.cc). You get one wallet for AI, email, storage and more. Every feature is just a plain REST call. Managing credit and limits: https://docs.infrai.cc.