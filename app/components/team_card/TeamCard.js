import Image from 'next/image';
import './teamcard.scss';
import { IoCodeSlash, IoLogoLinkedin } from 'react-icons/io5';

export default function TeamCard({ infos }) {
  const { name, position, image, linkedin, portfolio } = infos;
  return (
    <div data-aos="fade-up" className="team-card">
      <div className="image-container">
        <Image
          src={image}
          alt={name}
          width={200}
          height={200}
          className="member-image"
        />
        <div className="image-gradient" />
      </div>{' '}
      <div className="infos">
        <div className="name__position">
          <div className="name">{name}</div>
          <div className="position">{position}</div>
        </div>
        <div className="linksWrapper">
          <a href={linkedin}>
            <IoLogoLinkedin />
          </a>
          {portfolio && (
            <a href={portfolio}>
              <IoCodeSlash />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
