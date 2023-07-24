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
  const [fetchApi, setfetchApi] = useState({ fetch: true, count: 0 });

  const { userData } = useSelector((state) => state.user);
  const [room, setRoom] = useState();

  const handleScrollIntoView = () => {
    const element = document.getElementById("intoView");
    function checkOverflow() {
      const chatRoomBody = document.getElementById("chatRoomBody");
      if (!chatRoomBody) return;
      var curOverflow = chatRoomBody.style.overflow;

      if (!curOverflow || curOverflow === "visible")
        chatRoomBody.style.overflow = "hidden";

      var isOverflowing =
        chatRoomBody.clientWidth < chatRoomBody.scrollWidth ||
        chatRoomBody.clientHeight < chatRoomBody.scrollHeight;

      chatRoomBody.style.overflow = curOverflow;

      return isOverflowing;
    }

    if (element && checkOverflow() === true) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (selectedRoomIndex > -1 && fetchApi.fetch) {
      const roomId = chatRoomsData[selectedRoomIndex]._id;
      const messagesCountPerPage = 30;
      const chatRoomBody = document.getElementById("chatRoomBody");
      let scrollPosition = null;
      if (chatRoomBody) {
        scrollPosition = chatRoomBody.scrollHeight - chatRoomBody.scrollTop;
      }

      getChatRoomById(
        roomId,
        messagesCountPerPage,
        fetchApi.count * messagesCountPerPage
      ).then((res) => {
        setRoom(res.data);
        dispatch(addChatRoom(res.data));

        if (scrollPosition) {
          // to stay where the scrollbar was instead of at the top
          setTimeout(() => {
            chatRoomBody.scrollTop = chatRoomBody.scrollHeight - scrollPosition;
          }, 0.00000000000000000000000000001);
        }
        if (fetchApi.count === 0) handleScrollIntoView();
      });
    }
  }, [selectedRoomIndex, fetchApi]);

  return (
    <div>
      {selectedRoomIndex > -1 && room && (
        <>
          <ChatRoomHeaderComponent userData={userData} roomData={room} />
          <ChatRoomBodyComponent
            roomData={room}
            userData={userData}
            selectedRoomIndex={selectedRoomIndex}
            setfetchApi={setfetchApi}
            handleScrollIntoView={handleScrollIntoView}
          />
        </>
      )}
    </div>
  );
}

export default ChatRoomComponent;
