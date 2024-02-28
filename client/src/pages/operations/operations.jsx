import { columns } from "./operations-columns";
import { DataTable } from "@/components";
import { useQuery } from "react-query";
import { getData } from "@/api";
const Operations = () => {
  const {
    isLoading,
    isError,
    error,
    data: operations,
  } = useQuery("operations", () => getData("operations/"));

  return (
    <div className="flex mx-auto">
      {isLoading ? (
        <p>Loading.....</p>
      ) : isError ? (
        <p className="text-red-800">{error.message}</p>
      ) : (
        <DataTable columns={columns} data={operations} consumer="operation" />
      )}
    </div>
  );
};

export default Operations;
