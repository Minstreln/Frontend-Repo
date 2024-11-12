import { useEffect, useState } from "react";
import JobBenefits from "../JobBenefits";
import axios from "axios";
import toast from "react-hot-toast";
import { usePostJob } from "../../../hooks/useJobs";

const PostJob = () => {
  const [tag, setTag] = useState([]);
  const [newTag, setNewTag] = useState("");

  const [requirements, setRequirements] = useState([]);
  const [newRequirement, setNewRequirement] = useState("");

  const [responsibility, setResponsiblity] = useState([]);
  const [newResponsibility, setNewResponsibility] = useState("");

  const [skillsAndQualifications, setSkillsAndQualifications] = useState([]);
  const [newSkills, setNewSkills] = useState("");

  const [categoryValue, setCategoryValue] = useState(1);
  const [category, setCategory] = useState(""); // value that will be sent to backend

  const postJobMutation = usePostJob();

  const [values, setValues] = useState({
    position: "",
    hiringCompany: "",
    employmentType: "full-time",
    location: "india",
    city: "Bangladesh",
    minSalary: "",
    maxSalary: "",
    salaryType: "Yearly",
    jobSetup: "on-site",
    positionLevel: "Entry level",
    yearsOfExperience: "",
    expirationDate: "",
    jobDescription: "",
    education: "graduate",
  });

  //actual values that will be sent after integration with reuiremnt field and tag field
  let actualValues = {
    ...values,
    requirements,
    responsibility,
    skillsAndQualifications,
    tag,
    category,
  };
  const handleAddTag = () => {
    if (newTag == "") {
      return;
    }
    setTag([...tag, newTag]);
    setNewTag("");
  };

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
      category,
    };

    try {
      await postJobMutation.mutateAsync(actualValues);
      if (postJobMutation.isSuccess) {
        toast.success("Job added successfully!");
        setValues({
          position: "",
          hiringCompany: "",
          employmentType: "full-time",
          location: "india",
          city: "Bangladesh",
          salaryType: "Yearly",
          minSalary: "",
          maxSalary: "",
          jobSetup: "on-site",
          positionLevel: "Entry level",
          yearsOfExperience: "",
          expirationDate: "",
          jobDescription: "",
          education: "graduate",
        });
        setRequirements([]);
        setResponsiblity([]);
        setSkillsAndQualifications([]);
        setTag([]);
      }
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

  //code to switch category value
  const handleCategory = async (e) => {
    let value = e.target.value;
    setCategoryValue(value);
    await getCategory(categoryValue);
  };

  //code to set category to the first by default
  useEffect(() => {
    getCategory(1);
  }, []);

  //code to get category
  const getCategory = async (id) => {
    try {
      const res = await axios.get(
        "https://lysterpro-backend.onrender.com/api/v1/category/get-all-categories"
      );

      setCategory(res.data.data.data[id]._id);
      return res.data;
    } catch (err) {
      throw new Error(err.response.data.message || "Couldn't get category");
    }
  };

  return (
    <div>
      <div className="lg:w-[750px] w-full sm:px-5 px-2 ">
        <h1 className="text-[22px] font-bold mb-10">Post a job</h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 mb-3">
            <label htmlFor="company">Hiring Company</label>
            <input
              type="text"
              id="company"
              required
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
              required
              className="border px-4 py-2 rounded-md"
              placeholder="Add job title, role, vacancies etc"
              value={values.position}
              onChange={() => handleInputChange("position", event.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              className="border px-4 py-2 rounded-md"
              onChange={handleCategory}
            >
              <option value={1}>Chep</option>
              <option value={2}>Programming</option>
              <option value={3}>Teaching</option>
              <option value={4}>Experts</option>
              <option value={5}>Marketing</option>
              <option value={6}>Design</option>
            </select>
          </div>

          <div className="grid md:grid-cols-3 grid-cols-2 md:gap-2 gap-5 mb-7">
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
                required
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
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 mb-7">
            <div className="flex flex-col gap-2">
              <label htmlFor="minSalary">Min Salary [USD]</label>
              <input
                type="number"
                id="minSalary"
                required
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
                required
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
                value={values.salaryType}
                onChange={() =>
                  handleInputChange("salaryType", event.target.value)
                }
              >
                <option value="Yearly">Yearly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
          </div>

          <h2 className="font-semibold text-[18px] mb-4">
            Advanced Information
          </h2>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 md:gap-y-6 mb-7">
            <div className="flex flex-col gap-2">
              <label htmlFor="salaryType">Education</label>
              <select
                name=""
                id="education"
                value={values.education}
                onChange={() =>
                  handleInputChange("education", event.target.value)
                }
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
                required
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
                required
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
                required
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
                required
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

          <div className="bg-gray-200 rounded-md sm:px-8 px-4 sm:py-5 py-3 mb-7">
            <h2 className="text-[18px] font-medium mb-4">Location</h2>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-3">
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
                  value={values.city}
                  onChange={() => handleInputChange("city", event.target.value)}
                  className="border px-4 py-2 rounded-md"
                >
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Washington">Washington</option>
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
              required
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
              className="text-white block bg-primary sm:px-5 px-3 sm:text-base text-[14px] py-2 rounded"
              onClick={handleAddRequirement}
            >
              Add Requirement
            </button>
          </div>

          <div className="mb-10">
            <label htmlFor="responsibility" className="mb-3">
              Job Requirements:
            </label>
            <ul className="list-disc mt-3">
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
              className="text-white block bg-primary sm:px-5 px-3 sm:text-base text-[14px] py-2 rounded"
              onClick={handleAddResponsibilty}
            >
              Add Responsibility
            </button>
          </div>

          <div className="mb-10">
            <label htmlFor="skills" className="mb-3">
              Skills and Qualifications:
            </label>
            <ul className="list-disc mt-3">
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
              className="text-white block bg-primary sm:px-5 px-3 sm:text-base text-[14px] py-2 rounded"
              onClick={handleAddSkills}
            >
              Add Skills
            </button>
          </div>

          <button className="text-white block bg-primary sm:px-5 px-3 sm:text-base text-[14px py-2 rounded">
            Post a Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
