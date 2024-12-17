import { PageWrapper } from "@/components/PageWrapper";
import { ReservationList } from "@/components/ReservationList";
import { useCurrentUser } from "@/hooks/auth";

export const Reservations = () => {
  const { data: currentUserData } = useCurrentUser();

  return (
    <PageWrapper title="Your reservations">
      {currentUserData && <ReservationList userId={currentUserData.id} />}
    </PageWrapper>
  );
};
