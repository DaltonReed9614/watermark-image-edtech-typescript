import assert from "node:assert/strict";
import { preparePublication } from "./watermark_service.js";

process.env.INFRAI_API_KEY = "test-key";
const fakeFetch: typeof fetch = async (_url, init) => {
  assert.equal(init?.method, "POST");
  const body = JSON.parse(String(init?.body));
  assert.deepEqual(body, { image: "img-1", ops: [{ text: "Solo School", position: "bottom_right", opacity: 0.7 }] });
  return new Response(JSON.stringify({ ok: true, data: { image: "watermarked-1" }, metadata: {} }), { status: 200 });
};
const { InfraiClient } = await import("./infrai_client.js");
const result = await preparePublication({ image: "img-1", filename: "lesson-1", watermark: "Solo School", position: "bottom_right", opacity: 0.7, deadline: "2099-01-01T00:00:00.000Z", learnerCount: 3 }, new InfraiClient(fakeFetch));
assert.equal(result.published, true);
assert.equal(result.image, "watermarked-1");
console.log("publication decision passed");
