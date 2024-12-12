import { Button } from "../components/Button";

export const Home = () => {
  return (
    <div className="flex flex-col items-center p-8 space-y-8">
      <h1 className="text-4xl">Welcome to Room reservation system!</h1>
      <div className="flex items-center justify-center space-x-8">
        <Button>Book a room</Button>
        <Button>Your bookings</Button>
      </div>
    </div>
  );
};
