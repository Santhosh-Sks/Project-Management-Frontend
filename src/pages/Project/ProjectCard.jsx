import { Card } from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger ,DropdownMenuItem} from '@radix-ui/react-dropdown-menu'
import { DotFilledIcon, DotsVerticalIcon } from '@radix-ui/react-icons'
import {Badge} from '@/components/ui/badge'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProjectCard = () => {
  const navigate = useNavigate()
  return (
    <Card className='p-5 w-full lg:max-w-3xl'>
    <div className='space-y-5'>
    <div className='space-y-2'>
        <div className='flex justify-between'>
            <div className='flex items-center gap-5'>
                <h1 onClick={() => navigate("/project/3")}  className='cursor-pointer font-bold text-lg text-green-600'>E-Commerce Project</h1>
                <DotFilledIcon/>
                <p className='text-sm text-gray-400'>Full Stack</p>
            </div>
            <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="rounded-full" variant="ghost" size="icon">
                        <DotsVerticalIcon/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                <DropdownMenuItem>Update</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
        </div>
        <p className='text-gray-200 text-sm'>E-Commerce Project is a full-stack web application that enables users to browse, search, purchase products online. </p>
    </div>
    <div className='flex flex-wrap gap-3 items-center'>
    {[1, 1, 1, 1].map((_, index) => (
  <Badge key={`badge-${index}`} variant="outline">{"Frontend"}</Badge>
))}


    </div>
    </div>

    </Card>
  )
}

export default ProjectCard