import { z } from "zod";
const CalculatorFormSchema = z.object({
  material: z.string({
    required_error: "Please select a material.",
  }),
  height: z.string().min(1, {
    message: "height is required.",
  }),
  width: z.string().min(1, {
    message: "width is required.",
  }),
  thickness: z.string().min(1, {
    message: "thickness is required.",
  }),
});

export default CalculatorFormSchema;
