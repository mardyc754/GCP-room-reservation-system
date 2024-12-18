import { useCurrentUser, useSignOutMutation } from "@/hooks/auth";

export const Navbar = () => {
  const { data } = useCurrentUser();
  const { mutate: signout } = useSignOutMutation();

  return (
    <nav className="flex p-6 w-full border-b-2 bg-card justify-between items-center">
      <div>
        <p className="text-2xl font-semibold">
          <a href="/">Room reservation</a>
        </p>
      </div>
      <div className="flex items-center space-x-4">
        {data ? (
          <>
            <a href="/create-reservation">Book a room</a>
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
