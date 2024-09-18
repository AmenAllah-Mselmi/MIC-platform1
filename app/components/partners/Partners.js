import Slider from "../slider/Slider";
import "./partners.scss";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["600", "400", "500"] });

const partners = [
  {
    name: "Microsoft ESSTHS",
    src: "/images/partners/mic-essths.png",
    link: "https://google.com",
  },
  {
    name: "Microsoft EPI",
    src: "/images/partners/mic-epi.png",
    link: "https://google.com",
  },
  {
    name: "Askware",
    src: "/images/partners/askware.png",
    link: "https://www.askware.com/",
  },
  {
    name: "Tech Inventors",
    src: "/images/partners/tech-inventors.png",
    link: "https://google.com",
  },
  {
    name: "4C",
    src: "/images/partners/4c.png",
    link: "https://google.com",
  },
  {
    name: "KPI",
    src: "/images/partners/kpi.png",
    link: "https://google.com",
  },
];

export default function Partners() {
  return (
    <section id="partners" className={inter.className}>
      <div className="partners-container">
        <div className="title">
          <h1>Our Partners</h1>
          <p data-aos="fade-up" data-aos-delay="100">
            Discover our valued collaborators.
          </p>
        </div>
        <Slider list={partners} />
      </div>
    </section>
  );
}
