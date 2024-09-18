import { Inter } from "next/font/google";
import DepartmentCard from "./DepartmentCard";
import "./departments.scss";

const inter = Inter({ subsets: ["latin"], weight: ["600", "400", "500"] });

const departments = [
  {
    name: "Basic Web",
    image: "/images/departments/basic-web.png",
  },
  {
    name: "Intermediate Web",
    image: "/images/departments/intermediate-web.png",
  },
  {
    name: "Advanced Web",
    image: "/images/departments/advanced-web.png",
  },
  {
    name: "Machine learning",
    image: "/images/departments/ml.png",
  },
  {
    name: "UI/UX",
    image: "/images/departments/uiux.png",
  },
];

export default function Departments() {
  return (
    <section id="departments" className={inter.className}>
      <div className="container">
        <div className="title">
          <h1 data-aos="fade-up">Our Departments</h1>
          <p data-aos="fade-up" data-aos-delay="150">
            Explore our tech-focused departments.
          </p>
        </div>
        <div className="departments-list">
          {departments.map((department) => (
            <DepartmentCard key={department.name} infos={department} />
          ))}
        </div>
      </div>
    </section>
  );
}
