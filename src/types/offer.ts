import { offerSchema } from "@/zod-schema/offer";
import { z } from "zod";

export type User = {
  id: number;
  name: string;
  email: string;
};

export type OfferData = {
  id: number;
  user_name: string;
  company: string;
  email: string;
  phone: string;
  jobTitle: string;
  type: string;
  status: string;
  price: number;
};

export type OfferSchema = z.infer<typeof offerSchema>;
export type PlanType = OfferSchema["plan_type"];
export type Addition = OfferSchema["additions"][number];
