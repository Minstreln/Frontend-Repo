import { Eye, FileText, Trash2 } from "lucide-react";
import { Button } from "../../../ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import EditResumeDetails from "./EditResumeDetails";
import { Link } from "react-router-dom";
import {
  useDeleteResume,
  useFetchResume,
} from "../../../../hooks/useCandidateResume";
import Loading from "../../../Loading";
import toast from "react-hot-toast";
import ResumeForm from "./ResumeForm";

const Resumes = () => {
  const { data: resumes, isLoading, isError, error } = useFetchResume();
  const deleteResumeMutation = useDeleteResume();

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

  const handleDeleteResume = async (id) => {
    try {
      await deleteResumeMutation.mutateAsync(id);
      toast.success("Resume deleted successfully");
    } catch (error) {
      toast.error(error.message);
      console.error("Error deleting resume:", error);
    }
  };

  return (
    <Card className="w-full shadow-none">
      <CardHeader className="flex flex-row items-center justify-start">
        <ResumeForm />
      </CardHeader>
      <CardContent>
        {resumes && resumes.data.userResume.length === 0 ? (
          <div className="text-center text-destructive">No Resume Uploaded</div>
        ) : (
          resumes &&
          resumes.data.userResume.map((item) => (
            <div key={item._id} className="mb-4 p-4 border rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex flex-row gap-5 items-center justify-center">
                  <span className="bg-primary/10 p-2 rounded">
                    <FileText className="h-8 w-8 text-primary" />
                  </span>

                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                </div>
                <div className="flex flex-row items-center">
                  <Link to={item.resume} target="_blank">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-5 w-5 text-green-500" />
                    </Button>
                  </Link>
                  <EditResumeDetails detail={item} />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteResume(item._id)}
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

export default Resumes;
