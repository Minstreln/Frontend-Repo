import { BriefcaseBusiness, Trash2 } from "lucide-react";
import { Button } from "../../../ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import EditWorkExperienceDetails from "./EditWorkExperienceDetails";
import {
  useDeleteWorkExperience,
  useFetchWorkExperience,
} from "../../../../hooks/useCandidateWorkExperience";
import Loading from "../../../Loading";
import toast from "react-hot-toast";
import WorkExperienceForm from "./WorkExperienceForm";

const WorkExperienceDetails = () => {
  const {
    data: workExperiences,
    isLoading,
    isError,
    error,
  } = useFetchWorkExperience();
  const deleteWorkExperienceMutation = useDeleteWorkExperience();

  if (isLoading) {
    return (
      <div className="py-6">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full flex items-center text-red-500 font-semibold py-6">
        Error: {error.message}
      </div>
    );
  }

  const handleDeleteWorkExperience = async (id) => {
    try {
      await deleteWorkExperienceMutation.mutateAsync(id);
      toast.success("Work Experience deleted successfully");
    } catch (error) {
      toast.error(error.message);
      console.error("Error deleting work experience:", error);
    }
  };

  return (
    <Card className="w-full shadow-none">
      <CardHeader className="flex flex-row items-center justify-start">
        <WorkExperienceForm />
      </CardHeader>
      <CardContent>
        {workExperiences &&
        workExperiences.data.experienceDetails.length === 0 ? (
          <div className="text-center text-destructive">
            No Work Experience Details
          </div>
        ) : (
          workExperiences &&
          workExperiences.data.experienceDetails.map((detail) => (
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
                    <div className="flex flex-row gap-4 text-sm text-gray-600">
                      <span className="">{detail.company}</span>
                      <span>
                        {`${new Date(
                          detail.startDate
                        ).toLocaleDateString()} - ${
                          detail.currentWorkPlace
                            ? "Present"
                            : new Date(detail.endDate).toLocaleDateString()
                        }`}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center">
                  <EditWorkExperienceDetails detail={detail} />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteWorkExperience(detail._id)}
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
