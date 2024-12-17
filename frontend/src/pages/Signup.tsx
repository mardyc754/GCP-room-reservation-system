import { PageWrapper } from "@/components/PageWrapper";
import { SignupForm } from "@/components/forms/SignupForm";

export const Signup = () => {
  return (
    <PageWrapper title="Sign up">
      <div className="flex flex-col space-y-4">
        <SignupForm />
        <p>
          Already have account? <a href="sign-in">Sign in here</a>
        </p>
      </div>
    </PageWrapper>
  );
};
