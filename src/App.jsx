import CallToAction from "./components/home/call-to-action/CallToAction";
import FeaturedJob from "./components/home/featured-job/FeaturedJob";
import HeroSection from "./components/home/hero-section/HeroSection";
import HowItWorks from "./components/home/how-it-works/HowItWorks";
import MostPopularVacancies from "./components/home/most-popular-vacancies/MostPopularVacancies";
import PopularCategory from "./components/home/popular-category/PopularCategory";
import Testimonials from "./components/home/testimonial/Testimonials";
import TopCompanies from "./components/home/top-companies/TopCompanies";

function App() {
  return (
    <>
      <HeroSection />
      <MostPopularVacancies />
      <HowItWorks />
      <PopularCategory />
      <FeaturedJob />
      <TopCompanies />
      <Testimonials />
      <CallToAction />
    </>
  );
}

export default App;
