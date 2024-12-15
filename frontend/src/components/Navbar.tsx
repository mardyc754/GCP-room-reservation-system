import { useCurrentUser } from "@/hooks/auth";

export const Navbar = () => {
  const { data } = useCurrentUser();

  return (
    <nav className="flex p-8 w-full bg-[#aaa] justify-between items-center">
      <div>
        <p className="text-2xl font-semibold">
          <a href="/">Room reservation</a>
        </p>
      </div>
      <div className="flex items-center space-x-4">
        {data ? (
          <>
            <a href="/reservations">Your reservations</a>
          </>
        ) : (
          <>
            <a href="/sign-in">Sign in</a>
          </>
        )}
      </div>
    </nav>
  );
};
