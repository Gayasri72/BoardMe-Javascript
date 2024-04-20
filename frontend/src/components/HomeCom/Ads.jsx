import { Link } from "react-router-dom";

export const Ads = () => {
  return (
    <div >
      <div>
        <h1 className="text-center text-[#41A4FF] mb-2 block text-lg font-semibold">
          Our network partners
        </h1>
        <Link
          to="/advertisments"
          className="bg-black text-white px-2 py-3 rounded-lg hover:bg-white hover:border hover:text-black hover:font-bold mt-4 text-center flex justify-center"
        >
          Advertisements
        </Link>
      </div>
    </div>
  );
};

export default Ads;
