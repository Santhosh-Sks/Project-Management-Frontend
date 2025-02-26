import { Button } from '@/components/ui/button'
import { DialogHeader,Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'
import CreateProjectform from '../Project/CreateProjectform'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { PersonIcon } from '@radix-ui/react-icons'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <div className='border-b py-4 px-5 flex items-center justify-between'>

        <div className='flex items-center gap-3'>
        <p onClick={()=>navigate("/")} className='cursor-pointer'>Project Managament</p>
        <Dialog>

            <DialogTrigger asChild>
                <Button variant="ghost">New Project</Button>
            </DialogTrigger>
                
            <DialogContent>
            <DialogHeader> <h2 className="text-lg font-medium">Create New Project</h2></DialogHeader>
                <CreateProjectform/>
            </DialogContent>
        </Dialog>
        <Button variant="ghost">
            Upgrade
        </Button>
        </div>
        <div className='flex gap-3 items-center'>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full border-2 border-gray-100">
                        <PersonIcon/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>LogOut</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <p>User</p>
        </div>
    </div>
    
  )
}

export default Navbar