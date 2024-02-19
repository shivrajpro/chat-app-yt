import Conversation from "../models/conversation.model";


export const sendMessage = async (req, res) => {
  console.log("message sent", req.params.id);

  try {
    const {message} = req.body;
    const {id}=req.params;
    const senderId = req.user._id; //protect route

    let conversation = await Conversation.findOne({
      participants: {$all: [senderId, receiverId]},
    })

    if(!conversation){
      conversation = await Conversation.create({
        participants:[senderId, receiverId],
      })
    }
  } catch (error) {
    console.log("error in sendMessage controller", error.message);
    res.status(500).json({error: "internal server error"})
  }
};
