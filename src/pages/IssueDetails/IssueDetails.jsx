import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import CreateCommentForm from "./CreateCommentForm";
import CommentCard from "./CommentCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const IssueDetails = () => {
  const { projectId, issueId } = useParams();

  // Example comments data (replace with real API data)
  const comments = [
    { id: 1, text: "Great work on the navbar!", author: "Alice" },
    { id: 2, text: "Can we adjust the padding?", author: "Bob" },
    { id: 3, text: "Looks good to me!", author: "Charlie" },
  ];

  const handleUpdateIssueStatus = (status) => {
    console.log(status);
  };

  return (
    <div className="px-20 py-8 text-gray-300 text-left">
      <div className="flex justify-between border p-10 rounded-lg">
        <ScrollArea className="h-[80vh] w-[50%]">
          <div>
            <h1 className="text-lg font-semibold">Create Navbar</h1>

            <div className="py-5">
              <h2 className="font-semibold">Description</h2>
              <p className="text-gray-400 text-sm mt-3">
                It includes features like product listings, shopping carts, secure payment gateways, and order tracking.
              </p>
            </div>

            <div className="mt-5">
              <h1 className="pb-3">Activity</h1>
              <Tabs defaultValue="comments" className="w-[400px]">
                <TabsList className="mb-5">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="comments">Comments</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <TabsContent value="all">All Make Changes to your account here</TabsContent>
                <TabsContent value="comments">
                  <CreateCommentForm issueId={issueId} />
                  <div className="mt-8 space-y-6">
                    {comments.length > 0 ? (
                      comments.map((comment) => (
                        <CommentCard key={comment.id} comment={comment} />
                      ))
                    ) : (
                      <p className="text-gray-400">No comments yet.</p>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="history">All history</TabsContent>
              </Tabs>
            </div>
          </div>
        </ScrollArea>

        <div className="ml-[30%] space-y-2">
          <Select onValueChange={handleUpdateIssueStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="To Do" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">To Do</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>

          <div className="border rounded-lg">
            <p className="border-b py-3 px-5">Details</p>
            <div className="p-5 space-y-7">
              <div className="flex gap-10 items-center">
                <p className="w-[7rem]">Assignee</p>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 text-xs">
                    <AvatarFallback>Sk</AvatarFallback>
                  </Avatar>
                  <p>Santhosh</p>
                </div>
              </div>
              <div className="flex gap-10 items-center">
                <p className="w-[7rem]">Label</p>
                <p>None</p>
              </div>
              <div className="flex gap-10 items-center">
                <p className="w-[7rem]">Status</p>
                <Badge>In-progress</Badge>
              </div>
              <div className="flex gap-10 items-center">
                <p className="w-[7rem]">Release</p>
                <p>03-03-2025</p>
              </div>
              <div className="flex gap-10 items-center">
                <p className="w-[7rem]">Reporter</p>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 text-xs">
                    <AvatarFallback>Sk</AvatarFallback>
                  </Avatar>
                  <p>Santhosh</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default IssueDetails;
