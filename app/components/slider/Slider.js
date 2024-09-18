import Image from "next/image";
import "./slider.scss";

export default function Slider({ list }) {
  return (
    <div id="slider">
      <div class="logos-slide">
        {list.map((image) => (
          <Image
            // make a unique key with timestamp
            key={`${image.src}-${Date.now()}`}
            src={image.src}
            width={200}
            height={200}
            alt={image.name}
            title={image.name}
          />
        ))}
        {list.map((image) => (
          <Image
            key={`${image.src}-${Date.now()}`}
            src={image.src}
            width={200}
            height={200}
            alt={image.name}
            title={image.name}
          />
        ))}
      </div>
      <div class="logos-slide">
        {list.map((image) => (
          <Image
            key={`${image.src}-${Date.now()}`}
            src={image.src}
            width={200}
            height={200}
            alt={image.name}
            title={image.name}
          />
        ))}
        {list.map((image) => (
          <Image
            key={`${image.src}-${Date.now()}`}
            src={image.src}
            width={200}
            height={200}
            alt={image.name}
            title={image.name}
          />
        ))}
      </div>
    </div>
  );
}
