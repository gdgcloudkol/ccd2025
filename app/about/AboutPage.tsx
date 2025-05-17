import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 bg-background text-foreground">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-black dark:text-white">
          About Cloud Community Day
        </h1>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg mb-6 text-gray dark:text-gray-20">
            Cloud Community Day is the flagship annual gathering of cloud
            professionals, developers, architects, DevOps engineers, and
            enthusiasts from across the globe. Hosted by the GDG Cloud Kolkata,
            this event brings together thought leaders, pioneers, and
            practitioners to share insights, trends, and innovations shaping the
            future of computing.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-black dark:text-white">
            Our Mission
          </h2>
          <p className="mb-6 text-gray dark:text-gray-20">
            Our mission is to foster a vibrant community of cloud practitioners
            and enthusiasts, providing a platform for knowledge sharing,
            networking, and collaboration. We aim to accelerate cloud adoption
            and innovation by bringing together diverse perspectives and
            experiences.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-black dark:text-white">
            Event History
          </h2>
          <p className="mb-6 text-gray dark:text-gray-20">
            Cloud Community Day has grown from a small local meetup to a
            globally recognized event attracting participants from around the
            world. Each year, we strive to deliver exceptional content, engaging
            speakers, and valuable networking opportunities.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-black dark:text-white">
            Organizing Team
          </h2>
          <p className="mb-6 text-gray dark:text-gray-20">
            Cloud Community Day is organized by a dedicated team of volunteers
            from GDG Cloud Kolkata, passionate about cloud technologies and
            community building. Our team works tirelessly to create an
            inclusive, informative, and inspiring event for all participants.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
