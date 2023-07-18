import { Image } from "react-bootstrap";

function MessageComponent({
  isMe = false,
  inGroup = false,
  readers = [],
  msg,
  roomData,
}) {
  const justifyContentValue = !isMe ? "start" : "end";
  return (
    <div
      style={{
        justifyContent: justifyContentValue,
        marginBottom: readers.length > 1 ? -20 : 2,
      }}
      className="d-flex align-items-center position-relative"
    >
      {!isMe && inGroup && (
        <Image
          style={{
            width: 32,
            height: 32,
            objectFit: "cover",
            borderRadius: "50%",
            marginRight: 12,
          }}
          src={msg.owner.avatar}
        />
      )}
      <div
        style={{
          borderRadius: 40,
          marginRight: 20,
        }}
        className={
          isMe ? " my-bg-primary-color p-2 px-3" : "my-bg-third-color p-2 px-3"
        }
      >
        <p
          style={{
            maxWidth: "400px",
            wordBreak: "break-all",
          }}
          className="my-text-primary m-0"
        >
          {msg?.content}
        </p>
      </div>
      {readers.length > 0 && (
        <div
          className="position-absolute"
          style={{
            bottom: readers.length > 1 ? -20 : 0,
            maxWidth: "100px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            right: 0,
          }}
        >
          {readers.map((reader, index) => {
            return (
              <Image
                key={index}
                style={{
                  width: 14,
                  height: 14,
                  objectFit: "cover",
                  borderRadius: "50%",
                  marginRight: 4,
                }}
                src={
                  roomData.members.find((member) => member._id === reader)
                    .avatar
                }
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MessageComponent;
