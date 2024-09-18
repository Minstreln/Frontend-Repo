import Slider from "../../Slider";

const Testimonials = () => {
  return (
    <section className="bg-[#F1F2F4] w-full">
      <div className="wrapper flex flex-col items-center justify-center py-24 pb-24 gap-12">
        <h1 className="leading-[48px] font-medium text-4xl md:text-5xl text-gray-900">
          Clients Testimonial
        </h1>
        <div className="w-full">
          <Slider />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
