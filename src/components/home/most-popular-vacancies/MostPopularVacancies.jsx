// eslint-disable-next-line react/prop-types
const VacancyItem = ({ title, positions }) => (
  <div className="w-full p-4">
    <h3 className="text-lg font-medium leading-7 hover:text-primary hover:underline text-gray-900 cursor-pointer">
      {title}
    </h3>
    <p className="text-sm leading-5 text-gray-500">
      {positions.toLocaleString()} Open Positions
    </p>
  </div>
);

const MostPopularVacancies = () => {
  const vacancies = [
    { title: "Anesthesiologists", positions: 45904 },
    { title: "Surgeons", positions: 50364 },
    { title: "Obstetricians-Gynecologists", positions: 4339 },
    { title: "Orthodontists", positions: 20079 },
    { title: "Maxillofacial Surgeons", positions: 74875 },
    { title: "Software Developer", positions: 43359 },
    { title: "Psychiatrists", positions: 18599 },
    { title: "Data Scientist", positions: 28200, isHighlighted: true },
    { title: "Financial Manager", positions: 61391 },
    { title: "Management Analysis", positions: 93046 },
    { title: "IT Manager", positions: 50963 },
    { title: "Operations Research Analysis", positions: 16627 },
  ];

  return (
    <section className="w-full bg-gray-50 py-24 border-t border-gray-200">
      <div className="wrapper flex flex-col items-center gap-10">
        <h1 className="text-4xl md:text-5xl font-medium text-gray-900 w-full">
          Most Popular Vacancies
        </h1>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start justify-start">
          {vacancies.map((vacancy, index) => (
            <VacancyItem
              key={index}
              title={vacancy.title}
              positions={vacancy.positions}
              isHighlighted={vacancy.isHighlighted}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostPopularVacancies;
