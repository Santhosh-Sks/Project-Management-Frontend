import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenuContent, DropdownMenuTrigger,DropdownMenu, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { AvatarFallback ,Avatar} from '@radix-ui/react-avatar';
import { DotsVerticalIcon, PersonIcon } from '@radix-ui/react-icons';
import React from 'react'

const IssueCard= () => {
  return (
    <div>
        <Card className="rounded-md py-1 pb-2">
        <CardHeader className="py-0 pb-1">
        <div className="flex justify-between items-center">
            <CardTitle>
            Create Navbar
            </CardTitle>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button className="rounded-full" size="icon" variant="ghost">
                        <DotsVerticalIcon/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>In Progress</DropdownMenuItem>
                    <DropdownMenuItem>Done</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        </CardHeader>
        <CardContent>
            <div className="flex items-center justify-between">
                <p>FBP -{1}</p>
                <DropdownMenu className="w-[30rem] border border-red-400">
                <DropdownMenuTrigger>
                    <Button size="icon" className="bg-gray-500 hover:text-black text-white rounded-full">
                        <Avatar>
                            <AvatarFallback>
                                <PersonIcon/>
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>

                </DropdownMenu>
            </div>
        </CardContent>

        </Card>
    </div>
  )
}

export default IssueCard;