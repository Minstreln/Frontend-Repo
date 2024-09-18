import { Button } from "../../ui/button";
import { ArrowRight } from "lucide-react";
import pen from "@/assets/pen.png";
import code from "@/assets/code.svg";
import megaphone from "@/assets/megaphone.svg";
import monitor from "@/assets/monitor.svg";
import music from "@/assets/music.svg";
import chart from "@/assets/chart.png";
import firstaidkit from "@/assets/firstaidkit.svg";
import database from "@/assets/database.svg";
import CategoryCard from "./CategoryCard";

const PopularCategory = () => {
  const categories = [
    { title: "Graphics & Design", positions: 357, icon: pen },
    { title: "Code & Programing", positions: 312, icon: code },
    { title: "Digital Marketing", positions: 297, icon: megaphone },
    { title: "Video & Animation", positions: 247, icon: monitor },
    { title: "Music & Audio", positions: 204, icon: music },
    { title: "Account & Finance", positions: 167, icon: chart },
    { title: "Health & Care", positions: 125, icon: firstaidkit },
  ];
  return (
    <section
      className={`self-stretch  bg-white flex flex-col items-center justify-start py-24 px-5 box-border gap-[50px] max-w-full text-justify text-gray-900 font-body-medium-400`}
    >
      <div className="max-w-7xl mx-auto container flex flex-row items-center justify-between gap-5 mq950:flex-wrap">
        <h1 className="text-inherit leading-[48px] font-medium font-[inherit] inline-block max-w-full text-4xl md:text-5xl">
          Popular category
        </h1>
        <Button className="text-primary" variant="outlined">
          View All{" "}
          <span>
            <ArrowRight className="h-4 w-6 mr-3 text-primary" />
          </span>
        </Button>
      </div>
      <div className="max-w-7xl mx-auto container flex flex-row items-start justify-start flex-wrap content-start gap-x-[23.3px] gap-y-6 min-h-[256px] text-left text-lg">
        {categories.map((category) => (
          <CategoryCard key={category.title} {...category} />
        ))}
        <div className="flex-1 hover:shadow-[0px_12px_48px_rgba(0,_44,_109,_0.1)] hover:rounded-xl flex flex-row items-center justify-start p-6 gap-4 min-w-[125px] group cursor-pointer">
          <div className="rounded-lg group-hover:bg-primary bg-primary/80 flex flex-row items-start justify-start p-[18px]">
            <img
              className="h-8 w-8 relative overflow-hidden shrink-0"
              alt=""
              src={database}
            />
          </div>
          <div className="flex-1 flex flex-col items-start justify-start gap-2">
            <div className="self-stretch relative leading-[28px] font-medium whitespace-nowrap group-hover:text-primary">
              Data & Science
            </div>
            <div className="self-stretch relative text-sm leading-[20px] text-gray-600 whitespace-nowrap">
              57 Open position
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularCategory;
