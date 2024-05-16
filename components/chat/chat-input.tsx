"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import qs from "query-string";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { EmojiPicker } from "@/components/emoji-picker";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

interface ChatInputProps {
    apiUrl: string;
    query: Record<string, any>;
    name: string;
    type: "conversation" | "channel";
}

const formSchema = z.object({
    content: z.string().min(1),
});

export const ChatInput = ({ apiUrl, query, name, type }: ChatInputProps) => {
    const { onOpen } = useModal();
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: apiUrl,
                query,
            });

            await axios.post(url, values);
            form.reset();
            router.refresh();
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="relative p-4 pb-4">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            onOpen("messageFile", {
                                                apiUrl,
                                                query,
                                            })
                                        }
                                        className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center"
                                    >
                                        <Plus className="text-white dark:text-[#313338]" />
                                    </button>
                                    <FormControl ref={inputRef}>
                                        <Input
                                            disabled={isLoading}
                                            className="px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                                            placeholder={`Message ${
                                                type === "conversation"
                                                    ? name
                                                    : "#" + name
                                            }`}
                                            {...field}
                                        />
                                    </FormControl>
                                    <div className="absolute top-7 right-8 flex my-auto">
                                        {/* <FaPoll
                                            onClick={() => {
                                                onOpen("createPoll", {
                                                    query: query,
                                                });
                                            }}
                                            className=" mx-2 h-[24px] w-[24px] text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
                                        /> */}
                                        <EmojiPicker
                                            onChange={(emoji: string) =>
                                                field.onChange(
                                                    `${field.value}${emoji}`
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};
