import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/hooks/auth-provider";
import { ExitIcon } from "@radix-ui/react-icons";

const Logout = () => {
  const { setUser } = useAuthContext;
  const handleOnClick = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("authTokens");
    setUser({});
  };
  return (
    <Button asChild onClick={handleOnClick} variant={"link"}>
      <Link to={"/login"}>{<ExitIcon />}</Link>
    </Button>
  );
};

export default Logout;
