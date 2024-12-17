import { useSignIn } from "@/hooks/auth";

import { Button } from "../Button";
import { LabelWithInput } from "../LabelWithInput";

export const LoginForm = () => {
  const {
    form: {
      register,
      formState: { errors },
    },
    onSubmit,
  } = useSignIn();

  return (
    <form className="flex flex-col space-y-4" onSubmit={onSubmit}>
      <LabelWithInput
        label="Email"
        inputProps={{ ...register("email", { required: true }), type: "email" }}
        errorLabel={errors.email?.message}
      />
      <LabelWithInput
        label="Password"
        inputProps={{
          ...register("password", { required: true }),
          type: "password",
        }}
      />
      <Button type="submit">Sign in</Button>
    </form>
  );
};
