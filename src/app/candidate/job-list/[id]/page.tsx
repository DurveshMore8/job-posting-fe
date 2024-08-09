"use client";

import Button from "@/components/button";
import Textarea from "@/components/textarea";
import Textfield from "@/components/textfield";
import { fetchService } from "@/services/fetch_services";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import "./page.css";

interface CandidateJobListIdProps {}

const CandidateJobListId: FunctionComponent<CandidateJobListIdProps> = () => {
  const router = useRouter();
  const id = useParams().id;

  const [jobData, setJobData] = useState<{ [key: string]: string }>({
    title: "",
    companyName: "",
    category: "",
    email: "",
    tags: "",
    skills: "",
    experienceReq: "",
    description: "",
    salary: "",
  });

  const fetchJob = async () => {
    const res = await fetchService({
      method: "POST",
      endpoint: `/job/fetch-job-by-id`,
      data: {
        id,
      },
    });

    if (res.code == 200) {
      setJobData(res.data.job);
    } else {
      alert(res.data.message);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setJobData({ ...jobData, [e.target.id]: e.target.value });
  };

  const handleAddClick = async () => {
    const res = await fetchService({
      method: "GET",
      endpoint: `/user/user-by-token`,
    });

    if (res.code == 200) {
      console.log(jobData.title);
      const res1 = await fetchService({
        method: "POST",
        endpoint: "/job/apply-job",
        data: {
          jobId: id,
          coName: jobData.companyName,
          coEmail: jobData.email,
          coCategory: jobData.category,
          coDescription: jobData.description,
          coImage: jobData.companyLogo,
          coTitle: jobData.title,
          caName: res.data.name,
          caEmail: res.data.email,
          caPhone: res.data.phone,
          caLocations: res.data.locations,
          caDesignation: res.data.designation,
          caSkillSets: res.data.skillSet,
        },
      });

      if (res1.code == 200) {
        alert(res1.data.message);
        router.push("/candidate/job-list");
      } else {
        alert(res1.data.message);
      }
    } else {
      alert(res.data.message);
    }
  };

  useEffect(() => {
    fetchJob();
  }, []);

  return (
    <main className="job-add">
      <h2>Add Jobs</h2>
      <div className="job-fields">
        <Textfield
          id={"title"}
          value={jobData.title}
          placeholder={"Job Title"}
          type={"text"}
          onChange={handleChange}
          readonly
        />
        <Textfield
          id={"companyName"}
          value={jobData.companyName}
          placeholder={"Company Name"}
          type={"text"}
          readonly
          onChange={handleChange}
        />
        <Textfield
          id={"category"}
          value={jobData.category}
          placeholder={"Category"}
          type={"text"}
          onChange={handleChange}
          readonly
        />
        <Textfield
          id={"email"}
          value={jobData.email}
          placeholder={"Email"}
          type={"email"}
          onChange={handleChange}
          readonly
        />
        <Textfield
          id={"tags"}
          value={jobData.tags}
          placeholder={"Tags (comma seprated)"}
          type={"text"}
          onChange={handleChange}
          readonly
        />
        <Textfield
          id={"skills"}
          value={jobData.skills}
          placeholder={"Skills"}
          type={"text"}
          onChange={handleChange}
          readonly
        />
        <Textfield
          id={"experienceReq"}
          value={jobData.experienceReq}
          placeholder={"Experience Required"}
          type={"text"}
          onChange={handleChange}
          readonly
        />
        <Textfield
          id={"salary"}
          value={jobData.salary}
          placeholder={"Salary"}
          type={"text"}
          onChange={handleChange}
          readonly
        />
      </div>
      <div className="job-description">
        <Textarea
          id={"description"}
          value={jobData.description}
          placeholder={"Description"}
          onChange={handleChange}
          isReadOnly
        />
      </div>
      <div className="job-button">
        <Button value="Apply" onClick={handleAddClick} />
      </div>
    </main>
  );
};

export default CandidateJobListId;
