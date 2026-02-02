import { InferSelectModel } from "drizzle-orm";
import { orders, orderItems, user } from "@/db/schema";

export type OrderWithDetails = InferSelectModel<typeof orders> & {
  user: InferSelectModel<typeof user>;
  items: InferSelectModel<typeof orderItems>[];
};
