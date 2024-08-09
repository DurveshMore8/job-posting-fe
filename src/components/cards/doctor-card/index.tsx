import { FunctionComponent } from "react";
import "./style.css";
import Image from "next/image";
import Link from "next/link";

interface DoctorCardProps {
  id: string;
  image: string;
  name: string;
  speciality: string;
  type?: string;
}

const DoctorCard: FunctionComponent<DoctorCardProps> = ({
  id,
  image,
  name,
  speciality,
  type = "admin",
}) => {
  return (
    <div className="card">
      <div className="card-image">
        <Image src={image} alt="Doctor Profile" width={100} height={100} />
      </div>
      <div className="card-content">
        <h2 className="doctor-name">{name}</h2>
        <p className="specialty">{speciality}</p>
        <Link
          href={
            type === "admin"
              ? `/patient/doctors/${id}`
              : `/candidate/job-list/${id}`
          }
        >
          <button className="consult-button">Show</button>
        </Link>
      </div>
    </div>
  );
};
export default DoctorCard;
