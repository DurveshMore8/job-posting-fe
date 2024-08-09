"use client";

import Button from "@/components/button";
import Textarea from "@/components/textarea";
import Textfield from "@/components/textfield";
import { fetchService } from "@/services/fetch_services";
import { useParams, useRouter } from "next/navigation";
import { FunctionComponent, useEffect, useState } from "react";
import "./page.css";

interface AdminApplicationsIdProps {}

const AdminApplicationsId: FunctionComponent<AdminApplicationsIdProps> = () => {
  const router = useRouter();
  const id = useParams().id;
  const [applied, setApplied] = useState<{ [key: string]: any }>({});
  const [reason, setReason] = useState("");

  const fetchById = async () => {
    const res = await fetchService({
      method: "POST",
      endpoint: "/job/fetch-applied-by-id",
      data: {
        id,
      },
    });

    if (res.code == 200) {
      setApplied(res.data.applied);
      setReason(res.data.applied.reason ?? "");
    } else {
      alert(res.data.message);
    }
  };

  const acceptJob = async () => {
    const res = await fetchService({
      method: "POST",
      endpoint: "/job/accept-job",
      data: {
        id,
        reason,
        status: "accept",
      },
    });

    if (res.code == 200) {
      alert(res.data.message);
      router.push("/admin/applications");
    } else {
      alert(res.data.message);
    }
  };

  const rejectJob = async () => {
    const res = await fetchService({
      method: "POST",
      endpoint: "/job/accept-job",
      data: {
        id,
        reason,
        status: "reject",
      },
    });

    if (res.code == 200) {
      alert(res.data.message);
      router.push("/admin/applications");
    } else {
      alert(res.data.message);
    }
  };

  useEffect(() => {
    fetchById();
  }, []);

  return (
    <main className="job-add">
      <h2>View Job</h2>
      <div className="job-fields">
        <Textfield
          id={"title"}
          value={applied.caName}
          placeholder={"Job Title"}
          type={"text"}
          readonly
        />
        <Textfield
          id={"companyName"}
          value={applied.caEmail}
          placeholder={"Company Name"}
          type={"text"}
          readonly
        />
        <Textfield
          id={"companyName"}
          value={applied.caPhone}
          placeholder={"Company Name"}
          type={"text"}
          readonly
        />
        <Textfield
          id={"tags"}
          value={applied.caLocations}
          placeholder={"Tags (comma seprated)"}
          type={"text"}
          readonly
        />
        <Textfield
          id={"skills"}
          value={applied.caDesignation}
          placeholder={"Skills"}
          type={"text"}
          readonly
        />
        <Textfield
          id={"experienceReq"}
          placeholder={"Experience Required"}
          type={"text"}
          readonly
          value={applied.caSkillSets}
        />
        <Textfield
          id={"salary"}
          value={applied.coCategory}
          placeholder={"Salary"}
          type={"text"}
        />
      </div>
      <div className="job-description">
        <Textarea
          id={"description"}
          value={applied.coDescription}
          placeholder={"Description"}
          isReadOnly
        />
      </div>
      <div className="job-description">
        <Textarea
          id={"reason"}
          value={reason}
          placeholder={"Reason"}
          onChange={(e) => setReason(e.target.value)}
        />
      </div>
      <div className="job-button">
        <Button value="Accept" onClick={acceptJob} />
        <Button value="Reject" onClick={rejectJob} />
      </div>
    </main>
  );
};

export default AdminApplicationsId;
