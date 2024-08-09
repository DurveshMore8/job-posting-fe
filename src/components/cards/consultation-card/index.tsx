import { FunctionComponent, useEffect, useState } from "react";
import "./style.css";
import Button from "@/components/button";
import Link from "next/link";

interface ConsultationCardProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateBooked: string;
  illness: string;
}

const ConsultationCard: FunctionComponent<ConsultationCardProps> = ({
  id = "",
  name,
  email,
  phone,
  dateBooked,
  illness,
}) => {
  const date = new Date(dateBooked);
  const [authType, setAuthType] = useState<string>("");

  useEffect(() => {
    setAuthType(sessionStorage.getItem("authType") as string);
  }, []);

  return (
    <div className="consultation-card">
      <div className="consultation-card-header">
        <h2>Appointment Details</h2>
      </div>
      <div className="consultation-card-body">
        <p>
          <strong>User:</strong> {name}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Phone:</strong> {phone}
        </p>
        <p>
          <strong>Date Booked:</strong>{" "}
          {`${date.getDay()} - ${date.getMonth()} - ${date.getFullYear()}`}
        </p>
        <p>
          <strong>Illness:</strong> {illness}
        </p>
        <Link
          href={
            authType == "doctor"
              ? `/doctor/prescription/${id}`
              : `/patient/consultations/${id}`
          }
          className="consultation-button"
        >
          <Button value="View" />
        </Link>
      </div>
    </div>
  );
};

export default ConsultationCard;
