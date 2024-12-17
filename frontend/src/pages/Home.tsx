import { Button } from "../components/Button";
import { PageWrapper } from "@/components/PageWrapper";

export const Home = () => {
  return (
    <PageWrapper title="Welcome to Room reservation system!">
      <div className="flex space-x-4 items-center">
        <Button>
          <a href="/create-reservation">Book a room</a>
        </Button>
        <Button>
          <a href="/reservations">Your bookings</a>
        </Button>
      </div>
    </PageWrapper>
  );
};
