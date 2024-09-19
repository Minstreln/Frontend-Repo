/* eslint-disable react/prop-types */

import google from "@/assets/google.svg";
import bookmark2 from "@/assets/bookmark2.png";
import jobLocation from "@/assets/jobLocation.png";
import { Button } from "../ui/button";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  Clock,
  Facebook,
  GraduationCap,
  Layers,
  LinkIcon,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";
import jobs from "../../lib/jobs";
import JobCard from "../home/featured-job/JobCard";
import { Link } from "react-router-dom";

const JobDetails = ({ job }) => {
  return (
    <div className="wrapper w-full flex flex-col gap-5 py-12">
      <div className="w-full flex flex-col sm:flex-row items-start lg:items-center justify-between pb-4 gap-4">
        <div className="flex flex-row items-center justify-start gap-4">
          <div className="rounded bg-primary/10 flex flex-row items-start justify-start p-3">
            <img
              className="h-12 w-12 relative overflow-hidden"
              alt=""
              src={google}
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-2">
            <h1 className="text-gray-900 leading-[24px] text-xl">
              {job.title}
            </h1>
            <div className="self-stretch flex flex-row items-start justify-start gap-2 text-sm">
              <span className="text-gray-400">at Google Inc.</span>
              <span className="text-white inline-block px-3 py-1 bg-[#0BA02C] rounded font-bold uppercase">
                {job.jobType}
              </span>
              <span className="hidden sm:inline-block text-[#E05151] bg-destructive/10 px-4 py-1 rounded-full">
                Featured
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-end gap-2">
          <div className="rounded bg-primary/10 flex flex-row items-start justify-start p-3">
            <img
              className="h-6 w-6 relative overflow-hidden"
              alt=""
              src={bookmark2}
            />
          </div>
          <Button
            className="text-white bg-primary font-semibold"
            variant="contained"
            size="lg"
          >
            Apply Now <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
      <div className="w-full flex flex-col gap-5 sm:flex-row">
        <div className="sm:flex-[2] flex flex-col gap-3 text-gray-400 leading-[24px] text-lg">
          <p className="text-gray-900  font-medium pb-2">Job Description</p>
          <p>
            Velstar is a Shopify Plus agency, and we partner with brands to help
            them grow, we also do the same with our people!
          </p>
          <p>
            Here at Velstar, we don&apos;t just make websites, we create
            exceptional digital experiences that consumers love. Our team of
            designers, developers, strategists, and creators work together to
            push brands to the next level. From Platform Migration, User
            Experience & User Interface Design, to Digital Marketing, we have a
            proven track record in delivering outstanding eCommerce solutions
            and driving sales for our clients.
          </p>
          <p>
            The role will involve translating project specifications into clean,
            test-driven, easily maintainable code. You will work with the
            Project and Development teams as well as with the Technical
            Director, adhering closely to project plans and delivering work that
            meets functional & non-functional requirements. You will have the
            opportunity to create new, innovative, secure and scalable features
            for our clients on the Shopify platform.
          </p>
          <p>Want to work with us? You&apos;re in good company!</p>
          <p className="text-gray-900  font-medium pb-2">Requirements</p>
          <ol className="list-disc pl-8 flex flex-col gap-2">
            <li>
              Great troubleshooting and analytical skills combined with the
              desire to tackle challenges head-on
            </li>
            <li>
              3+ years of experience in back-end development working either with
              multiple smaller projects simultaneously or large-scale
              applications
            </li>
            <li>
              Experience with HTML, JavaScript, CSS, PHP, Symphony and/or
              Laravel
            </li>
            <li>
              Working regularly with APIs and Web Services (REST, GrapthQL,
              SOAP, etc)
            </li>
            <li>
              Have experience/awareness in Agile application development,
              commercial off-the-shelf software, middleware, servers and
              storage, and database management.
            </li>
            <li>
              Familiarity with version control and project management systems
              (e.g., Github, Jira)
            </li>
            <li>
              Great troubleshooting and analytical skills combined with the
              desire to tackle challenges head-on
            </li>
            <li>
              Ambitious and hungry to grow your career in a fast-growing agency
            </li>
          </ol>
          <p className="text-gray-900  font-medium pb-2">Desirable:</p>
          <ol className="list-disc pl-8 flex flex-col gap-2">
            <li>
              Working knowledge of eCommerce platforms, ideally Shopify but also
              others e.g. Magento, WooCommerce, Visualsoft to enable seamless
              migrations.
            </li>
            <li>Working knowledge of payment gateways</li>
            <li>API platform experience / Building restful APIs</li>
          </ol>
          <p className="text-gray-900  font-medium pb-2">Benefits</p>
          <ol className="list-disc pl-8 flex flex-col gap-2">
            <li>
              Early finish on Fridays for our end of week catch up (4:30 finish,
              and drink of your choice from the bar)
            </li>
            <li>
              28 days holiday (including bank holidays) rising by 1 day per year
              PLUS an additional day off on your birthday
            </li>
            <li>Generous annual bonus.</li>
            <li>Healthcare package</li>
            <li>
              Paid community days to volunteer for a charity of your choice
            </li>
            <li>
              £100 contribution for your own personal learning and development
            </li>
            <li>Free Breakfast on Mondays and free snacks in the office</li>
            <li>
              Access to Perkbox with numerous discounts plus free points from
              the company to spend as you wish.
            </li>
            <li>Cycle 2 Work Scheme</li>
            <li>Brand new MacBook Pro</li>
            <li>
              Joining an agency on the cusp of exponential growth and being part
              of this exciting story.
            </li>
          </ol>
        </div>
        <div className="flex-1 flex flex-col gap-5">
          <div className="w-full flex flex-row gap-4 items-center justify-between border border-gray-200 p-5 rounded-lg text-center">
            <div className="flex flex-col items-center justify-center gap-1 text-gray-600">
              <span className="text-gray-900 font-semibold">Salary(USD)</span>
              <span className="text-[#0BA02C] font-semibold text-lg">
                $100,000 - $120,000
              </span>
              <span className="text-sm">Yearly salary</span>
            </div>
            <div className="w-[2px] h-20 bg-gray-200" />
            <div className="flex flex-col items-center justify-center gap-1 text-gray-600">
              <img className="h-10 w-10 relative" alt="" src={jobLocation} />
              <span className="text-gray-900 font-semibold">Job Location</span>
              <span>Dhaka, Bangladesh</span>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4 border border-gray-200 p-5 rounded-lg">
            <span className="text-gray-900 font-semibold text-lg">
              Job Benefits
            </span>
            <div className="flex flex-wrap gap-3">
              <span className="leading-[12px] whitespace-nowrap font-semibold bg-[#E7F6EA] text-[#0BA02C] px-1 sm:px-2 py-1 rounded text-xs sm:text-sm">
                401K Salary
              </span>
              <span className="leading-[12px] whitespace-nowrap font-semibold bg-[#E7F6EA] text-[#0BA02C] px-1 sm:px-2 py-1 rounded text-xs sm:text-sm">
                Async
              </span>
              <span className="leading-[12px] whitespace-nowrap font-semibold bg-[#E7F6EA] text-[#0BA02C] px-1 sm:px-2 py-1 rounded text-xs sm:text-sm">
                Learning budget
              </span>
              <span className="leading-[12px] whitespace-nowrap font-semibold bg-[#E7F6EA] text-[#0BA02C] px-1 sm:px-2 py-1 rounded text-xs sm:text-sm">
                Vision insurance
              </span>
              <span className="leading-[12px] whitespace-nowrap font-semibold bg-[#E7F6EA] text-[#0BA02C] px-1 sm:px-2 py-1 rounded text-xs sm:text-sm">
                4 day work week
              </span>
              <span className="leading-[12px] whitespace-nowrap font-semibold bg-[#E7F6EA] text-[#0BA02C] px-1 sm:px-2 py-1 rounded text-xs sm:text-sm">
                Profit sharing
              </span>
              <span className="leading-[12px] whitespace-nowrap font-semibold bg-[#E7F6EA] text-[#0BA02C] px-1 sm:px-2 py-1 rounded text-xs sm:text-sm">
                Free gym membership
              </span>
              <span className="leading-[12px] whitespace-nowrap font-semibold bg-[#E7F6EA] text-[#0BA02C] px-1 sm:px-2 py-1 rounded text-xs sm:text-sm">
                Equity compensation
              </span>
              <span className="leading-[12px] whitespace-nowrap font-semibold bg-[#E7F6EA] text-[#0BA02C] px-1 sm:px-2 py-1 rounded text-xs sm:text-sm">
                No politics at work
              </span>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4 border border-gray-200 rounded-lg">
            <div className="w-full flex flex-col gap-5 p-5">
              <h2 className="text-gray-900 font-semibold text-lg">
                Job Overview
              </h2>
              <div className="w-full grid grid-cols-3 gap-x-2 gap-y-5">
                <div className="flex flex-col gap-4">
                  <Calendar className="w-8 h-8 text-primary" />
                  <div className="flex flex-col gap-2">
                    <span className="text-gray-400 font-light text-sm">
                      JOB POSTED:
                    </span>
                    <span className="text-gray-900 font-medium">
                      14 Jun, 2021
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <Clock className="w-8 h-8 text-primary" />
                  <div className="flex flex-col gap-2">
                    <span className="text-gray-400 font-light text-sm">
                      JOB EXPIRE IN:
                    </span>
                    <span className="text-gray-900 font-medium">
                      14 Aug, 2021
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <Layers className="w-8 h-8 text-primary" />
                  <div className="flex flex-col gap-2">
                    <span className="text-gray-400 font-light text-sm">
                      JOB LEVEL:
                    </span>
                    <span className="text-gray-900 font-medium">
                      Entry Level
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <Briefcase className="w-8 h-8 text-primary" />
                  <div className="flex flex-col gap-2">
                    <span className="text-gray-400 font-light text-sm">
                      EXPERIENCE
                    </span>
                    <span className="text-gray-900 font-medium">
                      $50k-80k/month
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <GraduationCap className="w-8 h-8 text-primary" />
                  <div className="flex flex-col gap-2">
                    <span className="text-gray-400 font-light text-sm">
                      EDUCATION
                    </span>
                    <span className="text-gray-900 font-medium">
                      Graduation
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[1px] w-full bg-gray-200" />
            <div className="flex flex-col gap-3 px-5">
              <h3 className="text-gray-900 font-semibold text-lg">
                Share this job:
              </h3>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  className="w-full bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary font-medium"
                >
                  <LinkIcon className="mr-2 h-5 w-5" />
                  Copy Link
                </Button>
                <div className="flex space-x-2 mb-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-primary/10 text-primary hover:bg-primary hover:text-white group"
                  >
                    <Linkedin className="w-5 h-5 group-hover:fill-white" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-primary/10 text-primary hover:bg-primary hover:text-white group"
                  >
                    <Facebook className="w-5 h-5 group-hover:fill-white" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-primary/10 text-primary hover:bg-primary hover:text-white group"
                  >
                    <Twitter className="w-5 h-5 group-hover:fill-white" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-primary/10 text-primary hover:bg-primary hover:text-white group"
                  >
                    <Mail className="w-5 h-5 group-hover:fill-white" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 px-5">
              <h3 className="text-gray-900 font-semibold text-lg">Job tags:</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" size="sm">
                  Back-end
                </Button>
                <Button variant="secondary" size="sm">
                  PHP
                </Button>
                <Button variant="secondary" size="sm">
                  Laravel
                </Button>
                <Button variant="secondary" size="sm">
                  Development
                </Button>
                <Button variant="secondary" size="sm">
                  Front-end
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/** Related jobs */}
      <div className="w-full wrapper py-12">
        <h3 className="text-inherit leading-[48px] font-medium font-[inherit] inline-block max-w-full text-4xl pb-8">
          Related Jobs
        </h3>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start justify-start content-start gap-x-5 gap-y-6 text-left text-lg text-gray-900">
          {jobs.slice(0, 6).map((jobItem) => (
            <Link key={jobItem.id} to={`/find-job/${jobItem.id}`}>
              <JobCard {...jobItem} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
