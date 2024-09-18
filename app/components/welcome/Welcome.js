import "./welcome.scss";
import { Noto_Sans, Kaushan_Script } from "next/font/google";
import { useRouter } from "next/navigation";
import { BsBoxArrowUpRight } from "react-icons/bs";

const notosans = Noto_Sans({ subsets: ["latin"], weight: "600" });
const kaushan = Kaushan_Script({ subsets: ["latin"], weight: "400" });

export default function Welcome() {
  const router = useRouter();
  function join() {
    //   const links = ["#", "#", "#"];

    // const links = [
    //   "https://forms.office.com/Pages/ResponsePage.aspx?id=TWbW27lO60aZ2FxDuhU8YRbmmrRFXqpJqxVV455ifIZUODNRQUxSWkZCU1lINUJTTUFSRk5XS1IxOC4u",
    //   "https://forms.office.com/Pages/ResponsePage.aspx?id=TWbW27lO60aZ2FxDuhU8YRbmmrRFXqpJqxVV455ifIZUNEw5VlJIN0dZV0kwT1c3RU9YU1pFUUdYQy4u",
    //   "https://forms.office.com/Pages/ResponsePage.aspx?id=TWbW27lO60aZ2FxDuhU8YRbmmrRFXqpJqxVV455ifIZUMjJLM0FNNE1QU1BHOVFaMVpOV0pQOUdQTi4u",
    // ];

    // const random = Math.floor(Math.random() * 3);

    // window.open(links[random], "_blank"); // new tab
    // window.location.href = links[random]; // same tab

    // window.open("https://docs.google.com/forms/d/e/1FAIpQLSelKJkjyL8Gx5qlA-4ZWwVGiSdR-JQn8Yfbw2sAXZeDfHHv2Q/viewform?usp=sf_link", "_blank");
    router.push("/events/the-maze");
  }

  return (
    <section id="welcome">
      <div className="container">
        <h1 data-aos="fade-up" className={notosans.className}>
          Microsoft IssatSo Club{" "}
        </h1>
        <p data-aos="fade-up" className={kaushan.className}>
          Creating An Impact That Matters
        </p>
        {/*      <div
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-offset="0"
          onClick={join}
          className={`${kaushan.className} join`}
        >
          Join Us <BsBoxArrowUpRight />
        </div>
*/}
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-offset="0"
          onClick={join}
          className={`${kaushan.className} join`}
        >
          The Maze Event <BsBoxArrowUpRight />
        </div>
      </div>
    </section>
  );
}
