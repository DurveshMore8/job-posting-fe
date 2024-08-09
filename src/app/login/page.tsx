"use client";

import {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import "./page.css";
import Image from "next/image";
import Textfield from "@/components/textfield";
import Button from "@/components/button";
import { fetchService } from "@/services/fetch_services";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const router = useRouter();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (loginData.username.length == 0) {
      alert("Email or Phone Number cannot be empty.");
      return;
    }

    if (loginData.password.length == 0) {
      alert("Password cannot be empty.");
      return;
    }

    const res = await fetchService({
      method: "POST",
      endpoint: "/user/login",
      data: loginData,
    });

    if (res.code == 200) {
      sessionStorage.setItem("authToken", res.data.authToken);
      sessionStorage.setItem("authType", res.data.type);
      if (res.data.type === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/candidate/job-list");
      }
    } else {
      alert(res.data.message);
    }
  };

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  return (
    <main className="login">
      <section className="login-left">
        <h2 className="login-left-header">Jobs Posting</h2>
        <Image
          src="https://cdni.iconscout.com/illustration/premium/thumb/job-finding-5150521-4309625.png"
          alt=""
          width={612}
          height={612}
          priority
        />
      </section>
      <section className="login-right">
        <h2 className="login-right-head">Hello Again!</h2>
        <span className="login-right-desc">
          Streamline your experience with our comprehensive job posting system,
          designed to enhance clarity and engagement.
        </span>
        <form className="login-right-fields" onSubmit={handleFormSubmit}>
          <Textfield
            id="username"
            value={loginData.username}
            placeholder="Email or Phone Number"
            type="name"
            onChange={handleChange}
          />
          <Textfield
            id="password"
            value={loginData.password}
            placeholder="Password"
            onChange={handleChange}
            type="password"
            isPassword={true}
          />
          <Button type="submit" value="Login" />
        </form>
        <div className="login-right-no-account">
          <span className="login-right-no-account-text">
            Want to create account as a candidate?{" "}
            <Link
              className="login-right-no-account-link"
              href="/candidate/signup"
            >
              Signup
            </Link>
          </span>
          <span className="login-right-no-account-text">
            Want to register as a company?{" "}
            <Link className="login-right-no-account-link" href="/admin/signup">
              Signup
            </Link>
          </span>
        </div>
      </section>
    </main>
  );
};

export default Login;
