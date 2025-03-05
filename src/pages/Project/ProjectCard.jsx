import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { DotFilledIcon, DotsVerticalIcon } from '@radix-ui/react-icons';
import { Badge } from '@/components/ui/badge';
import React, { use } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteProject } from '@/Redux/project/Action';

const ProjectCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch= useDispatch();
  const handleDelete = () => {
    if (item.id) {
      dispatch(deleteProject(item.id));  
    } else {
      console.error("Project ID is missing!");
    }
  };
  


  return (
    <Card className="p-5 w-full lg:max-w-3xl">
      <div className="space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="flex items-center gap-5">
              <h1
                onClick={() => navigate(`/project/${item.id}`)}
                className="cursor-pointer font-bold text-lg text-green-600"
              >
                {item.name}
              </h1>
              <DotFilledIcon />
              <p className="text-sm text-gray-400 ">{item.category}</p>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <span>
                <Button className="rounded-full p-2 h-8 w-8" variant="ghost" size="sm">
                    <DotsVerticalIcon />
                  </Button>

                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="border-b border-green-800 text-white rounded-xl gap-2 p-2">
                 
                  <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <p className="text-gray-200 text-sm w-[92%]">
            {item.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
        {item.tags?.map((tag, index) => (
          <Badge key={`${item.id || item._id}-${tag}-${index}`} variant="outline">
            {tag}
          </Badge>
        ))}


        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
