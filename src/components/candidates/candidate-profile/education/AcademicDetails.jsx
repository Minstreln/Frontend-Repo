/* eslint-disable react/prop-types */
import { Trash2, RefreshCw, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EditAcademicDetails from "./EditAcademicDetails";

const AcademicDetails = ({
  academicDetails,
  refetch,
  deleteAcademicDetail,
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
        {academicDetails.length === 0 ? (
          <div className="text-center text-destructive">
            No Academic Details
          </div>
        ) : (
          academicDetails.map((detail) => (
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
                  <EditAcademicDetails refetch={refetch} detail={detail} />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteAcademicDetail(detail._id)}
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
