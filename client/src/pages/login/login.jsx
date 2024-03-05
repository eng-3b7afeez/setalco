import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { jwtDecode } from "jwt-decode";
import { Input } from "@/components/ui/input";

import { LoginFormSchema } from "@/schemas";
import { useAuthContext } from "@/hooks/auth-provider";
import { Navigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const form = useForm({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { user, setUser, setAuthTokens } = useAuthContext();
  const onSubmit = async (values) => {
    const data = await axios.post("http://192.168.1.6:8000/api/token/", values);
    data.status == 200
      ? setAuthTokens(data.data)
      : console.log("something went worng");
    setUser(jwtDecode(data.data.access));
    localStorage.setItem("authTokens", JSON.stringify(data.data));
    localStorage.setItem("access", JSON.stringify(data.data.access));
    console.log("try to login");
  };
  return (
    <div className="flex place-content-center ">
      {user?.username ? (
        <Navigate to={"/"} replace={true} />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default Login;
