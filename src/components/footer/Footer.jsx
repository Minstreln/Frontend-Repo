import {
  ArrowRight,
  Facebook,
  Instagram,
  Twitter,
  YoutubeIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-[#18191C] flex-1 text-sm text-[#767F8C]">
      <div className="wrapper py-16 flex flex-col sm:flex-row justify-between gap-8">
        <div className="flex flex-col space-y-2 flex-1">
          <Link to={"/"}>
            <h1 className="text-lg font-semibold bg-gradient-to-r to-primary from-gray-100 bg-clip-text text-transparent">
              LysterPro
            </h1>
          </Link>
          <p>
            Call now: <span className="text-white"> (319) 555-0115</span>
          </p>
          <p className="max-w-[300px]">
            6391 Elgin St. Celina, Delaware 10299, New York, United States of
            America
          </p>
        </div>
        <div className="flex flex-1 sm:flex-[2]">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 justify-end w-full">
            <div className="flex flex-col space-y-4 items-start">
              <h3 className="text-white font-semibold">Quick Link</h3>
              <ul className="flex flex-col space-y-2">
                <li className="flex items-center flex-row gap-1 hover:text-white cursor-pointer group transition min-w-40">
                  <ArrowRight className="h-4 w-4 hidden group-hover:block" />{" "}
                  <span>About</span>
                </li>
                <li className="flex items-center flex-row gap-1 hover:text-white cursor-pointer group transition min-w-40">
                  <ArrowRight className="h-4 w-4 hidden group-hover:block" />{" "}
                  <span>Contact</span>
                </li>
                <li className="flex items-center flex-row gap-1 hover:text-white cursor-pointer group transition min-w-40">
                  <ArrowRight className="h-4 w-4 hidden group-hover:block" />{" "}
                  <span>Pricing</span>
                </li>
                <li className="flex items-center flex-row gap-1 hover:text-white cursor-pointer group transition min-w-40">
                  <ArrowRight className="h-4 w-4 hidden group-hover:block" />{" "}
                  <span>Blog</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col space-y-4">
              <h3 className="text-white font-semibold">Candidate</h3>
              <ul className="flex flex-col space-y-2">
                <li className="flex items-center flex-row gap-1 hover:text-white cursor-pointer group transition min-w-40">
                  <ArrowRight className="h-4 w-4 hidden group-hover:block" />{" "}
                  <span>Browse Jobs</span>
                </li>
                <li className="flex items-center flex-row gap-1 hover:text-white cursor-pointer group transition min-w-40">
                  <ArrowRight className="h-4 w-4 hidden group-hover:block" />{" "}
                  <span>Browse Employers</span>
                </li>
                <li className="flex items-center flex-row gap-1 hover:text-white cursor-pointer group transition min-w-40">
                  <ArrowRight className="h-4 w-4 hidden group-hover:block" />{" "}
                  <span>Candidate Dashboard</span>
                </li>
                <li className="flex items-center flex-row gap-1 hover:text-white cursor-pointer group transition min-w-40">
                  <ArrowRight className="h-4 w-4 hidden group-hover:block" />{" "}
                  <span>Saved Jobs</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col space-y-4">
              <h3 className="text-white font-semibold">Employers</h3>
              <ul className="flex flex-col space-y-2">
                <li className="flex items-center flex-row gap-1 hover:text-white cursor-pointer group transition min-w-40">
                  <ArrowRight className="h-4 w-4 hidden group-hover:block" />{" "}
                  <span>Post a Job</span>
                </li>
                <li className="flex items-center flex-row gap-1 hover:text-white cursor-pointer group transition min-w-40">
                  <ArrowRight className="h-4 w-4 hidden group-hover:block" />{" "}
                  <span>Browse Candidates</span>
                </li>
                <li className="flex items-center flex-row gap-1 hover:text-white cursor-pointer group transition min-w-40">
                  <ArrowRight className="h-4 w-4 hidden group-hover:block" />{" "}
                  <span>Employers Dashboard</span>
                </li>
                <li className="flex items-center flex-row gap-1 hover:text-white cursor-pointer group transition min-w-40">
                  <ArrowRight className="h-4 w-4 hidden group-hover:block" />{" "}
                  <span>Applications</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col space-y-4">
              <h3 className="text-white font-semibold">Support</h3>
              <ul className="flex flex-col space-y-2">
                <li className="flex items-center flex-row gap-1 hover:text-white cursor-pointer group transition min-w-40">
                  <ArrowRight className="h-4 w-4 hidden group-hover:block" />{" "}
                  <span>Faqs</span>
                </li>
                <li className="flex items-center flex-row gap-1 hover:text-white cursor-pointer group transition min-w-40">
                  <ArrowRight className="h-4 w-4 hidden group-hover:block" />{" "}
                  <span>Privacy Policy</span>
                </li>
                <li className="flex items-center flex-row gap-1 hover:text-white cursor-pointer group transition min-w-40">
                  <ArrowRight className="h-4 w-4 hidden group-hover:block" />{" "}
                  <span>Terms & Conditions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="py-4 border-t border-t-[#767F8C]">
        <div className="wrapper">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between text-sm text-[#767F8C]">
            <p>@ 2021 Jobpilot - Job Portal. All rights Rserved</p>
            <div className="flex flex-row items-center gap-4">
              <Facebook
                size={15}
                className="hover:text-primary cursor-pointer"
              />

              <YoutubeIcon
                size={15}
                className="hover:text-primary cursor-pointer"
              />

              <Instagram
                size={15}
                className="hover:text-primary cursor-pointer"
              />

              <Twitter
                size={15}
                className="hover:text-primary cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
