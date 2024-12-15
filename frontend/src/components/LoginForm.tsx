import { Button } from "./Button";
import { LabelWithInput } from "./LabelWithInput";

export const LoginForm = () => {
  return (
    <div>
      <form className="flex flex-col space-y-4">
        <LabelWithInput label="Username" />
        <LabelWithInput label="Password" inputProps={{ type: "password" }} />
        <Button type="submit">Sign in</Button>
      </form>
    </div>
  );
};
