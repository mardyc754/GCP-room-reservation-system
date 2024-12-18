import { useSignIn } from "@/hooks/auth";

import { Button } from "../Button";
import { LabelWithInput } from "../LabelWithInput";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const LoginForm = () => {
  const {
    form: {
      register,
      formState: { errors },
    },
    onSubmit,
  } = useSignIn();

  return (
    <form onSubmit={onSubmit} className="flex justify-start">
      <Card>
        <CardHeader>
          <CardTitle>
            <h1>Sign in</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LabelWithInput
            label="Email"
            inputProps={{
              ...register("email", { required: true }),
              type: "email",
            }}
            errorLabel={errors.email?.message}
          />
          <LabelWithInput
            label="Password"
            inputProps={{
              ...register("password", { required: true }),
              type: "password",
            }}
          />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full">
            Sign in
          </Button>
          <p>
            Don't have account?{" "}
            <a href="sign-up" className="font-semibold">
              Sign up here
            </a>
          </p>
        </CardFooter>
      </Card>
    </form>
  );
};
