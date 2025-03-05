import React, { useState } from 'react'; 
import { Button } from "@/components/ui/button";
import { FormControl, FormField, Form, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createIssue } from '@/Redux/Issue/Action';

const CreateIssueForm = ({ onIssueCreated }) => {
  const { projectId } = useParams();  
  const dispatch = useDispatch();
  const [apiError, setApiError] = useState(null); // Handle API errors

  const form = useForm({
    defaultValues: {
      title: "",  
      description: "",
    },
    mode: "onBlur",  // Validation onBlur for better UX
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(createIssue({
        title: data.title,  
        description: data.description,
        projectId: projectId,  // ✅ Fixed typo
      }));
      
      console.log("Issue Created:", data);
      form.reset();
      setApiError(null); // Clear error if successful

      if (onIssueCreated) {
        onIssueCreated();
      }
    } catch (error) {
      setApiError(error.message);  // Store error message
    }
  };

  return (
    <div>
      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            rules={{ required: "Title is required" }}  // ✅ Added validation
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="border w-full border-gray-700 py-2 px-4"
                    placeholder="Issue Title..."
                  />
                </FormControl>
                <FormMessage>{form.formState.errors.title?.message}</FormMessage>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            rules={{ required: "Description is required" }}  // ✅ Added validation
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <textarea
                    {...field}
                    className="border w-full border-gray-700 py-2 px-4 h-24"
                    placeholder="Description..."
                  />
                </FormControl>
                <FormMessage>{form.formState.errors.description?.message}</FormMessage>
              </FormItem>
            )}
          />

          {apiError && <p className="text-red-500">{apiError}</p>}  {/* ✅ Display API errors */}

          <Button type="submit" className="w-full mt-5">
            Create Issue
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateIssueForm;
