import { columns } from "./customers-columns";
import { DataTable } from "@/components";
import { useQuery, useQueryClient } from "react-query";
import { getData } from "@/api";

const Customers = () => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    error,
    data: customers,
  } = useQuery("customers", () => getData("customers/"));
  return (
    <div className="container w-svw">
      {isLoading ? (
        <p>Loading.....</p>
      ) : isError ? (
        <p className="text-red-800 ">{error.message}</p>
      ) : (
        <DataTable columns={columns} data={customers} consumer="customer" />
      )}
    </div>
  );
};

export default Customers;
