import { useParams } from "react-router-dom";

import { ChangeReservationDataForm } from "@/components/forms/ChangeReservationDataForm";
import { PageWrapper } from "@/components/PageWrapper";

export const ChangeReservationData = () => {
  const { reservationId } = useParams<{ reservationId: string }>();

  return (
    <PageWrapper title="Change reservation data">
      {reservationId && (
        <ChangeReservationDataForm reservationId={parseInt(reservationId)} />
      )}
    </PageWrapper>
  );
};
