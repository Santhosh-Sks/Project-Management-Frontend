import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react';
import { useForm } from 'react-hook-form';
import { tags } from '../ProjectList/ProjectList';
import { Cross1Icon } from '@radix-ui/react-icons';
import { useDispatch } from 'react-redux';
import { createProject } from '@/Redux/project/Action';

const CreateProjectform = () => {
    const dispatch = useDispatch();
    
    const form = useForm({
        defaultValues: {
            name: "",
            description: "",
            category: "",
            tags: ["javascript", "react"]
        }
    });

    const handleTagsChange = (newValue) => {
        const currentTags = form.getValues("tags");
        const updatedTags = currentTags.includes(newValue)
            ? currentTags.filter(tag => tag !== newValue)
            : [...currentTags, newValue];

        form.setValue("tags", updatedTags);
    };

    const onSubmit = async (data) => {
        await dispatch(createProject(data));
        form.reset();
    };

    return (
        <div>
            <Form {...form}>
                <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField control={form.control} name="name" 
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} type="text" className="border w-full border-gray-700 py-5 px-5" placeholder="Project name..." />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField control={form.control} name="description" 
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field} type="text" className="border w-full border-gray-700 py-5 px-5 mt-5" placeholder="Project description..." />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField control={form.control} name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="border w-full border-gray-700 py-5 px-5 mt-5">
                                            <SelectValue placeholder="Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="fullstack">Full Stack</SelectItem>
                                            <SelectItem value="frontend">Frontend</SelectItem>
                                            <SelectItem value="backend">Backend</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField control={form.control} name="tags"
                        render={({ field }) => (
                            <FormItem>
                                <div className="border w-full border-gray-700 py-5 px-5 mt-5">
                                    <p className="mb-2">Tags:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {tags.map((tag) => (
                                            <label key={tag} className="flex items-center gap-2 cursor-pointer border rounded-full py-1 px-3">
                                                <input
                                                    type="checkbox"
                                                    checked={field.value.includes(tag)}
                                                    onChange={() => handleTagsChange(tag)}
                                                    className="hidden"
                                                />
                                                <span className="text-sm">{tag}</span>
                                                {field.value.includes(tag) && <Cross1Icon className="h-3 w-3" />}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <DialogClose asChild>
                        <Button type="submit" className="w-full mt-5"> Create Project</Button>
                    </DialogClose>
                </form>
            </Form>
        </div>
    );
};

export default CreateProjectform;
