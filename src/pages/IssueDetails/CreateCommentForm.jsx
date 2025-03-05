import React from 'react'
import {Button} from "@/components/ui/button"
import { Dialog, DialogClose } from '@/components/ui/dialog'
import {FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import {Form} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {useForm} from "react-hook-form"
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import Navbar from '../Navbar/Navbar'

const CreateCommentForm = ({issueId}) => {
    const form =useForm({
        defaultValues:{
            content:"",
            
        }
    });
    const onSubmit=(data)=>{
        console.log("create project data",data);
    };
  return (
    <div>
       <Form {...form}>
            <form className="flex gap-2" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField control={form.control}
                    name="content" 
                    render={({field})=> (
                    <FormItem>
                    <div className="flex gap-2" >
                    <div>
                    <Avatar>
                            <AvatarFallback>Sk</AvatarFallback>
                        </Avatar>
                    </div>
                        
                        <FormControl>
                            <Input {...field} 
                            type ="text"
                            className="w-[20rem]"
                            placeholder="Comments..."/>
                        </FormControl>
                    </div>
                        <FormMessage/>
                    </FormItem>)}
                
                />
            
                    <Button type="submit" className="mt-2" > save </Button>
          
            </form>
        </Form>
    </div>
  )
}

export default CreateCommentForm