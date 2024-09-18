import Image from "next/image";

export default function PartnerCard({ infos }) {
  const { name, image, link } = infos;
  return (
    <div data-aos="zoom-in-up" className="partner-card">
      <Image src={image} alt={name} width={140} height={140} />
    </div>
  );
}
