import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { RxFileText, RxTrash } from "react-icons/rx";
import {
  VscWorkspaceTrusted,
  VscWorkspaceUnknown,
  VscWorkspaceUntrusted,
} from "react-icons/vsc";
import TableColumnHeader from "@/components/data-table/column-header-sort-visibility";
import CustomerCreateUpdate from "./customer-create-update";
import { Label } from "@/components/ui/label";
import { deleteData } from "@/api";
import { useMutation, useQueryClient } from "react-query";
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
    accessorKey: "name",
    header: ({ column }) => <TableColumnHeader column={column} title="Name" />,
  },
  {
    accessorKey: "mobile",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Mobile" />
    ),
  },
  {
    accessorKey: "mobile2",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Mobile2" />
    ),
  },
  {
    accessorKey: "company",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Company" />
    ),
  },
  {
    accessorKey: "rating",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Rating" />
    ),
    cell: ({ row }) => {
      const rating = row.getValue("rating");

      return (
        <div className="text-center">
          {rating == "OK" ? (
            <VscWorkspaceTrusted className=" text-lime-700" />
          ) : rating == "WARNING" ? (
            <VscWorkspaceUnknown className=" text-yellow-500" />
          ) : (
            <VscWorkspaceUntrusted className=" text-red-700" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "comment",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Comment" />
    ),
  },
  {
    id: "update_actions",
    enableHiding: false,
    cell: ({ row }) => {
      const customer = row.original;

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <RxFileText />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <CustomerCreateUpdate currentCustomer={customer} />
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    id: "delete_actions",
    enableHiding: false,
    cell: ({ row }) => {
      const customer = row.original;
      const queryClient = useQueryClient();
      const deleteCustomerMutation = useMutation(
        (customer) => deleteData(`customers/${customer.id}`, customer.id),
        {
          onSuccess: () => {
            queryClient.invalidateQueries("customers");
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
                  {`Customer : ${customer.name} will be permenantly removed`}
                </Label>
              </div>
              <Button size="sm" className="p-3 m-3">
                <RxTrash
                  className="h-4 w-4"
                  onClick={() => deleteCustomerMutation.mutate(customer)}
                />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
