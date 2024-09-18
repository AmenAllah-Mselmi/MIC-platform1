import "./reachus.scss";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["600", "400", "500"] });

export default function Reachus() {
  return (
    <section id="reachus" className={inter.className}>
      <div className="container">
        <div className="title">
          <h1 data-aos="fade-up">Reach Us</h1>
          <p data-aos="fade-up" data-aos-delay="150">
            Connect with us today!
          </p>
        </div>
        <div className="main">
          <div className="infos">
            <div data-aos="fade-up" data-aos-delay="150">
              <h1>Via Email</h1>
              <p>microsoftissatso@gmail.com</p>
            </div>
            <div data-aos="fade-up" data-aos-delay="150">
              <h1>Or Call Us</h1>
              <p>+216 98 765 432</p>
            </div>
          </div>
          <div data-aos="fade-up" data-aos-delay="150" className="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4065.4246014454448!2d10.635733176408937!3d35.812496422750975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1302756a7452317b%3A0xfe8bdcb107b21c72!2sInstitut%20Sup%C3%A9rieur%20des%20Sciences%20Appliqu%C3%A9es%20et%20de%20Technologie%20de%20Sousse!5e1!3m2!1sfr!2stn!4v1696704742233!5m2!1sfr!2stn"
              width="500"
              height="350"
              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="microsoft issatso club location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
