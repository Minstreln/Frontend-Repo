import { Globe, Settings, User2, UserCircle } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useState } from "react";
const CandidateSettings = () => {
  const [activeTab, setActiveTab] = useState("personal");
  return (
    <div className="w-full flex flex-col gap-5">
      <h2 className="text-lg text-gray-800 font-semibold">Settings</h2>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="w-fit bg-white">
          <TabsTrigger
            value="personal"
            onClick={() => setActiveTab("personal")}
            className={`px-4 py-2 mb-5 font-medium border-b-2 border-b-white !shadow-none transition-colors text-lg ${
              activeTab === "personal"
                ? "!text-primary border-b-primary"
                : "bg-white text-gray-600"
            }`}
          >
            <User2 className="mr-2 h-5 w-5" /> Personal
          </TabsTrigger>
          <TabsTrigger
            value="profile"
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 mb-5 font-medium border-b-2 border-b-white shadow-none transition-colors text-lg ${
              activeTab === "profile"
                ? "!text-primary border-b-primary"
                : "bg-white text-gray-600"
            }`}
          >
            <UserCircle className="mr-2 h-5 w-5" /> Profile
          </TabsTrigger>
          <TabsTrigger
            value="social"
            onClick={() => setActiveTab("social")}
            className={`px-4 py-2 mb-5 font-medium border-b-2 border-b-white shadow-none transition-colors text-lg ${
              activeTab === "social"
                ? "!text-primary border-b-primary"
                : "bg-white text-gray-600"
            }`}
          >
            <Globe className="mr-2 h-5 w-5" />
            Social Links
          </TabsTrigger>
          <TabsTrigger
            value="account"
            onClick={() => setActiveTab("account")}
            className={`px-4 py-2 mb-5 font-medium border-b-2 border-b-white shadow-none transition-colors text-lg ${
              activeTab === "account"
                ? "!text-primary border-b-primary"
                : "bg-white text-gray-600"
            }`}
          >
            <Settings className="mr-2 h-5 w-5" />
            Account Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
          <div className="py-5">
            <h3>Basic Information</h3>
          </div>
        </TabsContent>
        <TabsContent value="profile">
          <div className="py-5">
            <h3>Profile</h3>
          </div>
        </TabsContent>
        <TabsContent value="social">
          <div className="py-5">
            <h3>Social Links</h3>
          </div>
        </TabsContent>
        <TabsContent value="account">
          <div className="py-5">
            <h3>Account Settings</h3>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CandidateSettings;
