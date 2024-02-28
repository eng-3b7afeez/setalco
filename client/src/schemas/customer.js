import { z } from "zod";

const CustomerFormSchema = z.object({
  name: z.string().min(8, {
    message: "name must be at least / characters.",
  }),
  mobile: z.string().min(10, {
    message: "mobile must be at least 10 digits.",
  }),
  mobile2: z.string().min(10, {
    message: "mobile must be at least 10 digits.",
  }),
  company: z.string().min(2, {
    message: "company must be at least 2 characters.",
  }),
  rating: z.enum(["OK", "WARNING", "DANGER"]),
  comment: z.string().min(2, {
    message: "comment must be at least 2 characters.",
  }),
});
export default CustomerFormSchema;
