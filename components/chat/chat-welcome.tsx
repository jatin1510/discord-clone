import { Hash } from "lucide-react";
import { UserAvatar } from "@/components/user-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-dropdown-menu";

interface ChatWelcomeProps {
    name: string;
    type: "channel" | "conversation";
    // username?: string;
    // src?: string;
}

export const ChatWelcome = ({
    name,
    type,
    // username,
    // src,
}: ChatWelcomeProps) => {
    return (
        <div className="space-y-2 px-4 mb-4">
            {type === "channel" && (
                <div className="h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center">
                    <Hash className="h-12 w-12 text-white" />
                </div>
            )}
            {/* {type === "conversation" && (
                <div className="h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-[#313338] flex items-center justify-center">
                    <Avatar
                        className="ml-2 mt-2 h-20 w-20 md:h-20 md:w-20"
                        style={{ position: "relative" }}
                    >
                        <AvatarImage src={src} />
                    </Avatar>
                </div>
            )} */}
            <p className="text-xl md:text-3xl font-bold">
                {type === "channel" ? "Welcome to #" : ""}
                {name}
            </p>
            {/* {type === "conversation" && (
                <p className="text-xl md:text-xl">{username}</p>
            )} */}
            <p className="text-zinc-600 dark:text-zinc-400 my-1 text-sm">
                {type === "channel"
                    ? `This is the start of the #${name} channel.`
                    : `This is the beginning of your direct message with ${name}`}
            </p>
            {/* {type === "conversation" && (
                <div className="my-3">
                    <div className="flex space-x-4 my-3">
                        <button className="hover:bg-gray-500 h-6 text-sm bg-gray-600 text-white py-auto px-4 rounded shadow-md">
                            Remove Friend
                        </button>
                        <button className="hover:bg-gray-500 h-6 text-sm bg-gray-600 text-white py-auto px-4 rounded shadow-md">
                            Block
                        </button>
                    </div>
                    <Separator className="h-[1px] bg-zinc-300 dark:bg-zinc-700 my-3 rounded-md w-full" />
                </div>
            )} */}
        </div>
    );
};
