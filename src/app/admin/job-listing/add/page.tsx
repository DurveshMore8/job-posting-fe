"use client";

import { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import "./page.css";
import Textfield from "@/components/textfield";
import Textarea from "@/components/textarea";
import { fetchService } from "@/services/fetch_services";
import Button from "@/components/button";
import { useRouter } from "next/navigation";

interface AdminJobListingAddProps {}

const AdminJobListingAdd: FunctionComponent<AdminJobListingAddProps> = () => {
  const router = useRouter();
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
  const [category, setCategory] = useState<{ [key: string]: any }[]>([]);

  const fetchCategory = async () => {
    const res = await fetchService({
      method: "GET",
      endpoint: `/job/get-category-list`,
    });

    if (res.code == 200) {
      setCategory(res.data.categories);
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
      method: "POST",
      endpoint: `/job/create-job`,
      data: jobData,
    });

    if (res.code == 200) {
      alert(res.data.message);
      router.push("/admin/job-listing");
    } else {
      alert(res.data.message);
    }
  };

  useEffect(() => {
    fetchCategory();
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
        />
        <Textfield
          id={"companyName"}
          value={jobData.companyName}
          placeholder={"Company Name"}
          type={"text"}
          onChange={handleChange}
        />
        <select className="job-dropdown" onChange={handleChange}>
          <option selected disabled>
            Select Category
          </option>
          {category.map((data, index) => {
            return <option key={index}>{data.categoryName}</option>;
          })}
        </select>
        <Textfield
          id={"email"}
          value={jobData.email}
          placeholder={"Email"}
          type={"email"}
          onChange={handleChange}
        />
        <Textfield
          id={"tags"}
          value={jobData.tags}
          placeholder={"Tags (comma seprated)"}
          type={"text"}
          onChange={handleChange}
        />
        <Textfield
          id={"skills"}
          value={jobData.skill}
          placeholder={"Skills"}
          type={"text"}
          onChange={handleChange}
        />
        <Textfield
          id={"experienceReq"}
          value={jobData.experienceReq}
          placeholder={"Experience Required"}
          type={"text"}
          onChange={handleChange}
        />
        <Textfield
          id={"salary"}
          value={jobData.salary}
          placeholder={"Salary"}
          type={"text"}
          onChange={handleChange}
        />
      </div>
      <div className="job-description">
        <Textarea
          id={"description"}
          value={jobData.description}
          placeholder={"Description"}
          onChange={handleChange}
        />
      </div>
      <div className="job-button">
        <Button value="Add Job" onClick={handleAddClick} />
      </div>
    </main>
  );
};

export default AdminJobListingAdd;
