import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MagnifyingGlassIcon, MixerHorizontalIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label"
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

function ProjectList () {
  const [keyword, setKeyword] = useState("");
  const projects = useSelector(state => state.project?.projects || []);
  
  const handleFilterChange = (section, value) => {
    console.log("value : ", value, section);
  };
  
  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  }

  console.log("project store ", projects);

  return (
    <div className='relative px-5 lg:px-0 lg:flex gap-5 justify-center py-5'>

      <section className='filterSection'>
        <Card className="p-5 sticky top-10">
          <div className="flex justify-between lg:w-[20rem]">
            <p className='text-xl -tracking-wider'>Filters</p>
            <Button variant="ghost" size="icon">
              <MixerHorizontalIcon />
            </Button>
          </div>
          <CardContent className="mt-5">
            <ScrollArea className="space-y-7 h-[70vh]">
              <div>
                <h1 className='pb-3 text-green-600 border-b'>Category</h1>
                <div className='pt-5'>
                  <RadioGroup className="items-center space-y-3 pt-5" defaultValue="all" onValueChange={(value) => handleFilterChange("category", value)}>
                    <div className='flex items-center gap-2'>
                      <RadioGroupItem value="all" id="r1" className="data-[state=checked]:bg-green-600 data-[state=checked]:text-white p-2 rounded-md" />
                      <label htmlFor='r1'>All</label>
                    </div>
                    <div className='flex items-center gap-2'>
                      <RadioGroupItem value="fullstack" id="r2" className="data-[state=checked]:bg-green-600 data-[state=checked]:text-white p-2 rounded-md" />
                      <label htmlFor='r2'>Full-Stack</label>
                    </div>
                    <div className='flex items-center gap-2'>
                      <RadioGroupItem value="frontend" id="r3" className="data-[state=checked]:bg-green-600 data-[state=checked]:text-white p-2 rounded-md" />
                      <label htmlFor='r3'>Frontend</label>
                    </div>
                    <div className='flex items-center gap-2'>
                      <RadioGroupItem value="backend" id="r4" className="data-[state=checked]:bg-green-600 data-[state=checked]:text-white p-2 rounded-md" />
                      <label htmlFor='r4'>Backend</label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className='pt-9'>
                <h1 className='pb-3 text-green-600 border-b'>Tags</h1>
                <div className='pt-5'>
                  <RadioGroup className="space-y-3 pt-5" defaultValue="all" onValueChange={(value) => handleFilterChange("tag", value)}>
                    {tags.map((item, index) => (
                      <div key={`tag-${index}`} className="flex items-center space-x-2">
                        <RadioGroupItem value={item} id={`r1-${item}`} className="data-[state=checked]:bg-green-600 data-[state=checked]:text-white p-2 rounded-md" />
                        <Label htmlFor={`r1-${item}`}>{item}</Label>
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
            <Input placeholder="Search project" onChange={handleSearchChange} className="40% px-9" /> 
            <MagnifyingGlassIcon className='absolute top-3 left-4' />
          </div>
        </div>

        <div>
          <div className='space-y-5 min-h-[74vh]'>
            {
              keyword
                ? [1, 1, 1].map((item, index) => <ProjectCard key={index} />)
                : projects.map((item) => <ProjectCard key={item.id} project={item} />)
            }
          </div>
        </div>
      </section>

    </div>
  );
}

export default ProjectList;
