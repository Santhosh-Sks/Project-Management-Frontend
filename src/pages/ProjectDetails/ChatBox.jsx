import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PaperPlaneIcon } from '@radix-ui/react-icons'

const ChatBox = () => {
  const [message,setMessage]= useState("");
  const handleSendMessage = ()=>{
    console.log("message",message);
  }
  const handleMessageChange=(e)=>{
    setMessage(e.target.value);
  }
  return (
    <div className="relative">
      <div className="border rounded-lg">
        <h1 className="border-b p-5">Chat Box</h1>
        <ScrollArea className="h-[32rem] w-full p-5 flex gap-3 flex-col">
          {[1, 1, 1, 1].map((_, index) => (
            <div
              className={`flex gap-2 mb-2 ${
                index % 2 === 0 ? 'justify-start' : 'justify-end'
              }`}
              key={index}
            >
              {index % 2 === 0 && (
                <Avatar>
                  <AvatarFallback>SK</AvatarFallback>
                </Avatar>
              )}

              <div
                className={`space-y-2 py-2 px-5 border rounded-xl ${
                  index % 2 === 0
                    ? 'rounded-se-2xl rounded-s-xl bg-gray-100'
                    : 'rounded-ss-2xl rounded-e-xl bg-blue-100'
                }`}
              >
                <p>{index % 2 === 0 ? 'Ram' : 'You'}</p>
                <p className="text-gray-500">How are you?</p>
              </div>

              {index % 2 !== 0 && (
                <Avatar>
                  <AvatarFallback>R</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </ScrollArea>
        <div className="relative p-0">
  <Input
    placeholder="Type message..."
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
  )
}

export default ChatBox
