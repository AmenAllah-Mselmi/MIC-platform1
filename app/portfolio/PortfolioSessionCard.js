"use client";

import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "../components/skeleton/Skeleton";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function PortfolioSessionCard({ infos }) {
  const { department, images } = infos;
  return (
    <div className="portfolio-session">
      <div className="name" data-aos="fade-up">
        {department}
      </div>
      <div className="images">
        {images.map((image) => (
          <div key={image} className="image" data-aos="fade-up">
            <LazyLoadImage
              threshold={20}
              src={image}
              effect="blur"
              alt="Microsoft Issatso Session"
              placeholder={<Skeleton />}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
