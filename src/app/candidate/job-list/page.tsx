"use client";

import Button from "@/components/button";
import DoctorCard from "@/components/cards/doctor-card";
import { fetchService } from "@/services/fetch_services";
import "./page.css";
import { FunctionComponent, useEffect, useState } from "react";

interface CandidateJobListProps {}

const CandidateJobList: FunctionComponent<CandidateJobListProps> = () => {
  const [jobs, setJobs] = useState<{ [key: string]: any }[]>([]);

  const fetchDoctors = async () => {
    const res = await fetchService({
      method: "GET",
      endpoint: "/job/fetch-jobs",
    });

    if (res.code == 200) {
      setJobs(res.data.jobs);
      console.log(res.data.jobs);
    } else {
      alert(res.data.message);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <main className="doctors">
      <h2>Job Available</h2>
      <section className="doctors-grid">
        {jobs.map((job, index) => {
          return (
            <DoctorCard
              key={index}
              id={job._id}
              image={job.companyLogo}
              name={job.title}
              speciality={job.category}
              type="candidate"
            />
          );
        })}
      </section>
    </main>
  );
};

export default CandidateJobList;
