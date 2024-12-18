import { Button } from "../Button";
import { LabelWithInput } from "../LabelWithInput";
import { useSignup } from "@/hooks/auth";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const SignupForm = () => {
  const {
    form: {
      register,
      formState: { errors },
    },
    onSubmit,
  } = useSignup();

  return (
    <form className="flex justify-start" onSubmit={onSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>
            <h1>Sign up</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LabelWithInput
            label="Username"
            inputProps={{
              ...register("username", { required: true }),
            }}
            errorLabel={errors.username?.message}
          />
          <LabelWithInput
            label="Email"
            inputProps={{
              type: "email",
              ...register("email", { required: true }),
            }}
            errorLabel={errors.email?.message}
          />
          <LabelWithInput
            label="Password"
            inputProps={{
              type: "password",
              ...register("password", { required: true }),
            }}
            errorLabel={errors.password?.message}
          />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full">
            Sign up
          </Button>
          <p>
            Already have account?{" "}
            <a href="sign-in" className="font-semibold">
              Sign in here
            </a>
          </p>
        </CardFooter>
      </Card>
    </form>
  );
};
