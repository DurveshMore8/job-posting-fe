import { FunctionComponent } from "react";
import "./page.css";
import Link from "next/link";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <main>
      <section className="home-hero-section">
        <h1 className="home-hero-header">
          <span className="home-hero-header-one">Jobs Posting</span> Web
          Application
        </h1>
        <p className="home-hero-header-desc">By Durvesh More</p>
        <div className="home-hero-header-buttons">
          <button className="home-hero-header-get-started">
            <Link href="/login">Get Started</Link>
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
