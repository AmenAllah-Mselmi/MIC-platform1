import Image from "next/image";
import "./department_card.scss";

export default function DepartmentCard({ infos }) {
  const { name, image } = infos;
  return (
    <div data-aos="fade-up" className="department-card">
      <Image src={image} alt={name} width={110} height={110} />
      <div className="name">{name}</div>
    </div>
  );
}
