import { Navbar } from "./Navbar";

type PageWrapperProps = {
  title?: string;
  children?: React.ReactNode | React.ReactNode[];
};

export const PageWrapper = ({ title, children }: PageWrapperProps) => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col p-8 space-y-8">
        {title && <h1 className="text-4xl">{title}</h1>}
        <div className="grid space-x-8">{children}</div>
      </div>
    </>
  );
};
