import { z } from "zod";
export const newRequestSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  country: z.string().min(1),
  taxNumber: z.string().min(1),
  amountEur: z.coerce.number().positive(),
  reason: z.string().min(10),
  documentName: z.string().optional()
});
