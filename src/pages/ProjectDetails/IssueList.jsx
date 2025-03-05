import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import CreateIssueForm from "./CreateIssueForm";
import IssueCard from "./IssueCard";
import { useDispatch,useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {fetchIssues} from '@/Redux/Issue/Action'


const IssueList = ({ title,status}) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { issues } = useSelector((state) => state.issue);

  useEffect(() => {
    dispatch(fetchIssues(id)); 
  }, [id, dispatch]);

  const handleIssueCreated = () => {
    dispatch(fetchIssues(id)); 
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <Dialog>
        <Card className="w-full md:w-[250px] lg:w-[300px] shadow-md flex flex-col gap-2">
          <CardHeader className="flex justify-between items-center pb-3">
            <CardTitle className="text-center">{title}</CardTitle> 
          </CardHeader>

          <CardContent className="px-2 space-y-2">
            <div className="space-y-2">
            {issues && issues.length > 0 ? (
                issues.map((item) => <IssueCard projectId={id} key={item.id} item={item} />)
              ) : (
                <div>No issues available.</div>
              )}

              
            </div>
          </CardContent>

          <CardFooter className="pt-3 flex justify-center">
            <DialogTrigger>
              <Button variant="outline" className="border flex items-center gap-2 w-full">
                <PlusIcon /> Create Issue
              </Button>
            </DialogTrigger>
          </CardFooter>
        </Card>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Issue</DialogTitle>
          </DialogHeader>
          <CreateIssueForm onIssueCreated={handleIssueCreated} />

        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IssueList;
