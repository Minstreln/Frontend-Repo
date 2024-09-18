// eslint-disable-next-line react/prop-types
const CategoryCard = ({ title, positions, icon }) => {
  return (
    <div className="flex-1 rounded-xl bg-white flex flex-row items-center justify-start p-6 box-border gap-4 min-w-[296px] hover:shadow-[0px_12px_48px_rgba(0,_44,_109,_0.1)] hover:rounded-xl group cursor-pointer">
      <div className="rounded-lg bg-[#E7F0FA] flex flex-row items-start justify-start p-5">
        <img
          className="h-8 w-8 relative overflow-hidden shrink-0 object-contain"
          loading="lazy"
          alt=""
          src={icon}
        />
      </div>
      <div className="flex-1 flex flex-col items-start justify-start gap-2">
        <div className="self-stretch relative leading-[28px] font-medium whitespace-nowrap group-hover:text-primary">
          {title}
        </div>
        <div className="self-stretch relative text-sm leading-[20px] text-gray-600 whitespace-nowrap">
          {positions.toLocaleString()} Open Positions
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
