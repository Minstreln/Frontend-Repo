import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { User2 } from "lucide-react";
import { cn } from "../../../lib/utils";
import CompanyDetails from "./company-details/CompanyDetails";
import PersonalDetails from "./personal-details/PersonalDetails";

const EmployerProfile = () => {
  const [activeTab, setActiveTab] = useState("company");

  return (
    <div className="w-full flex flex-col gap-8">
      <h2 className="text-lg text-gray-800 font-semibold">
        Employer Profile Settings
      </h2>
      <Tabs defaultValue="company" className="w-full">
        <TabsList className="w-full bg-white grid grid-cols-2 sm:grid-cols-4">
          <TabsTrigger
            value="company"
            onClick={() => setActiveTab("company")}
            className={cn(
              "py-1 mb-2 font-medium border-b-2 border-b-white !rounded-none !shadow-none transition-colors flex-grow sm:flex-grow-0",
              "text-sm sm:text-base",
              activeTab === "company"
                ? "!text-primary border-b-primary"
                : "bg-white text-gray-600 hover:text-primary"
            )}
          >
            <User2 className="mr-2 h-5 w-5" /> Company Info
          </TabsTrigger>
          <TabsTrigger
            value="personal"
            onClick={() => setActiveTab("personal")}
            className={cn(
              "py-1 mb-2 font-medium border-b-2 border-b-white !rounded-none !shadow-none transition-colors flex-grow sm:flex-grow-0",
              "text-sm sm:text-base",
              activeTab === "personal"
                ? "!text-primary border-b-primary"
                : "bg-white text-gray-600 hover:text-primary"
            )}
          >
            <User2 className="mr-2 h-5 w-5" /> Personal Details
          </TabsTrigger>
        </TabsList>
        <TabsContent value="company" className="w-full mt-12 sm:mt-8">
          <CompanyDetails />
        </TabsContent>
        <TabsContent value="personal" className="w-full mt-12 sm:mt-8">
          <PersonalDetails />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployerProfile;
