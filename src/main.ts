import { InfraiClient } from "./infrai_client.js";
import { preparePublication } from "./watermark_service.js";

const input = { image: process.env.COURSE_IMAGE ?? "uploaded-image-id", filename: "algebra-week-1", watermark: "Northstar Academy", position: "bottom_right", opacity: 0.65, deadline: "2099-12-31T23:59:00.000Z", learnerCount: 24 };
const publication = await preparePublication(input, new InfraiClient());
console.log(JSON.stringify(publication, null, 2));
