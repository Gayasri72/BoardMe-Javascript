import React from "react";

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-12">
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-center">What is Coworking?</h2>
          <p className="text-gray-700 leading-relaxed text-center mx-auto max-w-2xl">
            Coworking is a modern work style that involves a shared workplace, often an office, and independent activity. Unlike in a typical office, those coworking are not employed by the same organization. Coworking spaces are a cost-effective solution for freelancers, remote workers, and small businesses to work in a professional environment alongside like-minded individuals.
          </p>
        </div>
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-center">What is CoSpace?</h2>
          <p className="text-gray-700 leading-relaxed text-center mx-auto max-w-2xl">
            CoSpace is a premier online platform that connects individuals and businesses with coworking spaces around the world. We provide a seamless booking experience, allowing users to discover, book, and manage coworking spaces efficiently. Whether you need a desk for a day or a dedicated office for your team, CoSpace offers a diverse range of options to suit your needs.
          </p>
        </div>
        <div>
          <h2 className="text-4xl font-bold mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Team member cards */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <img src="./src/assets/member1.jpeg" alt="Team Member" className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-center">John Doe</h3>
              <p className="text-gray-700 text-center mb-4">Co-Founder & CEO</p>
              <p className="text-gray-600 text-center">John is a visionary entrepreneur with a passion for innovation and teamwork. He brings extensive experience in business development and strategy.</p>
            </div>
            <div className="bg-blue-100 shadow-md rounded-lg p-6">
              <img src="./src/assets/member2.jpeg" alt="Team Member" className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-center">Jane Smith</h3>
              <p className="text-gray-700 text-center mb-4">Co-Founder & CTO</p>
              <p className="text-gray-600 text-center">Jane is a tech enthusiast and a skilled software architect. She leads our technical team with precision and creativity.</p>
            </div>
            <div className="bg-green-100 shadow-md rounded-lg p-6">
              <img src="./src/assets/member3.jpeg" alt="Team Member" className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-center">Alex Johnson</h3>
              <p className="text-gray-700 text-center mb-4">Lead Developer</p>
              <p className="text-gray-600 text-center">Alex is a coding ninja with a knack for problem-solving. He's dedicated to crafting high-quality software solutions that exceed expectations.</p>
            </div>
            <div className="bg-yellow-100 shadow-md rounded-lg p-6">
              <img src="./src/assets/member4.jpeg" alt="Team Member" className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-center">Eva Martinez</h3>
              <p className="text-gray-700 text-center mb-4">Marketing Specialist</p>
              <p className="text-gray-600 text-center">Eva is a creative mind with a passion for storytelling. She leverages her expertise in digital marketing to amplify our brand presence.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
