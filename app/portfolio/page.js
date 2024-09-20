import PortfolioSessionCard from "./PortfolioSessionCard";
import "./portfolio.scss";
import { Inter } from "next/font/google";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const inter = Inter({ subsets: ["latin"], weight: ["600", "400", "500"] });

const sessions = [
  {
    department: "Basic Web Department",
    images: [
      "/images/portfolio/basic-web/pic1.png",
      "/images/portfolio/basic-web/pic2.png",
      "/images/portfolio/basic-web/pic3.png",
      "/images/portfolio/basic-web/pic4.png",
      "/images/portfolio/basic-web/pic5.png",
      "/images/portfolio/basic-web/pic6.png",
    ],
  },
  {
    department: "Cloud Computing Department",
    images: [
      "/images/portfolio/cloud/pic1.png",
      "/images/portfolio/cloud/pic2.png",
      "/images/portfolio/cloud/pic3.png",
      "/images/portfolio/cloud/pic4.png",
      "/images/portfolio/cloud/pic5.png",
      "/images/portfolio/cloud/pic6.png",
    ],
  },
  {
    department: "Intermediate Web Department",
    images: [
      "/images/portfolio/intermediate/pic1.png",
      "/images/portfolio/intermediate/pic2.png",
      "/images/portfolio/intermediate/pic3.png",
      "/images/portfolio/intermediate/pic4.png",
      "/images/portfolio/intermediate/pic5.png",
      "/images/portfolio/intermediate/pic6.png",
    ],
  },
];

export default function Page() {
  return (
    <div id="portfolio" className={inter.className}>
      <Navbar />
      <div className="container">
        <div className="title">
          <h1 data-aos="fade-up">Moments Of Our Sessions</h1>
          <p data-aos="fade-up" data-aos-delay="150">
            Come and have a look at some moments of our session!
          </p>
        </div>
        {sessions.map((session) => (
          <PortfolioSessionCard key={session.department} infos={session} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
