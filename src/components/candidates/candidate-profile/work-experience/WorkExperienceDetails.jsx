/* eslint-disable react/prop-types */

import { BriefcaseBusiness, RefreshCw, Trash2 } from "lucide-react";
import { Button } from "../../../ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import EditWorkExperienceDetails from "./EditWorkExperienceDetails";

const WorkExperienceDetails = ({
  workExperience,
  refetch,
  deleteWorkExperience,
}) => {
  return (
    <Card className="w-full shadow-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <Button
          variant="default"
          size="sm"
          onClick={() => refetch()}
          className="hidden lg:block"
        >
          <RefreshCw className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent>
        {workExperience.length === 0 ? (
          <div className="text-center text-destructive">
            No Work Experience Details
          </div>
        ) : (
          workExperience.map((detail) => (
            <div key={detail._id} className="mb-4 p-4 border rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex flex-row gap-5">
                  <span className="bg-primary/10 p-2 rounded flex items-center justify-center">
                    <BriefcaseBusiness className="h-10 w-10 text-primary" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      {detail.role}
                    </h3>
                    <span className="text-sm text-gray-600">
                      {detail.company} - {detail.typeOfRole}
                    </span>
                  </div>
                </div>
                <div className="flex flex-row items-center">
                  <EditWorkExperienceDetails
                    refetch={refetch}
                    detail={detail}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteWorkExperience(detail._id)}
                  >
                    <Trash2 className="h-5 w-5 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default WorkExperienceDetails;
