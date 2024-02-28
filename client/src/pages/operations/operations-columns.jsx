import { Button } from "@/components/ui/button";
import { CheckIcon } from "@radix-ui/react-icons";
import { RxCross2 } from "react-icons/rx";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { RxFileText, RxTrash } from "react-icons/rx";
import { Label } from "@/components/ui/label";
import TableColumnHeader from "@/components/data-table/column-header-sort-visibility";
import OperationCreateUpdate from "./operation-create-update";
import { getData, deleteData } from "@/api";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { format } from "date-fns";
export const columns = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "user",
    header: ({ column }) => <TableColumnHeader column={column} title="Eng" />,
  },
  {
    accessorKey: "customer",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Customer" />
    ),
  },
  {
    accessorKey: "material",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Material" />
    ),
  },

  {
    accessorKey: "height",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Height" />
    ),
  },
  {
    accessorKey: "width",
    header: ({ column }) => <TableColumnHeader column={column} title="Width" />,
  },
  {
    accessorKey: "thickness",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Thickness" />
    ),
  },
  {
    accessorKey: "work_duration",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Duration" />
    ),
    cell: ({ row }) => {
      const work_duration = parseFloat(row.getValue("work_duration"));
      const formatted = Math.ceil(work_duration);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "cost",
    header: ({ column }) => <TableColumnHeader column={column} title="Cost" />,
    cell: ({ row }) => {
      const cost = parseFloat(row.getValue("cost"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(cost);

      return <div className="text-center">{formatted}</div>;
    },
  },
  {
    accessorKey: "material_from_storage",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Storage" />
    ),
    cell: ({ row }) => {
      const storage = row.getValue("material_from_storage");

      return (
        <div className="text-center">
          {storage ? <CheckIcon /> : <RxCross2 />}
        </div>
      );
    },
  },
  {
    accessorKey: "laser_cut",
    header: ({ column }) => <TableColumnHeader column={column} title="Laser" />,
    cell: ({ row }) => {
      const laser = row.getValue("laser_cut");
      return (
        <div className="text-center">
          {laser ? <CheckIcon /> : <RxCross2 />}
        </div>
      );
    },
  },
  {
    accessorKey: "completed",
    header: ({ column }) => <TableColumnHeader column={column} title="Done" />,
    cell: ({ row }) => {
      const completed = row.getValue("completed");

      return (
        <div className="text-center">
          {completed ? <CheckIcon /> : <RxCross2 />}
        </div>
      );
    },
  },
  {
    accessorKey: "created",
    header: ({ column }) => <TableColumnHeader column={column} title="Date" />,
    cell: ({ row }) => {
      const created = row.getValue("created");
      const formated = format(new Date(created), "dd/MM/yyyy");
      return <div className="text-center">{formated}</div>;
    },
  },
  {
    id: "update_actions",
    enableHiding: false,
    cell: ({ row }) => {
      const operation = row.original;
      const {
        isLoading,
        isError,
        error,
        data: customers,
      } = useQuery("customers", () => getData("customers/"));
      const allCustomers = customers?.map((customer) => ({
        label: customer.name,
        value: customer.id,
      }));
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <RxFileText />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <OperationCreateUpdate
              currentOperation={{
                ...operation,
                customer: allCustomers?.find(
                  (customer) => customer.label === operation.customer
                )?.value,
              }}
            />
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    id: "delete_actions",
    enableHiding: false,
    cell: ({ row }) => {
      const operation = row.original;
      const queryClient = useQueryClient();
      const deleteOperationMutation = useMutation(
        (operation) => deleteData(`operations/${operation.id}`, operation.id),
        {
          onSuccess: () => {
            queryClient.invalidateQueries("operations");
          },
        }
      );
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <RxTrash />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <div className="flex items-center">
              <div className="grid flex-1 gap-2">
                <Label>
                  {`Customer : ${operation.customer} Operation will be permenantly removed`}
                </Label>
              </div>
              <Button size="sm" className="p-3 m-3">
                <RxTrash
                  className="h-4 w-4"
                  onClick={() => deleteOperationMutation.mutate(operation)}
                />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
