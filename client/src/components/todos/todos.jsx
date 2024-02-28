import { CheckIcon, CalendarIcon } from "@radix-ui/react-icons";
import { RxText, RxCross2 } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getData, addData, updateData, deleteData } from "@/api";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TodosFormSchema } from "@/schemas";
import { useAuthContext } from "@/hooks/auth-provider";
const Todos = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    error,
    data: todos,
  } = useQuery("todos", () => getData("todos/"));
  const addTodoMutation = useMutation((todo) => addData(`todos/`, todo), {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
  const updateTodoMutation = useMutation(
    (todo) => updateData(`todos/${todo.id}/`, todo),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );
  const deleteTodoMutation = useMutation(
    (todo) => deleteData(`todos/${todo.id}/`, todo.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );

  const form = useForm({
    resolver: zodResolver(TodosFormSchema),
    defaultValues: {
      title: "",
    },
  });
  const onSubmit = (data) => {
    addTodoMutation.mutate({ title: data.title });
    form.reset({ title: "" });
  };
  const markAllCompleted = () => {
    todos.map((todo) =>
      updateTodoMutation.mutate({
        ...todo,
        completed: true,
      })
    );
  };
  const mytodos = todos?.filter((todo) => todo.user == user.user_id);
  return (
    <div>
      {isLoading ? (
        <p>Loading.....</p>
      ) : isError ? (
        <p className="text-red-800 ">{error.message}</p>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Todos</CardTitle>
            <CardDescription>
              You have {`${mytodos.length}`} todo{mytodos.length > 1 && `'s`}.
            </CardDescription>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-full max-w-sm items-center "
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="flex w-full max-w-sm items-center space-x-2 ">
                      <FormControl>
                        <Input placeholder="what todo..." {...field} />
                      </FormControl>
                      <Button type="submit" variant="outline" size="icon">
                        <RxText />
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardHeader>
          <CardContent className="grid gap-4">
            <ScrollArea className="h-72 rounded-md border">
              {todos
                .filter((todo) => todo.user == user.user_id)
                .map((todo, index) => (
                  <div key={index} className="flex w-full">
                    <HoverCard className="w-full">
                      <HoverCardTrigger className="flex w-full gap-2 mt-0 my-3 py-2 border place-items-center justify-between">
                        <div className="flex w-full gap-3">
                          <Checkbox
                            id={todo.id}
                            checked={todo.completed}
                            onCheckedChange={() =>
                              updateTodoMutation.mutate({
                                ...todo,
                                completed: !todo.completed,
                              })
                            }
                          />
                          <Label
                            htmlFor={todo.id}
                            className="text-sm font-medium"
                          >
                            {todo.title}
                          </Label>
                        </div>
                        <div>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              deleteTodoMutation.mutate({ ...todo })
                            }
                          >
                            <RxCross2 className=" h-4 w-4" />
                          </Button>
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent>
                        <div className="flex items-center pt-2">
                          <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                          <span className="text-xs text-muted-foreground">
                            created by {user.username} at {todo.created}
                          </span>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                ))}
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={markAllCompleted}>
              <CheckIcon className="mr-2 h-4 w-4" /> Mark all as completed
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default Todos;
