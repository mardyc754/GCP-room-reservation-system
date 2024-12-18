import { useParams } from "react-router-dom";

import { ChangeReservationDataForm } from "@/components/forms/ChangeReservationDataForm";
import { PageWrapper } from "@/components/PageWrapper";

export const ChangeReservationData = () => {
  const { reservationId } = useParams<{ reservationId: string }>();

  return (
    <PageWrapper>
      {reservationId && (
        <div className="flex flex-col space-y-4 items-center justify-center">
          <ChangeReservationDataForm reservationId={parseInt(reservationId)} />
        </div>
      )}
    </PageWrapper>
  );
};
