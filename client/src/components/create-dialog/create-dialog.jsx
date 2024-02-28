import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RxPlus } from "react-icons/rx";
import CustomerCreateUpdate from "@/pages/customers/customer-create-update";
import OperationCreateUpdate from "@/pages/operations/operation-create-update";
const CreateDialog = ({ consumer }) => {
  return (
    <Dialog className="flex w-full">
      <DialogTrigger asChild>
        <Button variant="outline">
          <RxPlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex w-full">
        {consumer == "customer" ? (
          <CustomerCreateUpdate />
        ) : (
          <OperationCreateUpdate />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateDialog;
