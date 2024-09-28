import React from 'react';
import Logo from "../../../../public/images/big-logo.png"
import Image from 'next/image';
const EventCard: React.FC = () => {
  return (
    <div className="flex flex-wrap    bg-white mb-4 mt-4  w-10/12 mx-auto">
      <div className="w-full  md:w-1/3 lg:w-1/4 flex h-full flex-col justify-between items-center md:justify-center  mt-0 md:mt-24 lg:mt-0">
        <Image
          loading="lazy"
          alt="Logo"
          className="img-fluid rounded-start h-full object-contain "
          src={Logo}
        />
      </div>
      <div className="w-full md:w-2/3 lg:w-3/4 p-4">
        <div className="card-body">
          <ul className="list-unstyled">
            <li className="mb-2">
              Heure de début: <h6>17:00</h6>
            </li>
            <li className="mb-2">
              <span>Salle:</span> <h6>M8</h6>
            </li>
            <li className="mb-2">
              <span>Duration:</span> <h6>1h 59m</h6>
            </li>
            <li>
              <span>Places restantes:</span> <h6>0</h6>
            </li>
          </ul>
          <p className="card-text text-justify">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi fugiat recusandae possimus quas libero inventore laudantium consequatur nihil molestiae incidunt eos aliquid, magni ducimus veniam?
          </p>
          <div className="flex justify-between mt-2">
            <div>
              {/* Placeholder for potential additional content */}
            </div>
            <div className="flex justify-center items-center">
              <button style={{ backgroundColor: "#0B6363" }} className=' cursor-pointer text-white px-4 py-2 rounded-md'>Participer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventCard;