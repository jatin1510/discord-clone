"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ActionTooltip } from "@/components/action-tooltip";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface NavigationItemProps {
    id: string;
    imageUrl: string;
    name: string;
}

export const NavigationItem = ({
    id,
    imageUrl,
    name
}: NavigationItemProps) => {

    const params = useParams();
    const router = useRouter();
    const [isClicked, setIsClicked] = useState(false);

    const onClick = () => {
        setIsClicked(true);
        router.push(`/servers/${id}`);
        setTimeout(() => setIsClicked(false), 100);
    }

    return (
        <ActionTooltip
            side="right"
            align="center"
            label={name}
        >
            <button
                onClick={onClick}
                className={cn(
                    "group relative flex items-center transition-all",
                    isClicked && "transform translate-y-1"
                )}
                style={{
                    borderRadius: "26px",
                    padding: "0",
                }}
            >
                <div className={cn(
                    "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
                    params?.serverId !== id && "group-hover:h-[20px]",
                    params?.serverId === id ? "h-[36px]" : "h-[8px]"
                )} />
                <div className={cn(
                    "relative group flex mx-3 h-[52px] w-[52px] rounded-[26px] group-hover:rounded-[18px] transition-all overflow-hidden",
                    params?.serverId === id && "bg-primary/10 text-primary rounded-[18px]"
                )}>
                    <Image
                        fill
                        src={imageUrl}
                        alt="Channel"
                    />
                </div>
            </button>
        </ActionTooltip>
    )
}