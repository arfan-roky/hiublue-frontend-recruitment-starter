import { loginSchema } from "@/zod-schema/login";
import { z } from "zod";

export type LoginSchema = z.infer<typeof loginSchema>;
