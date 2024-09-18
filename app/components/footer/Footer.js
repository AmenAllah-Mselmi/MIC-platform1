import Link from "next/link";
import "./footer.scss";
import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";
// import { PiInstagramLogo } from "react-icons/pi";
// import { BiLogoLinkedinSquare } from "react-icons/bi";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["600", "400", "500"] });

export default function Footer() {
  return (
    <footer id="footer" className={inter.className}>
      <div className="container">
        <div className="rights">© 2023 All rights reserved.</div>
        <div className="links">
          <Link href="/#welcome">Home</Link>
          <Link href="/#about">About</Link>
          <Link href="/contact">Contact Us</Link>
          <Link href="/forms">Forms</Link>

          <div className="socials">
            <Link href="https://www.facebook.com/MicrosoftISSATSO">
              <BsFacebook />
            </Link>
            <Link href="https://www.instagram.com/mic.issatso/">
              <BsInstagram />
            </Link>
            <Link href="https://www.linkedin.com/company/microsoft-issatso-club">
              <BsLinkedin />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
