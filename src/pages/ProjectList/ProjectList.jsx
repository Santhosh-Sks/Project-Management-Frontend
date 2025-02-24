import React from 'react'
import {Card,CardContent} from '@/components/ui/card'
import{MixerHorizontalIcon} from '@radix-ui/react-icons'
import {Button} from '@/components/ui/button'
import {Label} from  '@/components/ui/label'
import {ScrollArea} from '@/components/ui/scroll-area'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function Project() {
  const handleFilterChange=(section,value)=>{
    console.log("value : ",value,section);
  }
  return (
    <div className='relative px-5 lg:px=0 lg:flex gap-5 justify-center py-5 '>

    <section className='filterSection'>
      <Card className="p-5 sticky top-10">
        <div className="flex justify-between lg:w-[20rem]">
          <p className='text=xl -tracking-wider'>Filters</p>
          <Button variant="ghost" size="icon">
          <MixerHorizontalIcon/>
          </Button>
        </div>
        <CardContent className="mt-5">
        <ScrollArea className="space-y-7 h-[70vh]">
        <div>
        <h1 className='pb-3 text-green-400 border-b'>Category</h1>
        <div className='pt-5'>
        <RadioGroup defaultValue="all" onValueChange={(value) => handleFilterChange("category", value)}>

          <div className='flex items-center gap-2'>
            <RadioGroupItem value="all" id="r1"/>
            <label htmlFor='r1'>All</label>
          </div>
          
          <div className='flex items-center gap-2'>
            <RadioGroupItem value="fullsatck" id="r2"/>
            <label htmlFor='r2'>Full-Stack</label>
          </div>
          
          <div className='flex items-center gap-2'>
            <RadioGroupItem value="frontend" id="r3"/>
            <label htmlFor='r3'>Frotend</label>
          </div>

          <div className='flex items-center gap-2'>
            <RadioGroupItem value="backend" id="r4"/>
            <label htmlFor='r4'>Backend</label>
          </div>
        </RadioGroup>

        </div>

        </div>

        </ScrollArea>

        </CardContent>
      </Card>
    </section>
    <section className='projectListSection w-full lg:w-[48rem]'>

    </section>

    </div>
  )
}

export default Project