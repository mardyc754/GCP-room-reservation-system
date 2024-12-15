import { useCurrentUser, useSignOutMutation } from "@/hooks/auth";

export const Navbar = () => {
  const { data } = useCurrentUser();
  const { mutate: signout } = useSignOutMutation();

  return (
    <nav className="flex p-8 w-full border-b-2  justify-between items-center shadow-md">
      <div>
        <p className="text-2xl font-semibold">
          <a href="/">Room reservation</a>
        </p>
      </div>
      <div className="flex items-center space-x-4">
        {data ? (
          <>
            <a href="/reservations">Your reservations</a>
            <button onClick={() => signout()}>Sign out</button>
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
