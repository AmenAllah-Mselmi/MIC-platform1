import Image from "next/image";
import "./about.scss";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "600"] });

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="logo" data-aos="fade-up">
          <Image
            src="/images/big-logo.png"
            alt="microsoft issatso logo"
            width={282.1}
            height={310}
          />
        </div>
        <div className={`${inter.className} infos`}>
          <div
            data-aos="fade-up"
            className="title"
            style={{ fontWeight: "600" }}
          >
            About Microsoft IssatSo Club.
          </div>
          <p data-aos="fade-up" data-aos-delay="100">
            Join the Microsoft ISSATso Club, a tech community at the Higher
            Institute of Applied Science and Technology of Sousse. Founded in
            2013, we help you develop practical tech skills for the professional
            world. Learn from regional events, workshops, and training in
            various tech domains. Connect with a supportive network of
            co-workers and mentors. Earn certificates and join our board team.
            Follow us on our website and social media. Microsoft ISSATso Club:
            shaping the future of technology with passion.
          </p>
        </div>
      </div>
    </section>
  );
}
