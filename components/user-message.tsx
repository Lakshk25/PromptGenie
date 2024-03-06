import React from "react";

interface MessageProps {
    avatarComponent: React.ReactNode;
    text: string
}
const UserMessage = ({
    avatarComponent,
    text
}: MessageProps) => (
    <div className="flex gap-2 bg-muted py-5 px-4 rounded-lg bg-white border  border-black/10">
        {avatarComponent}
        <p className="">{text}</p>
    </div>
);

export default UserMessage;