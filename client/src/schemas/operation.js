import { z } from "zod";

const OperationFormSchema = z.object({
  customer: z.string().or(z.number()).optional(),
  material: z.enum(["ST", "GLV", "SUS", "AL", "BR"]),
  material_from_storage: z.boolean().default(true),
  height: z.string().or(z.number()),
  width: z.string().or(z.number()),
  thickness: z.string().or(z.number()),
  work_duration: z.string().or(z.number()),
  cost: z.string().or(z.number()),
  laser_cut: z.boolean().default(true),
  completed: z.boolean().default(false),
});
export default OperationFormSchema;
