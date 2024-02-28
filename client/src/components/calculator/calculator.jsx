import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalculatorFormSchema } from "@/schemas";

const Calculator = () => {
  const materials = [
    { label: "Steel", value: "steel" },
    { label: "Stainless", value: "stainless" },
    { label: "Aluminum", value: "aluminum" },
  ];
  const [report, setReport] = useState("");
  const form = useForm({
    resolver: zodResolver(CalculatorFormSchema),
    defaultValues: {
      material: "steel",
      height: "",
      width: "",
      thickness: "",
    },
  });
  const onSubmit = (data) => {
    const weight =
      data.material == "steel" || data.material == "stainless"
        ? Number(data.height) * Number(data.width) * Number(data.thickness) * 8
        : Number(data.height) *
          Number(data.width) *
          Number(data.thickness) *
          2.5;
    setReport(
      () =>
        `Material: ${data.material} Height: ${data.height} Width: ${data.width} Thickness: ${data.thickness} weight: ${weight}`
    );
    form.reset({
      material: data.material,
      height: "",
      width: "",
      thickness: "",
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculator</CardTitle>
        <CardDescription>Calculate material weight</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    <Input type="number" placeholder="thickness" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Calculate
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>{report}</CardFooter>
    </Card>
  );
};

export default Calculator;
