import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MagnifyingGlassIcon, MixerHorizontalIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import ProjectCard from '../Project/ProjectCard';
import { useSelector } from 'react-redux';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export const tags = [
  "All",
  "React",
  "Next js",
  "Spring Boot",
  "MySQL",
  "MongoDB",
  "Angular",
  "Django",
];

const categories = ["All", "Full-Stack", "Frontend", "Backend"];

function ProjectList() {
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTag, setSelectedTag] = useState("All");

  const projectData = useSelector((state) => state.project);
  const projects = projectData?.projects ?? []; 

  const handleFilterChange = (section, value) => {
    if (section === "category") {
      setSelectedCategory(value);
    } else if (section === "tag") {
      setSelectedTag(value);
    }
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };

  const filteredProjects = projects?.filter((item) => {
    const matchesKeyword = item?.name?.toLowerCase().includes(keyword.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item?.category?.toLowerCase() === selectedCategory;
    const matchesTag = selectedTag === "All" || item?.tags?.includes(selectedTag);

    return matchesKeyword && matchesCategory && matchesTag;
  }) ?? [];
  
  return (
    <div className='relative px-5 lg:px-0 lg:flex gap-5 justify-center py-5'>

      <section className='filterSection'>
        <Card className="p-5 sticky top-10">
          <div className="flex justify-between lg:w-[20rem]">
            <p className='text-xl -tracking-wider'>Filters</p>
            <Button variant="ghost" size="sm" className="px-2">
                <MixerHorizontalIcon />
              </Button>

          </div>
          <CardContent className="mt-5">
            <ScrollArea className="space-y-7 h-[70vh]">
              <div>
                <h1 className='pb-3 text-green-600 border-b'>Category</h1>
                <div className='pt-5'>
                  <RadioGroup 
                    className="items-center space-y-3 pt-5"
                    value={selectedCategory}
                    onValueChange={(value) => handleFilterChange("category", value)}
                  >
                    {categories.map((category, index) => (
                      <div key={`category-${index}`} className='flex items-center gap-2'>
                        <RadioGroupItem 
                          value={category.toLowerCase()} 
                          id={`category-${index}`} 
                          className="data-[state=checked]:bg-green-600 data-[state=checked]:text-white p-2 rounded-md" 
                        />
                        <label htmlFor={`category-${index}`}>{category}</label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>

              <div className='pt-9'>
                <h1 className='pb-3 text-green-600 border-b'>Tags</h1>
                <div className='pt-5'>
                  <RadioGroup 
                    className="space-y-3 pt-5"
                    value={selectedTag}
                    onValueChange={(value) => handleFilterChange("tag", value)}
                  >
                    {tags.map((tag, index) => (
                      <div key={`tag-${index}`} className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value={tag} 
                          id={`tag-${index}`} 
                          className="data-[state=checked]:bg-green-600 data-[state=checked]:text-white p-2 rounded-md" 
                        />
                        <Label htmlFor={`tag-${index}`}>{tag}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </section>

      <section className='projectListSection w-full lg:w-[48rem]'>
        <div className='flex gap-2 items-center pb-5 justify-between'>
          <div className='relative p-0 w-full'>
            <Input 
              placeholder="Search project" 
              onChange={handleSearchChange} 
              className="w-full px-9" 
            /> 
            <MagnifyingGlassIcon className='absolute top-3 left-4' />
          </div>
        </div>
        
        <div>
          <div className='space-y-5 min-h-[74vh]'>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((item, index) => (
                    <ProjectCard key={item.id || item._id || index} item={item} />
                  ))

            ) : (
              <p className="text-gray-400">No projects found</p>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}

export default ProjectList;
