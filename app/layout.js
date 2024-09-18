import { Inter } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import ScrollTop from "./components/scrolltop/ScrollTop";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Microsoft Issatso Club",
  description: "Microsoft Issatso Club",
};

export default function RootLayout({ children }) {
  return (
    <html
      style={{
        scrollBehavior: "smooth",
      }}
      lang="en"
    >
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
        <ScrollTop />
        <Analytics />
      </body>
    </html>
  );
}
