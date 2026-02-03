"use server";

import { ShippingRule } from "@/db/schema";
import db from "..";

export type ShippingRules = {
  success: boolean;
  data: ShippingRule[] | [];
};
export default async function getAllShippingRules() {
  try {
    const response = await db.query.shippingRules.findMany();
    if (!response) {
      return { success: false, data: [] };
    }
    return { success: true, data: response };
  } catch (err) {
    console.error(err);
    return { success: false, data: [] };
  }
}
