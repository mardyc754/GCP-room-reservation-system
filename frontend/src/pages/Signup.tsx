import { PageWrapper } from "@/components/PageWrapper";
import { SignupForm } from "@/components/forms/SignupForm";

export const Signup = () => {
  return (
    <PageWrapper>
      <div className="flex items-center justify-center">
        <SignupForm />
      </div>
    </PageWrapper>
  );
};
