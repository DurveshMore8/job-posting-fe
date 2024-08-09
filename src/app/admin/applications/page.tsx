"use client";

import DoctorCard from "@/components/cards/doctor-card";
import { fetchService } from "@/services/fetch_services";
import { FunctionComponent, useEffect, useState } from "react";
import "./page.css";

interface AdminApplicationsProps {}

const AdminApplications: FunctionComponent<AdminApplicationsProps> = () => {
  const [jobs, setJobs] = useState<{ [key: string]: any }[]>([]);

  const fetchDoctors = async () => {
    const res = await fetchService({
      method: "GET",
      endpoint: `/user/user-by-token`,
    });

    if (res.code == 200) {
      const res1 = await fetchService({
        method: "POST",
        endpoint: "/job/fetch-applied",
        data: {
          type: "admin",
          email: res.data.email,
        },
      });

      if (res1.code == 200) {
        setJobs(res1.data.jobApplied);
      } else {
        alert(res.data.message);
      }
    } else {
      alert(res.data.message);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <main className="doctors">
      <h2>Job Applied</h2>
      <section className="doctors-grid">
        {jobs.map((job, index) => {
          return (
            <DoctorCard
              key={index}
              id={job._id}
              image={job.coImage}
              name={job.caName}
              speciality={job.caDesignation}
              type="admin"
              status={job.status}
            />
          );
        })}
      </section>
    </main>
  );
};

export default AdminApplications;
