import CompanyCard from "./CompanyCard";

const TopCompanies = () => {
  return (
    <section
      className={`self-stretch bg-white flex flex-col items-start justify-start pt-24 lg:pt-0 pb-24 gap-12 max-w-full text-left text-gray-900`}
    >
      <div className="wrapper w-full">
        <h1 className="text-left leading-[48px] font-medium font-[inherit] inline-block text-4xl md:text-5xl w-full">
          Top companies
        </h1>
      </div>
      <div className="wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start justify-start content-start gap-x-5 gap-y-6 min-h-[368px] text-lg text-gray-900">
        <CompanyCard />
        <CompanyCard />
        <CompanyCard />
        <CompanyCard />
        <CompanyCard />
        <CompanyCard />
      </div>
    </section>
  );
};

export default TopCompanies;
