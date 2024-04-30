
import { Link } from "react-router-dom";

const Hero1 = () => {
  return (
    <>
      <div className="md:px-36 px-8 md:py-28 py-5">
        <div className="flex lg:flex-row flex-col grid-cols-2 gap-10">
          <div className="flex flex-col gap-5 justify-center p-5">
            <h1 className="text-4xl md:text-5xl font-bold">Where</h1>
            <h1 className="text-4xl md:text-5xl font-bold">do you</h1>
            <h1 className="text-4xl md:text-5xl font-bold">like to</h1>
            <h1 className="text-4xl md:text-6xl font-bold text-[#41A4FF]">
              Work
            </h1>
            <p className="mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Link
              to="/spaces"
              className="bg-black text-white px-2 py-3 rounded-lg hover:bg-white hover:border hover:text-black hover:font-bold mt-4 text-center"
            >
              Get started
            </Link>
          </div>
          <div className="">
            <img
              src="https://dynamico.space/wp-content/uploads/2022/06/7-coworking.jpg"
              alt="heroimg"
              className="rounded-3xl h-[100%] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero1;
