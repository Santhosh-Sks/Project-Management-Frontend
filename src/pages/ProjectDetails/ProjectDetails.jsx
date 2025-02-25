import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog,DialogContent, DialogClose, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { PlusIcon } from '@radix-ui/react-icons'
import InviteUserForm from './InviteUserForm'
import IssueList from './IssueList';
import ChatBox from './ChatBox';

const ProjectDetails = () => {
  const handleProjectInvitation =()=>{}
  return (
    <div className="mt-5 lg:px-5 flex justify-start"> 
    <div className="lg:w-[75%] ml-0"> 
      <ScrollArea className="h-screen pr-2">
        <div className="text-gray-350 pb-10 w-full text-left tex-smt"> 
          <h1 className="text-xl font-bold pb-5">E-commerce Website using React</h1>
          <div className="space-y-5 pb-10">
            <p className="w-full md:max-w-lg lg:max-w-xl tex-smt">
        An E-commerce website is an online platform that allows users to browse, purchase, and manage products or services. 
        It includes features like product listings, shopping carts, secure payment gateways,
         and order tracking. Built with responsive design and user-friendly navigation, it enhances the shopping experience for customers
        </p>
        <div className='flex'>
          <p className='w-36'>Project Lead : </p>
          <p>Santhosh Kumar </p>
        </div>
        <div className='flex'>
          <p className='w-36'> Member : </p>
          <div className='flex items-center gap-2'>
            {[1,1,1,1].map((item)=><Avatar className='cursor-pointer' key={item}>
              <AvatarFallback>SK</AvatarFallback>
            </Avatar>)}
          </div>
          <Dialog>
            <DialogTrigger>
             <DialogClose>
              <Button size="sm" variant="outline" className="ml-2" onClick={handleProjectInvitation}>
                <span>Invite</span>
                <PlusIcon className='w-3 h-3'/>
              </Button>
             </DialogClose>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>Invite USer</DialogHeader>
              <InviteUserForm/>
            </DialogContent>
          </Dialog>
        
        </div>
        <div className='flex'>
          <p className='w-36'>Category : </p>
          <p>FullStack </p>
        </div>
        <div className='flex'>
          <p className='w-36'>Status : </p>
          <Badge>In Progress</Badge>
        </div>
        </div>
        <section>
          <p className='py-5 border-b text-lg -tracking-wider'>Tasks</p>
          <div className='lg:flex md:flex gap-3 justify-between py-5'>

            <IssueList status="Pending" title="Todo List"/>
            <IssueList status="in_progress" title="In progress"/>
            <IssueList status="done" title="Done"/>
          </div>
        </section>
        </div>
        
      </ScrollArea>
      <div>
        <ChatBox/>
      </div>
    </div>

    </div>
  )
}

export default ProjectDetails