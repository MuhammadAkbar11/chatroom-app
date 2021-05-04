import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message";

const Messages = ({ messages, userId }) => {
  return (
    <ScrollToBottom className="messages p-3">
      {messages.map(msg => {
        const key = msg._id;
        return <Message key={key} message={msg} userId={userId} />;
      })}
    </ScrollToBottom>
  );
};

export default Messages;
