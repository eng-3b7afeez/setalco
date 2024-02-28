import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DialogClose } from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { getData, addData, updateData } from "@/api";
import { OperationFormSchema } from "@/schemas";

const OperationCreateUpdate = ({ currentOperation }) => {
  const materials = [
    { label: "Steel", value: "ST" },
    { label: "Galvenized", value: "GLV" },
    { label: "Stainless", value: "SUS" },
    { label: "Aluminum", value: "AL" },
    { label: "Brass", value: "BR" },
  ];
  const queryClient = useQueryClient();
  const { data: customers } = useQuery("customers", () =>
    getData("customers/")
  );
  const allCustomers = customers?.map((customer) => ({
    label: customer.name,
    value: customer.id,
  }));
  const addOperationMutation = useMutation(
    (operation) => addData(`operations/`, operation),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("operations");
      },
    }
  );
  const updateOperationMutation = useMutation(
    (operation) => updateData(`operations/${currentOperation.id}/`, operation),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("operations");
        return;
      },
    }
  );
  const form = useForm({
    resolver: zodResolver(OperationFormSchema),
    defaultValues: currentOperation
      ? {
          ...currentOperation,
        }
      : {
          customer: "",
          material: "",
          material_from_storage: true,
          height: "",
          width: "",
          thickness: "",
          work_duration: "",
          cost: "",
          laser_cut: true,
          completed: false,
        },
  });
  const onSubmit = (data) => {
    console.log(data);
    if (currentOperation) {
      updateOperationMutation.mutate(data);
    } else {
      addOperationMutation.mutate(data);
      form.reset({
        customer: "",
        material: "",
        material_from_storage: true,
        height: "",
        width: "",
        thickness: "",
        work_duration: "",
        cost: "",
        laser_cut: true,
        completed: false,
      });
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Operation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col w-full gap-10">
              <div className="flex w-full gap-5">
                <FormField
                  control={form.control}
                  name="customer"
                  render={({ field }) => (
                    <FormItem className="flex flex-row w-full gap-4 place-items-center">
                      <Popover>
                        <FormLabel>Customer: </FormLabel>
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
                                ? allCustomers?.find(
                                    (customer) => customer.value === field.value
                                  )?.label
                                : "Select customer"}
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
                              {allCustomers?.map((customer) => (
                                <CommandItem
                                  value={customer.label}
                                  key={customer.value}
                                  onSelect={() => {
                                    form.setValue("customer", customer.value);
                                  }}
                                >
                                  {customer.label}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      customer.value === field.value
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
                  name="material"
                  render={({ field }) => (
                    <FormItem className="flex flex-row w-full gap-4 place-items-center">
                      <Popover>
                        <FormLabel>Material: </FormLabel>
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
                                ? materials.find(
                                    (material) => material.value === field.value
                                  )?.label
                                : "Select material"}
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
                              {materials.map((material) => (
                                <CommandItem
                                  value={material.label}
                                  key={material.value}
                                  onSelect={() => {
                                    form.setValue("material", material.value);
                                  }}
                                >
                                  {material.label}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      material.value === field.value
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
              </div>
              <div className="flex w-full gap-5">
                <FormField
                  control={form.control}
                  name="material_from_storage"
                  render={({ field }) => (
                    <FormItem className="flex w-full gap-4 place-items-center">
                      <FormLabel>Storage: </FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem className="flex w-full gap-4 place-items-center">
                      <FormLabel>Height: </FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="height" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full gap-5">
                <FormField
                  control={form.control}
                  name="width"
                  render={({ field }) => (
                    <FormItem className="flex w-full gap-4 place-items-center">
                      <FormLabel>Width: </FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="width" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="thickness"
                  render={({ field }) => (
                    <FormItem className="flex w-full gap-4 place-items-center">
                      <FormLabel>Thickness: </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="thickness"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full gap-5">
                <FormField
                  control={form.control}
                  name="work_duration"
                  render={({ field }) => (
                    <FormItem className="flex w-full gap-4 place-items-center">
                      <FormLabel>Duration: </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="duration"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cost"
                  render={({ field }) => (
                    <FormItem className="flex w-full gap-4 place-items-center">
                      <FormLabel>Cost: </FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="cost" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full gap-5">
                <FormField
                  control={form.control}
                  name="laser_cut"
                  render={({ field }) => (
                    <FormItem className="flex w-full gap-4 place-items-center">
                      <FormLabel>Laser: </FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="completed"
                  render={({ field }) => (
                    <FormItem className="flex w-full gap-4 place-items-center">
                      <FormLabel>Completed: </FormLabel>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
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
export default OperationCreateUpdate;
