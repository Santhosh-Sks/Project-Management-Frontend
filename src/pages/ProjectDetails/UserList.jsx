import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { assignedUserToIssue } from "@/Redux/Issue/Action";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const UserList = ({ issueDetails }) => {
  const { project } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleAssignIssueToUser = (userId) => {
    dispatch(assignedUserToIssue({ issueId: issueDetails.id, userId }));
  };

  // ✅ Find the Team Lead
  const teamLead = project?.projectDetails?.team?.find(user => user.role === "Team Lead");

  // ✅ Set the initial assignee to the team lead if no one is assigned
  const currentAssignee = issueDetails.assignee || teamLead?.name || "Unassigned";

  return (
    <div className="space-y-2">
      {/* ✅ Display the current assignee (either assigned user or team lead) */}
      <div className="border rounded-md">
        <p className="py-2 px-3">{currentAssignee}</p>
      </div>

      {/* ✅ Show all team members, including the team lead */}
      {project?.projectDetails?.team?.length > 0 ? (
        project.projectDetails.team.map((user) => (
          <div 
            onClick={() => handleAssignIssueToUser(user.id)}
            key={user.id}
            className="py-2 group hover:bg-green-600 cursor-pointer flex items-center space-x-4 rounded-md border px-4"
          >
            <Avatar>
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm leading-none">{user.name}</p>
              <p className="text-sm leading-none">{user.username.toLowerCase()}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No team members available</p>
      )}
    </div>
  );
};

export default UserList;
