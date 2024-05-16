import { useEffect, useState } from "react";

type ChatScrollProps = {
    chatRef: React.RefObject<HTMLDivElement>;
    bottomRef: React.RefObject<HTMLDivElement>;
    shouldLoadMore: boolean;
    loadMore: () => void;
    count: number;
    // isLatestByOwn?: boolean;
};

export const useChatScroll = ({
    chatRef,
    bottomRef,
    shouldLoadMore,
    loadMore,
    count,
    // isLatestByOwn,
}: ChatScrollProps) => {
    const [hasInitialized, setHasInitialized] = useState(false);

    useEffect(() => {
        const topDiv = chatRef?.current;

        const handleScroll = () => {
            const scrollTop = topDiv?.scrollTop;
            // const previousScrollHeight = topDiv?.scrollHeight;

            if (scrollTop === 0 && shouldLoadMore) {
                loadMore();

                // const checkContentLoadCompletion = () => {
                //     const newScrollHeight = topDiv?.scrollHeight;
                //     if (newScrollHeight <= previousScrollHeight + 500) {
                //         setTimeout(checkContentLoadCompletion, 50);
                //     } else {
                //         topDiv.scrollTop =
                //             topDiv.scrollHeight - previousScrollHeight;
                //     }
                // };

                // checkContentLoadCompletion();
            }
        };

        topDiv?.addEventListener("scroll", handleScroll);

        return () => {
            topDiv?.removeEventListener("scroll", handleScroll);
        };
    }, [shouldLoadMore, loadMore, chatRef]);

    useEffect(() => {
        const bottomDiv = bottomRef?.current;
        const topDiv = chatRef.current;

        const shouldAutoScroll = () => {
            if (!hasInitialized && bottomDiv) {
                setHasInitialized(true);
                return true;
            }

            // if (isLatestByOwn) {
            //     return true;
            // }

            if (!topDiv) {
                return false;
            }

            const distanceFromBottom =
                topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;

            return distanceFromBottom <= 100;
        };

        if (shouldAutoScroll()) {
            setTimeout(() => {
                bottomRef.current?.scrollIntoView({
                    behavior: "smooth",
                });
            }, 100);
        }
    }, [bottomRef, chatRef, count, hasInitialized]);
};
