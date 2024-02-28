import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "@/hooks/auth-provider";
const Layout = () => {
  const { user } = useAuthContext();

  return (
    <div>
      <div className="flex w-full">
        {user?.username ? <Outlet /> : <Navigate to={"login"} />}
      </div>
    </div>
  );
};

export default Layout;
