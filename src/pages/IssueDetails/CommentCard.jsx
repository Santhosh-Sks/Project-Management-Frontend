import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { TrashIcon } from '@radix-ui/react-icons';
import React from 'react';
import { deleteComment } from '@/Redux/Comment/Action';
import { useDispatch } from 'react-redux';

const CommentCard = ({ item, issueId }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    console.log("Deleting comment with ID:", item.id);
    console.log("Issue ID for fetching comments:", issueId);
  
    dispatch(deleteComment(item.id, issueId));
    console.log("Comment deleted/....");
  };

  // Debugging: Log item to verify its structure
  console.log("Item:", item);

  // Get initials from fullName
  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map((word) => word[0]).join('');
  };

  return (
    <div className='flex justify-between'>
      <div className='flex items-center gap-4'>
        <Avatar>
          <AvatarFallback>{getInitials(item.user?.fullName)}</AvatarFallback>
        </Avatar>
        <div className='space-y-1'>
          {/* Use item.user.fullName to display the full name */}
          <p>{item.user?.fullName}</p>
          <p>{item.content}</p>
        </div>
      </div>
      <Button className="rounded-full" variant="ghost" size="icon" onClick={handleDelete}>
        <TrashIcon />
      </Button>
    </div>
  );
}

export default CommentCard;
