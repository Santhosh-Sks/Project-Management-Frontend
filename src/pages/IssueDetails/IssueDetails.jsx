import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchIssues,  deleteIssue } from '@/Redux/Issue/Action';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, Form, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import CreateCommentForm from "./CreateCommentForm";
import CommentCard from "./CommentCard";
import { fetchComments } from "@/Redux/Comment/Action";

const IssueDetails = () => {
  const { issueId, projectId } = useParams();
  const dispatch = useDispatch();
  const { issue, loading, error } = useSelector(state => state.issueDetails);
  const { comments } = useSelector(state => state.comments);
  const [editMode, setEditMode] = useState(false);
  const [apiError, setApiError] = useState(null);

  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    dispatch(fetchIssues(issueId));
    dispatch(fetchComments(issueId));
  }, [dispatch, issueId]);

  useEffect(() => {
    if (issue) {
      form.reset({
        title: issue.title,
        description: issue.description,
      });
    }
  }, [issue, form]);



  const handleDelete = async () => {
    try {
      await dispatch(deleteIssue(issueId, projectId));
    } catch (error) {
      setApiError(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 border rounded-lg shadow-lg w-full max-w-2xl mx-auto text-gray-300">
      <h2 className="text-xl font-bold mb-4">Issue Details</h2>
      {apiError && <p className="text-red-500">{apiError}</p>}

      <ScrollArea className="h-[80vh] w-full">
        {editMode ? (
          <Form {...form}>
            <form className="space-y-3" onSubmit={form.handleSubmit(handleUpdate)}>
              <FormField
                control={form.control}
                name="title"
                rules={{ required: 'Title is required' }}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} type="text" className="border w-full py-2 px-4" placeholder="Issue Title..." />
                    </FormControl>
                    <FormMessage>{form.formState.errors.title?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                rules={{ required: 'Description is required' }}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <textarea {...field} className="border w-full py-2 px-4 h-24" placeholder="Description..." />
                    </FormControl>
                    <FormMessage>{form.formState.errors.description?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <div className="flex space-x-3 mt-4">
                <Button type="submit" className="w-full">Save</Button>
                <Button type="button" className="w-full bg-gray-500" onClick={() => setEditMode(false)}>Cancel</Button>
              </div>
            </form>
          </Form>
        ) : (
          <div>
            <p className="mb-2"><strong>Title:</strong> {issue?.title}</p>
            <p className="mb-4"><strong>Description:</strong> {issue?.description}</p>
            <div className="flex space-x-3">
              <Button className="w-full" onClick={() => setEditMode(true)}>Edit</Button>
              <Button className="w-full bg-red-500" onClick={handleDelete}>Delete</Button>
            </div>
          </div>
        )}
        <Tabs defaultValue="comments" className="mt-6">
          <TabsList>
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="comments">
            <CreateCommentForm issueId={issueId} />
            <div className="mt-6 space-y-4">
              {comments && comments.length > 0 ? (
                comments.map((item) => <CommentCard key={item.id} item={item} issueId={issueId} />)
              ) : (
                <p className="text-gray-400">No comments yet.</p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="history">No history available</TabsContent>
        </Tabs>
      </ScrollArea>
    </div>
  );
};

export default IssueDetails;
