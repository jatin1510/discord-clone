import { Hash } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { MobileToggle } from "@/components/mobile-toggle";
import { extractInitials } from "@/utils/extractInitials";
import { SocketIndicator } from "@/components/socket-indicator";
import { UserAvatar } from "@/components/user-avatar";
import { ChatVideoButton } from "./chat-video-button";
// import { PinnedMessages } from "./pinned-messages";

interface ChatHeaderProps {
    serverId?: string;
    name: string;
    type: "channel" | "conversation";
    imageUrl?: string;
    // email?: string;
    // chatId: string;
}

const ChatHeader = ({
    serverId,
    name,
    type,
    imageUrl,
}: // email,
// chatId,
ChatHeaderProps) => {
    return (
        <div className="text-md font-semibold px-3 flex items-center h-14 border-natural-200 dark:border-neutral-800 border-b-2">
            {serverId && <MobileToggle serverId={serverId} />}
            {type === "channel" && (
                <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
            )}
            {type === "conversation" && (
                <UserAvatar
                    src={imageUrl}
                    className="h-8 w-8 md:h-8 md:w-8 mr-2"
                />
                // <Avatar className="h-9 w-9 md:h-9 md:w-9 mr-2">
                //     <AvatarFallback className="dark:bg-[#1E1F22] bg-[#E3E5E8]">
                //         {extractInitials(name)}
                //     </AvatarFallback>
                // </Avatar>
            )}
            <p className="font-semibold text-md text-black dark:text-white">
                {name}
            </p>

            <div className="ml-auto gap-x-2 flex items-center">
                {/* <PinnedMessages chatId={chatId} type={type} /> */}
                {type === "conversation" && <ChatVideoButton />}
                <SocketIndicator />
            </div>
        </div>
    );
};

export default ChatHeader;
