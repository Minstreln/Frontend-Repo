/* eslint-disable react/prop-types */
import { Eye, FileText, RefreshCw, Trash2 } from "lucide-react";
import { Button } from "../../../ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import EditResumeDetails from "./EditResumeDetails";
import { Link } from "react-router-dom";

const Resumes = ({ resumes, refetch, deleteResume }) => {
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
        {resumes.length === 0 ? (
          <div className="text-center text-destructive">No Resume Uploaded</div>
        ) : (
          resumes.map((item) => (
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
                  <EditResumeDetails refetch={refetch} detail={item} />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteResume(item._id)}
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
