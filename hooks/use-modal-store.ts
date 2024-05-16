import { Channel, ChannelType, Server } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
    | "createServer"
    | "invite"
    | "editServer"
    | "members"
    | "createChannel"
    | "leaveServer"
    | "deleteServer"
    | "deleteChannel"
    | "editChannel"
    | "messageFile"
    | "deleteMessage";

//   | "createPoll" | "viewVotes" | "uploadStatus" | "viewStatus";

interface ModalData {
    server?: Server;
    channel?: Channel;
    channelType?: ChannelType;
    apiUrl?: string;
    query?: Record<string, any>;
    // votes?: any;
    // currIndex?: number;
    // statuses?: any;
}

interface ModalStore {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false }),
}));
