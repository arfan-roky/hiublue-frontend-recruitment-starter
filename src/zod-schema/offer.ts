import { z } from "zod";

export const offerSchema = z.object({
  plan_type: z.enum(["monthly", "yearly", "pay_as_you_go"]),
  additions: z.array(z.enum(["refundable", "on_demand", "negotiable"])),
  user_id: z.string().min(1, { message: "User ID is required" }),
  expired: z.string().min(1, { message: "Expired date is required" }),
  price: z.string().min(1, { message: "Price is required" }),
});
