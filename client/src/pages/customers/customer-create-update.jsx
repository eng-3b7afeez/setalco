import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { addData, updateData } from "@/api";
import { CustomerFormSchema } from "@/schemas";

const CustomerCreateUpdate = ({ currentCustomer }) => {
  const ratings = [
    { label: "Ok", value: "OK" },
    { label: "Warning", value: "WARNING" },
    { label: "Danger", value: "DANGER" },
  ];
  const queryClient = useQueryClient();
  const addCustomerMutation = useMutation(
    (customer) => addData(`customers/`, customer),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("customers");
      },
    }
  );
  const updateCustomerMutation = useMutation(
    (customer) => updateData(`customers/${currentCustomer.id}/`, customer),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("customers");
      },
    }
  );
  const form = useForm({
    resolver: zodResolver(CustomerFormSchema),
    defaultValues: currentCustomer
      ? { rating: `${currentCustomer.rating}`, ...currentCustomer }
      : {
          name: "",
          mobile: "",
          mobile2: "",
          company: "",
          rating: "WARNING",
          comment: "--------",
        },
  });
  const onSubmit = (data) => {
    console.log(data);
    if (currentCustomer) {
      updateCustomerMutation.mutate(data);
    } else {
      data.mobile2 == ""
        ? (data = { ...data, mobile2: data.mobile })
        : (data = { ...data });
      data.company == ""
        ? (data = { ...data, company: data.name })
        : (data = { ...data });
      addCustomerMutation.mutate(data);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex w-full gap-4 place-items-center">
                  <FormLabel>Name: </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem className="flex w-full gap-4 place-items-center">
                  <FormLabel>Mobile: </FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="mobile" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobile2"
              render={({ field }) => (
                <FormItem className="flex w-full gap-4 place-items-center">
                  <FormLabel>Mobile2: </FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Mobile2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem className="flex w-full gap-4 place-items-center">
                  <FormLabel>Company: </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Company" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="flex flex-row w-full gap-4 place-items-center">
                  <Popover>
                    <FormLabel>Rating: </FormLabel>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? ratings?.find(
                                (rating) => rating.value === field.value
                              )?.label
                            : "Select rating"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search framework..."
                          className="h-9"
                        />
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                          {ratings?.map((rating) => (
                            <CommandItem
                              value={rating.label}
                              key={rating.value}
                              onSelect={() => {
                                form.setValue("rating", rating.value);
                              }}
                            >
                              {rating.label}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  rating.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem className="flex w-full gap-4 place-items-center">
                  <FormLabel>Comment: </FormLabel>
                  <FormControl>
                    <Textarea type="text" placeholder="coment" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogClose asChild>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </DialogClose>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
export default CustomerCreateUpdate;
