import React from "react";

const Message = ({ message: { name, user_id, text }, userId }) => {
  let isSentByCurrentUser = false;
  const trimmedName = name.trim();
  console.log(typeof user_id, typeof userId);
  if (+user_id === +userId) {
    console.log("okk");
    isSentByCurrentUser = true;
  }
  console.log(isSentByCurrentUser);
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
