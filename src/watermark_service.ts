import { z } from "zod";
import { InfraiClient } from "./infrai_client.js";

export const deliverySchema = z.object({
  image: z.string().min(1), filename: z.string().min(1), watermark: z.string().min(1),
  position: z.enum(["top_left", "top_right", "bottom_left", "bottom_right", "center"]),
  opacity: z.number().min(0).max(1), deadline: z.string().datetime(), learnerCount: z.number().int().positive()
});
export type Delivery = z.infer<typeof deliverySchema>;
export type Publication = { image: unknown; deadline: string; learnerCount: number; published: boolean };

export async function preparePublication(input: unknown, client: InfraiClient): Promise<Publication> {
  const delivery = deliverySchema.parse(input);
  const result = await client.post<{ image?: unknown }>("/v1/image/process", {
    image: delivery.image,
    ops: [{ text: delivery.watermark, position: delivery.position, opacity: delivery.opacity }]
  }, `course-${delivery.filename}`);
  const published = new Date(delivery.deadline).getTime() > Date.now() && delivery.learnerCount > 0;
  return { image: result.image ?? result, deadline: delivery.deadline, learnerCount: delivery.learnerCount, published };
}
