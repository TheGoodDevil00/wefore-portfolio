const teamMembers = [
  {
    name: "Shriya Malode",
    role: "Founder and Social Media Manager",
    bio: "Leading the vision and growth of the agency.",
    image: "/images/team/shriya-new.jpg",
  },
  {
    name: "Sanyog Swami",
    role: "Creative Director",
    bio: "Crafting compelling narratives and creative strategies.",
    image: "/images/team/sanyog-swami-new.png",
  },
  {
    name: "Parth Shinde",
    role: "Graphics Designer",
    bio: "Designing visual experiences and managing social presence.",
    image: "/images/team/parth-shinde-new.jpg",
  },
  {
    name: "Pranav Pawar",
    role: "Founder and Video Editor",
    bio: "Capturing and editing stunning visual stories.",
    image: "/images/team/pranav-pawar.jpg",
  },
];

const TeamSection = () => {
  return (
    <section className="py-12 md:py-24 bg-transparent border-t border-black/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="font-display text-[24px] md:text-display-sm text-ebon-depth mb-2 md:mb-4 font-semibold tracking-tight">
            Meet The Team
          </h2>
          <p className="font-body text-[13px] md:text-body text-mist-gray max-w-xl mx-auto">
            The creative minds behind your brand's success.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="text-center group flex flex-col items-center"
            >
              <div className="w-20 h-20 md:w-40 md:h-40 mb-3 md:mb-6 rounded-full overflow-hidden ring-2 md:ring-4 ring-mist-gray/10 hover:ring-mist-gray/30 transition-all duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="font-display text-[14px] md:text-subheading text-ebon-depth mb-0.5 md:mb-1 leading-tight">
                {member.name}
              </h3>
              <p className="font-body text-[10px] md:text-[14px] text-mist-gray tracking-[-0.14px] mb-1 md:mb-3 uppercase leading-snug">
                {member.role}
              </p>
              <p className="font-body text-[12px] md:text-body text-onyx-shadow hidden md:block">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
