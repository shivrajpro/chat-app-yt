import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  // console.log("message sent", req.params.id);

  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id; //protect route

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id); //put the message in array, if this is not 1st message
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("error in sendMessage controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
