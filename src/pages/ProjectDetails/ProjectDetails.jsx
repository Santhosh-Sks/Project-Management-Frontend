import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { PlusIcon } from '@radix-ui/react-icons';
import InviteUserForm from './InviteUserForm';
import IssueList from './IssueList';
import ChatBox from './ChatBox';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchProjectById } from '@/Redux/project/Action';

const ProjectDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const project = useSelector((state) => state.project?.ProjectDetails) || {}; 

  useEffect(() => {
    dispatch(fetchProjectById(id));
  }, [id, dispatch]);

  return (
    <div className="mt-5 flex w-full min-w-full lg:w-full px-0 mx-0"> 
      <div className="lg:flex gap-5 justify-start pb-4 w-full">  
        <ScrollArea className="h-screen w-full lg:w-[100%] pr-0">
          <div className="text-gray-350 pb-10 w-full"> 
            <h2 className="text-xl font-semibold pb-5 text-left">{project?.name || "Project Name"}</h2>
            <div className="space-y-5 pb-10">
              <p className="w-full md:max-w-lg lg:max-w-xl text-sm text-left">
                {project?.description || "No description available."}
              </p>

              <div className="flex">
                  <p className="w-36 ml-5 font-medium">Project Lead:</p>
                  <p className="ml-2">{project?.owner?.fullName || "N/A"}</p>
                </div>

                <div className="flex">
                  <p className="w-36 ml-5 font-medium">Members:</p>
                  <div className="flex items-center gap-2">
                  
                    {project?.owner && (
                      <Avatar className="cursor-pointer">
                        <AvatarFallback>{project.owner.fullName?.charAt(0) || "?"}</AvatarFallback>
                      </Avatar>
                    )}

                    
                    {project?.members?.length > 0 ? (
                    project.members.map((member, index) => (
                      <Avatar className="cursor-pointer" key={index}>
                        <AvatarFallback>{member?.fullName?.charAt(0) || "?"}</AvatarFallback>
                      </Avatar>
                    ))
                  ) : null}

                  </div>


                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="ml-2">
                      <span>Invite</span>
                      <PlusIcon className="w-3 h-3" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>Invite User</DialogHeader>
                    <InviteUserForm />
                  </DialogContent>
                </Dialog>
              </div>

              <div className="flex">
                <p className="w-36 font-medium">Category:</p>
                <p className='ml-2' >{project?.category || "Not specified"}</p>
              </div>

              <div className="flex">
                <p className="w-36 font-medium">Status:</p>
                <Badge>{project?.status || "Pending"}</Badge>
              </div>
            </div>

            <section>
            <p className="py-5 border-b text-lg -tracking-wider">Tasks</p>
              <div className="flex gap-2 py-5 w-full">
                <div className="flex gap-2 min-w-0">
                  <IssueList status="Pending" title="Todo List" />
                  <IssueList status="in_progress" title="In progress" />
                  <IssueList status="done" title="Done" />
                </div>
                
              </div>
            </section>
          </div>
        </ScrollArea>

        <div className="w-[30%] min-w-[250px] sticky top-10">
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
