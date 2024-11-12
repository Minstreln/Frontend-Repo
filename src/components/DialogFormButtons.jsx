/* eslint-disable react/prop-types */
import { Button } from "./ui/button";
import { DialogFooter } from "./ui/dialog";

const DialogFormButtons = ({ isSubmitting, reset }) => {
  return (
    <DialogFooter>
      <div className="w-full flex flex-row items-center gap-5 justify-end pt-5">
        <Button
          variant="outline"
          type="reset"
          onClick={() => reset()}
          disabled={isSubmitting}
          className="bg-red-500/90 text-white hover:bg-red-500 hover:text-white font-semibold"
        >
          Reset
        </Button>
        <Button
          variant="default"
          type="submit"
          className="font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <span className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full" />
              Saving...
            </div>
          ) : (
            "Save"
          )}
        </Button>
      </div>
    </DialogFooter>
  );
};

export default DialogFormButtons;
