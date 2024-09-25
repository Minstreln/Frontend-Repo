import { useState } from "react";
import JobBenefits from "./JobBenefits";
import axios from "axios";
import toast from "react-hot-toast";

const PostJob = () => {
  const [tag, setTag] = useState([]);
  const[newTag, setNewTag] = useState("")
  const [requirements, setRequirements] = useState([]);
  const [newRequirement, setNewRequirement] = useState("");

  const [responsibility, setResponsiblity] = useState([]);
  const [newResponsibility, setNewResponsibility] = useState("");

  const [skillsAndQualifications, setSkillsAndQualifications] = useState([]);
  const [newSkills, setNewSkills] = useState("");

  const token = localStorage.getItem("token");

  const [values, setValues] = useState({
    position: "",
    hiringCompany: "",
    employmentType: "full-time",
    location: "india",
    minSalary: "",
    maxSalary: "",
    jobSetup: "on-site",
    positionLevel: "Entry level",
    yearsOfExperience: "",
    expirationDate: "",
    jobDescription: "",
    responsibility: ["Kniw Css", "Know JAvased"],
    skillsAndQualifications: ["Proficient in React", "Good Communciatim"],
  });

  //actual values that will be sent after integration with reuiremnt field and tag field
  let actualValues = {
    ...values,
    requirements,
    responsibility,
    skillsAndQualifications,
    tag,
  };
  const handleAddTag = ()=> {
    if(newTag ==""){
      return
    }
    setTag([...tag, newTag])
    setNewTag("")
  }

  //code to add requirement
  const handleAddRequirement = () => {
    if (newRequirement == "") {
      return;
    }
    setRequirements([...requirements, newRequirement]);
    setNewRequirement("");
  };

  const handleAddResponsibilty = () => {
    if (newResponsibility == "") {
      return;
    } else {
      setResponsiblity([...responsibility, newResponsibility]);
      setNewResponsibility("");
    }
  };

  const handleAddSkills = () => {
    if (newSkills == "") {
      return;
    }
    setSkillsAndQualifications([...skillsAndQualifications, newSkills]);
    setNewSkills("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    actualValues = {
      ...values,
      requirements,
      responsibility,
      skillsAndQualifications,
      tag,
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const url =
      "https://lysterpro-backend.onrender.com/api/v1/jobListing/add-joblisting";

    try {
      const res = await axios.post(url, actualValues, { headers });
      console.log("job added successfully");
      toast.success("Job added successfully!");
      return res.data;
    } catch (err) {
      throw new Error(err.response.data.message || "Registration failed");
    }
  };

  function handleInputChange(identifier, value) {
    setValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
  }
  return (
    <div>
      <div className="w-[800px] ">
        <h1 className="text-[22px] font-bold mb-10">Post a job</h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 mb-3">
            <label htmlFor="company">Hiring Company</label>
            <input
              type="text"
              id="company"
              className="border px-4 py-2 rounded-md"
              placeholder="Add Company"
              value={values.hiringCompany}
              onChange={() =>
                handleInputChange("hiringCompany", event.target.value)
              }
            />
          </div>

          <div className="flex flex-col gap-2 mb-3">
            <label htmlFor="jobTitle">Job Title</label>
            <input
              type="text"
              id="jobTitle"
              className="border px-4 py-2 rounded-md"
              placeholder="Add job title, role, vacancies etc"
              value={values.position}
              onChange={() => handleInputChange("position", event.target.value)}
            />
          </div>
          <div className="grid grid-cols-3 gap-2 mb-7">
            <div className="col-span-2 flex flex-col gap-2">
              <label htmlFor="keyword">Tags</label>
              <ul className="list-disc">
                  {tag.map((tags, index) => (
                    <li key={index}>{tags}</li>
                  ))}
                </ul>
              <div>
                <input
                  type="text"
                  id="keyword"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="border w-full mb-3 px-4 py-2 rounded-md"
                  placeholder="Eg. UI, UX, Web Dev"
                />
                <button
                  type="button"
                  className="text-white block bg-primary px-5 py-2 rounded"
                  onClick={handleAddTag}
                >
                  Add Tags
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="jobSetup">Job SetUp</label>
              <select
                name=""
                id="jobSetup"
                className="border px-4 py-2 rounded-md"
                value={values.jobSetup}
                onChange={() =>
                  handleInputChange("jobSetup", event.target.value)
                }
              >
                <option value="on-site">On-Site</option>
                <option value="remote">Remote</option>
              </select>
            </div>
          </div>

          <h2 className="font-semibold text-[18px] mb-4">Salary</h2>
          <div className="grid grid-cols-3 gap-2 mb-7">
            <div className="flex flex-col gap-2">
              <label htmlFor="minSalary">Min Salary [USD]</label>
              <input
                type="number"
                id="minSalary"
                className="border px-4 py-2 rounded-md"
                placeholder="Minimun Salary"
                value={values.minSalary}
                onChange={() =>
                  handleInputChange("minSalary", event.target.value)
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="maxSalary">Max Salary [USD]</label>
              <input
                type="number"
                id="maxSalary"
                className="border px-4 py-2 rounded-md"
                placeholder="Maximum Salary"
                value={values.maxSalary}
                onChange={() =>
                  handleInputChange("maxSalary", event.target.value)
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="salaryType">Salary Type</label>
              <select
                name=""
                id="salaryType"
                className="border px-4 py-2 rounded-md"
              >
                <option value="yearly">Yearly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>

          <h2 className="font-semibold text-[18px] mb-4">
            Advanced Information
          </h2>
          <div className="grid grid-cols-3 gap-3 gap-y-9 mb-7">
            <div className="flex flex-col gap-2">
              <label htmlFor="salaryType">Education</label>
              <select
                name=""
                id="education"
                className="border px-4 py-2 rounded-md"
              >
                <option value="graduate">Graduate</option>
                <option value="undergraduate">Undergraduate</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="experience">Experience</label>
              <input
                type="number"
                id="experience"
                className="border px-4 py-2 rounded-md"
                placeholder="Years of Experience"
                value={values.yearsOfExperience}
                onChange={() =>
                  handleInputChange("yearsOfExperience", event.target.value)
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="salaryType">Job Type</label>
              <select
                name=""
                id="jobType"
                className="border px-4 py-2 rounded-md"
                value={values.employmentType}
                onChange={() =>
                  handleInputChange("employmentType", event.target.value)
                }
              >
                <option value="full-time">Full-Time</option>
                <option value="part-time">Part-Time</option>
                <option value="intership">Intership</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="expireDate">Expiration Date</label>
              <input
                type="date"
                id="expierDate"
                className="border px-4 py-2 rounded-md"
                value={values.expirationDate}
                onChange={() =>
                  handleInputChange("expirationDate", event.target.value)
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="salaryType">Job Level</label>
              <select
                name=""
                id="jobLevel"
                className="border px-4 py-2 rounded-md"
                value={values.positionLevel}
                onChange={() =>
                  handleInputChange("positionLevel", event.target.value)
                }
              >
                <option value="Entry Level">Entry Level</option>
                <option value="Intermediate Level">Intermediate Level</option>
                <option value="Senior Level">Senior Level</option>
              </select>
            </div>
          </div>

          <div className="bg-gray-200 rounded-md px-8 py-5 mb-7">
            <h2 className="text-[18px] font-medium mb-4">Location</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="country">Country</label>
                <select
                  name=""
                  id="country"
                  className="border px-4 py-2 rounded-md"
                  value={values.location}
                  onChange={() =>
                    handleInputChange("location", event.target.value)
                  }
                >
                  <option value="India">India</option>
                  <option value="England">England</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="salaryType">City</label>
                <select
                  name=""
                  id="city"
                  className="border px-4 py-2 rounded-md"
                >
                  <option value="Entry Level">Bangladesh</option>
                </select>
              </div>
            </div>
          </div>

          <h2 className="mb-4 font-semibold text-[18px]">Job Benefits</h2>
          <div className="mb-7">
            <JobBenefits />
          </div>

          <div className="mb-10">
            <h1 className="mb-4 font-semibold text-[18px]">Job Description</h1>
            <textarea
              className="w-full rounded border px-4 py-2 h-[200px]"
              value={values.jobDescription}
              onChange={() =>
                handleInputChange("jobDescription", event.target.value)
              }
              name=""
              id=""
            ></textarea>
          </div>

          <div className="mb-10">
            <label htmlFor="requirement" className="mb-3">
              Job Requirements:
            </label>
            <ul className="list-disc">
              {requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
            <input
              type="text"
              value={newRequirement}
              id="requirement"
              className="border px-4 py-2 rounded-md w-full mb-3"
              onChange={(e) => setNewRequirement(e.target.value)}
              placeholder="Add requirement"
            />
            <button
              type="button"
              className="text-white block bg-primary px-5 py-2 rounded"
              onClick={handleAddRequirement}
            >
              Add Requirement
            </button>
          </div>

          <div className="mb-10">
            <label htmlFor="responsibility" className="mb-3">
              Job Requirements:
            </label>
            <ul className="list-disc">
              {responsibility.map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))}
            </ul>
            <input
              type="text"
              value={newResponsibility}
              id="responsibility"
              className="border px-4 py-2 rounded-md w-full mb-3"
              onChange={(e) => setNewResponsibility(e.target.value)}
              placeholder="Add responsibity"
            />
            <button
              type="button"
              className="text-white block bg-primary px-5 py-2 rounded"
              onClick={handleAddResponsibilty}
            >
              Add Responsibility
            </button>
          </div>

          <div className="mb-10">
            <label htmlFor="skills" className="mb-3">
              Job Requirements:
            </label>
            <ul className="list-disc">
              {skillsAndQualifications.map((skills, index) => (
                <li key={index}>{skills}</li>
              ))}
            </ul>
            <input
              type="text"
              value={newSkills}
              id="skills"
              className="border px-4 py-2 rounded-md w-full mb-3"
              onChange={(e) => setNewSkills(e.target.value)}
              placeholder="Add Skills and Qualifications"
            />
            <button
              type="button"
              className="text-white block bg-primary px-5 py-2 rounded"
              onClick={handleAddSkills}
            >
              Add Skills
            </button>
          </div>

          <button className="text-white block bg-primary px-5 py-2 rounded">
            Post a Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
