import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { sendMessage, fetchChatByProject } from '@/Redux/Chat/Action';

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  
  // Correctly get authentication state
  const auth = useSelector((state) => state.auth);
  const user = auth?.user; // Get user object

  // Chat messages state
  const chatMessages = useSelector((state) => state.chat?.messages || []);

  // Fetch chat messages on mount
  useEffect(() => {
    if (id) {
      dispatch(fetchChatByProject(id));
    }
  }, [dispatch, id]);

  const handleSendMessage = () => {
    if (!message.trim()) return; // Prevent sending empty messages
    if (!user?.id) {
      console.error("Error: User is not authenticated!");
      return;
    }

    dispatch(
      sendMessage({
        senderId: user.id, // Correctly access user ID
        projectId: id,
        content: message,
      })
    );

    setMessage(""); // Clear input field
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="relative">
      <div className="border rounded-lg">
        <h1 className="border-b p-5">Chat Box</h1>
        <ScrollArea className="h-[32rem] w-full p-5 flex gap-3 flex-col">
          {chatMessages.length > 0 ? (
            chatMessages.map((msg, index) => (
              <div
                className={`flex gap-2 mb-2 ${
                  msg.senderId === user?.id ? 'justify-end' : 'justify-start'
                }`}
                key={index}
              >
                {msg.senderId !== user?.id && (
                  <Avatar>
                    <AvatarFallback>{msg.senderName?.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={`space-y-2 py-2 px-5 border rounded-xl ${
                    msg.senderId !== user?.id
                      ? 'rounded-se-2xl rounded-s-xl bg-gray-100'
                      : 'rounded-ss-2xl rounded-e-xl bg-blue-100'
                  }`}
                >
                  <p>{msg.senderId === user?.id ? "You" : msg.senderName}</p>
                  <p className="text-gray-500">{msg.content}</p>
                </div>

                {msg.senderId === user?.id && (
                  <Avatar>
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No messages yet.</p>
          )}
        </ScrollArea>

        
        <div className="relative p-0">
          <Input
            placeholder="Type a message..."
            className="py-7 border-t outline-none focus:outline-none focus:ring-0 rounded-none border-b-0 border-x-0"
            value={message}
            onChange={handleMessageChange}
          />
          <Button
            onClick={handleSendMessage}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full"
            size="icon"
            variant="ghost"
          >
            <PaperPlaneIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
