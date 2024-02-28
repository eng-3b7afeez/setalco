import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle, Logout } from "@/components";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import bob from "@/assets/bob.jpg";
import other from "@/assets/react.svg";
import { Side } from "@/components";
import { useAuthContext } from "@/hooks/auth-provider";
const Header = () => {
  const { user } = useAuthContext();
  return (
    <div className="flex justify-between p-5 static">
      <div>
        {user.username && (
          <div>
            <Avatar>
              <AvatarImage
                src={user.username == "3b7afeez" ? bob : other}
                alt="image"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span>{user.username}</span>
          </div>
        )}
      </div>

      <div className="flex gap-10">
        <Button asChild variant={"outline"} className="linkButton">
          <NavLink to="/">Home</NavLink>
        </Button>
        <Button asChild variant={"outline"} className="linkButton">
          <NavLink to="/customers">Customers</NavLink>
        </Button>
        <Button asChild variant={"outline"} className="linkButton">
          <NavLink to="/operations">Operations</NavLink>
        </Button>
        <Side />
      </div>
      <div className="flex gap-4 place-items-center">
        {user.username && <Logout />}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
