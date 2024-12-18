import { LoginForm } from "@/components/forms/LoginForm";
import { PageWrapper } from "@/components/PageWrapper";

export const Login = () => {
  return (
    <PageWrapper>
      <div className="flex items-center justify-center">
        <LoginForm />
      </div>
    </PageWrapper>
  );
};
