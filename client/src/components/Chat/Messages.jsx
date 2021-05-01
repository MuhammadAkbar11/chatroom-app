import React from "react";

const Messages = ({ messages }) => {
  return (
    <div className="message-container p-2">
      <h1>Message</h1>
      <div>
        {messages.map((msg, index) => {
          const key = index;

          return (
            <div key={key}>
              <small>{msg.text}</small>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Messages;
