import ChatRoomHeaderComponent from "./ChatRoom/ChatRoomHeaderComponent";
import ChatRoomBodyComponent from "./ChatRoom/ChatRoomBodyComponent";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getChatRoomById } from "../services/chatRoomServices";
import { addChatRoom } from "../redux/actions/chatRoomActions";

function ChatRoomComponent() {
  const dispatch = useDispatch();
  const { selectedRoomIndex, chatRoomsData } = useSelector(
    (state) => state.chatRoom
  );
  const { userData } = useSelector((state) => state.user);
  const [room, setRoom] = useState();

  useEffect(() => {
    if (selectedRoomIndex > -1) {
      const roomId = chatRoomsData[selectedRoomIndex]._id;
      getChatRoomById(roomId).then((res) => {
        setRoom(res.data);
        dispatch(addChatRoom(res.data));
      });
    }
  }, [selectedRoomIndex]);
  return (
    <div style={{ marginRight: -12 }}>
      {selectedRoomIndex > -1 && room && (
        <>
          <ChatRoomHeaderComponent userData={userData} roomData={room} />
          <ChatRoomBodyComponent
            roomData={room}
            userData={userData}
            selectedRoomIndex={selectedRoomIndex}
          />
        </>
      )}
    </div>
  );
}

export default ChatRoomComponent;
