import { LoginForm } from "@/components/LoginForm";
import { PageWrapper } from "@/components/PageWrapper";

export const Login = () => {
  return (
    <PageWrapper title="Sign in">
      <div className="flex flex-col space-y-4">
        <LoginForm />
        <p>
          Don't have account? <a href="sign-up">Sign up here</a>
        </p>
      </div>
    </PageWrapper>
  );
};
