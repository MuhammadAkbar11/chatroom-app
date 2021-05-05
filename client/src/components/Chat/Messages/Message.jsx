import React from "react";

const Message = ({ message: { name, user_id, text }, currentUserId }) => {
  let isSentByCurrentUser = false;
  const trimmedName = name.trim();
  if (+user_id === +currentUserId) {
    isSentByCurrentUser = true;
  }
  return isSentByCurrentUser ? (
    <div className=" d-flex mt-1 py-2 mr-2 justify-content-end message-container current-user  ">
      <div className="message-box  p-2 px-3  rounded ">
        {/* <p className="message-from my-0  ">{trimmedName}</p> */}
        <p className="message-text my-0 text-white ">{text}</p>
      </div>
    </div>
  ) : (
    <div className=" d-flex mt-1 py-2 mr-2 justify-content-start message-container   ">
      <div className="message-box  p-2 px-3  rounded ">
        <p className="message-from my-0  ">{trimmedName}</p>
        <p className="message-text my-0 text-white ">{text}</p>
      </div>
    </div>
  );
};

export default Message;
