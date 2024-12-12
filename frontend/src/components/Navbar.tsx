export const Navbar = () => {
  return (
    <nav className="flex p-8 w-full bg-[#aaa] justify-between items-center">
      <div>
        <p className="text-2xl font-semibold">Room reservation</p>
      </div>
      <div className="flex items-center space-x-4">
        <a href="/reservations">Your reservations</a>
        <a href="/sign-in">Sign in</a>
      </div>
    </nav>
  );
};
