import { z } from "zod";
const TodosFormSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
});

export default TodosFormSchema;
