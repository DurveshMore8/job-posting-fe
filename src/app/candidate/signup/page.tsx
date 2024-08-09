"use client";

import { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import "./page.css";
import Image from "next/image";
import Textfield from "@/components/textfield";
import Button from "@/components/button";
import { fetchService } from "@/services/fetch_services";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Uploadfield from "@/components/uploadfield";
import Person from "@/components/icons/person";

interface CandidateSignupProps {}

const CandidateSignup: FunctionComponent<CandidateSignupProps> = () => {
  const router = useRouter();

  const [fileName, setFileName] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupData, setSignupData] = useState<{ [key: string]: string }>({
    name: "",
    email: "",
    phone: "",
    locations: "",
    designation: "",
    skillSet: "",
    password: "",
    profileImage: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "confirmPassword") {
      setConfirmPassword(e.target.value);
      return;
    }
    setSignupData({ ...signupData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      setFileName(file.name);

      reader.onloadend = () => {
        if (reader.result) {
          setSignupData({
            ...signupData,
            profileImage: reader.result as string,
          });
        }
      };

      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const keys: string[] = Object.keys(signupData);

    for (let key in keys) {
      if (signupData[keys[key]].length == 0) {
        alert(`${keys[key]} is required.`);
        return;
      }
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(signupData.email)) {
      alert("Invalid email address.");
      return;
    }

    if (signupData.phone.length != 10) {
      alert("Phone number should be 10 digits.");
      return;
    }

    if (signupData.password !== confirmPassword) {
      alert(`Password and Confirm Password do not match.`);
      return;
    }

    const res1 = await fetchService({
      method: "POST",
      endpoint: "/candidate/register",
      data: signupData,
    });

    if (res1.code == 200) {
      const res2 = await fetchService({
        method: "POST",
        endpoint: "/user/login",
        data: {
          username: signupData.email,
          password: signupData.password,
        },
      });

      if (res2.code == 200) {
        sessionStorage.setItem("authToken", res2.data.authToken);
        sessionStorage.setItem("authType", res2.data.type);
        router.push("/candidate/job-list");
      } else {
        alert(res2.data.message);
      }
    } else {
      alert(res1.data.message);
    }
  };

  return (
    <main className="dsignup">
      <section className="dsignup-left">
        <h2 className="dsignup-left-header">Jobs Posting</h2>
        <Image
          src="https://cdni.iconscout.com/illustration/premium/thumb/job-finding-5150521-4309625.png"
          alt=""
          width={612}
          height={612}
          priority
        />
      </section>
      <section className="dsignup-right">
        <h2 className="dsignup-right-head">Hello Candidate!</h2>
        <span className="dsignup-right-desc">
          Welcome to our platform, Candidate! Sign up to get started.
        </span>
        <form className="dsignup-right-fields" onSubmit={handleFormSubmit}>
          <div className="dsignup-right-profile">
            {signupData.profileImage.length == 0 ? (
              <Person />
            ) : (
              <Image
                src={signupData.profileImage}
                alt=""
                width={100}
                height={100}
                style={{ objectFit: "cover", borderRadius: "50%" }}
              />
            )}
          </div>
          <div className="dsignup-right-textfields">
            <Textfield
              id="name"
              value={signupData.name}
              placeholder="Name"
              type="name"
              onChange={handleChange}
            />
            <Textfield
              id="designation"
              value={signupData.designation}
              placeholder="Designation"
              type="text"
              onChange={handleChange}
            />
            <Textfield
              id="email"
              value={signupData.email}
              placeholder="Email"
              type="email"
              onChange={handleChange}
            />
            <Textfield
              id="phone"
              value={signupData.phone}
              placeholder="Phone number"
              type="tel"
              onChange={handleChange}
            />
            <Textfield
              id="skillSet"
              value={signupData.skillSet}
              placeholder="Skill set (comma separated)"
              type="text"
              onChange={handleChange}
            />
            <Textfield
              id="locations"
              value={signupData.locations}
              placeholder="Locations (comma separated)"
              type="text"
              onChange={handleChange}
            />
            <Uploadfield name={fileName} onChange={handleFileChange} />
            <Textfield
              id="password"
              value={signupData.password}
              placeholder="Password"
              onChange={handleChange}
              type="password"
              isPassword={true}
            />
            <Textfield
              id="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={handleChange}
              type="password"
              isPassword={true}
            />
          </div>
          <Button type="submit" value="Signup" />
        </form>
        <div className="dsignup-right-no-account">
          <span className="dsignup-right-no-account-text">
            Already have an account?{" "}
            <Link className="dsignup-right-no-account-link" href="/login">
              Login
            </Link>
          </span>
        </div>
      </section>
    </main>
  );
};

export default CandidateSignup;
