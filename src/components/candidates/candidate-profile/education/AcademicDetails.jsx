import { Trash2, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EditAcademicDetails from "./EditAcademicDetails";
import {
  useDeleteAcademicDetail,
  useFetchAcademicDetails,
} from "../../../../hooks/useCandidateAcademicDetails";
import Loading from "../../../Loading";
import AcademicDetailsForm from "./AcademicDetailsForm";
import toast from "react-hot-toast";

const AcademicDetails = () => {
  const {
    data: academicDetails,
    isLoading,
    isError,
    error,
  } = useFetchAcademicDetails();
  const deleteAcademicDetailMutation = useDeleteAcademicDetail();

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

  const handleDeleteAcademicDetail = async (id) => {
    try {
      await deleteAcademicDetailMutation.mutateAsync(id);
      toast.success("Academic Detail deleted successfully");
    } catch (error) {
      toast.error(error.message);
      console.error("Error deleting Academic Detail:", error);
    }
  };

  return (
    <Card className="w-full shadow-none">
      <CardHeader className="flex flex-row items-center justify-start">
        <AcademicDetailsForm />
      </CardHeader>
      <CardContent>
        {academicDetails &&
        academicDetails.data.academicDetails.length === 0 ? (
          <div className="text-center text-destructive">
            No Academic Details
          </div>
        ) : (
          academicDetails &&
          academicDetails.data.academicDetails.map((detail) => (
            <div key={detail._id} className="mb-4 p-4 border rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex flex-row gap-5">
                  <span className="bg-primary/10 p-2 rounded flex items-center justify-center">
                    <GraduationCap className="h-10 w-10 text-primary" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-medium text-gray-900">
                      {detail.course}
                    </h3>
                    <span className="text-sm text-gray-600">
                      {detail.institutionName} - {detail.yearOfCompletion}
                    </span>
                  </div>
                </div>
                <div className="flex flex-row items-center">
                  <EditAcademicDetails detail={detail} />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteAcademicDetail(detail._id)}
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

export default AcademicDetails;
