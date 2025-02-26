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
  } from "@/components/ui/select"
  
const IssueDetails = () => {
    const {projectId,issueId}=useParams();
    const handleUpdateIssueStatus = (status)=>{ 
        console.log(status);
    }
  return (
    
    <div className="px-20 py-8 text-gray-300 text-left">
    <div className="flex justify-between border p-10 rounded-lg">
    <ScrollArea className="h=[80vh] w-[50%]">
    <div>
        <h1 className="text-lg font-semibold text-gray-300">Create Navbar</h1>

        <div className="py-5">
            <h2 className="font-semibold text-gray-300">Description</h2>
            <p className="text-gray-400 text=sm mt-3"> It includes features like product listings,
             shopping carts, secure payment gateways, and order tracking</p>
        </div>
        <div className=" mt-5">
            <h1 className="pb-3">Activity</h1>
            <Tabs  defaultValue="comments" className="w-[400px]">
                <TabsList classNamemb-5>
                    <TabsTrigger  value="all">
                        All
                    </TabsTrigger>
                    <TabsTrigger value="comments">
                        Comments
                    </TabsTrigger>
                    <TabsTrigger value="history">
                        History
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                    All Make Changes to your account here
                </TabsContent>
                <TabsContent value="comments">
                    <CreateCommentForm issueId={issueId}/>
                    <div className="mt-8 space-y-6">
                        {[1,1,1].map((item)=><CommentCard key={item}/>)}
                    </div>
                </TabsContent>
                <TabsContent value="history">
                    All history
                </TabsContent>
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
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>

    </div>

    </div>
       
    </div>
  )
}

export default IssueDetails