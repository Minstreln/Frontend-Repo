import CTACard from "./CTACard";
import candidate from "@/assets/candidate.png";
import employer from "@/assets/employer.png";

const CallToAction = () => {
  return (
    <section className="self-stretch bg-white flex flex-col sm:flex-row items-start justify-start py-24 px-5 lg:px-[200px] xl:px-[300px] box-border gap-6 max-w-full">
      <CTACard
        title="Become a Candidate"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus a dolor convallis efficitur."
        image={candidate}
      />
      <CTACard
        image={employer}
        title="Become an Employer"
        propColor="#fff"
        description="Cras in massa pellentesque, mollis ligula non, luctus dui. Morbi sed efficitur dolor. Pelque augue risus, aliqu."
      />
    </section>
  );
};

export default CallToAction;
