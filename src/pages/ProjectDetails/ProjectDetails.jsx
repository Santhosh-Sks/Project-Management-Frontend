import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogClose, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { PlusIcon } from '@radix-ui/react-icons'
import InviteUserForm from './InviteUserForm'
import IssueList from './IssueList'
import ChatBox from './ChatBox'

const ProjectDetails = () => {
  const handleProjectInvitation = () => {}

  return (
    <div className="mt-5 flex w-full min-w-full lg:w-full px-0 mx-0"> 

<div className="lg:flex gap-5 justify-start pb-4 w-full">  

      <ScrollArea className="h-screen w-full lg:w-[100%] pr-0">
          <div className="text-gray-350 pb-10 w-full "> 
            <h2 className="text-xl font-semibold pb-5 text-left">E-commerce Website using React</h2>
            <div className="space-y-5 pb-10">
              <p className="w-full md:max-w-lg lg:max-w-xl tex-smt text-left">
                An E-commerce website is an online platform that allows users to browse, purchase, and manage products or services. 
                It includes features like product listings, shopping carts, secure payment gateways, and order tracking. Built with 
                responsive design and user-friendly navigation, it enhances the shopping experience for customers.
              </p>
              <div className="flex">
                <p className="w-36">Project Lead :</p>
                <p>Santhosh Kumar</p>
              </div>
              <div className="flex">
                <p className="w-36">Member :</p>
                <div className="flex items-center gap-2">
                  {[1,1,1,1].map((item, index) => (
                    <Avatar className="cursor-pointer" key={index}>
                      <AvatarFallback>SK</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <DialogClose>
                      <Button size="sm" variant="outline" className="ml-2" onClick={handleProjectInvitation}>
                        <span>Invite</span>
                        <PlusIcon className="w-3 h-3" />
                      </Button>
                    </DialogClose>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>Invite User</DialogHeader>
                    <InviteUserForm />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex">
                <p className="w-36">Category :</p>
                <p>FullStack</p>
              </div>
              <div className="flex">
                <p className="w-36">Status :</p>
                <Badge>In Progress</Badge>
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
  )
}

export default ProjectDetails
