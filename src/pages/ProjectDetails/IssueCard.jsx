import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { DotsVerticalIcon, PersonIcon } from "@radix-ui/react-icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateIssueStatus, deleteIssue } from "@/Redux/Issue/Action";
import UserList from "./UserList";

const IssueCard = ({ item, projectId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleStatusChange = (status) => {
    dispatch(updateIssueStatus({ id: item.id, status }));
  };

  const handleDelete = () => {
    console.log("Deleting comment with ID:", item.id);
    console.log("Issue ID for fetching comments:", issueId); // Debugging log
  
    dispatch(deleteComment(item.id, issueId));  // Dispatch the action with both IDs
    console.log("Comment deleted/....");
  };
  

  return (
    <Card className="rounded-md p-3 shadow-md bg-black-900">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-sm font-semibold cursor-pointer" onClick={() => navigate(`issue/${item.id}`)}>
            {item.title}
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-7 w-7 rounded-full hover:bg-gray-800 transition duration-200 ml-20"
              >
                <DotsVerticalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-[900] absolute left-0 bg-gray-900 hover:text-white rounded-md px-2 py-1 transition duration-200">
              <DropdownMenuItem onClick={() => handleStatusChange("IN_PROGRESS")}>Progress</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(`/edit-issue/${item.id}`)}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange("DONE")}>Done</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(item)}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-between px-7 gap-20">
        <p className="text-sm">FBP - 1</p>
        <DropdownMenu className="w-[20rem]">
          <DropdownMenuTrigger>
            <Button size="icon" variant="outline" className="bg-black-200">
              <Avatar>
                <AvatarFallback>
                  <PersonIcon />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <UserList />
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
};

export default IssueCard;
