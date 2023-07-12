import { Card, Image, Row } from "react-bootstrap";

function MessageComponent({
  sender = "asdf",
  content = "aldskjf",
  timestamp = "alskfj",
  isMe = false,
  inGroup = false,
  read = false,
  readers = [],
}) {
  const justifyContentValue = !isMe ? "start" : "end";
  const cssRead = {};
  if (read)
    if (isMe) cssRead.top = "100%";
    else cssRead.bottom = "0";

  return (
    <div
      style={{
        justifyContent: justifyContentValue,
      }}
      className="d-flex align-items-center mb-1 position-relative"
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
          src="/img/ava.jpg"
        />
      )}
      <div
        style={{
          borderRadius: 40,
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
          className="my-text-primary m-0 "
        >
          adsfasdf
        </p>
      </div>
      {read && (
        <div
          className="position-absolute"
          style={{
            // bottom: 0,
            maxWidth: "100px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            right: 0,
            // top: "100%",
            ...cssRead,
          }}
        >
          <Image
            style={{
              width: 14,
              height: 14,
              objectFit: "cover",
              borderRadius: "50%",
              marginRight: 4,
            }}
            src="/img/ava.jpg"
          />
          <Image
            style={{
              width: 14,
              height: 14,
              objectFit: "cover",
              borderRadius: "50%",
            }}
            src="/img/ava.jpg"
          />
          <Image
            style={{
              width: 14,
              height: 14,
              objectFit: "cover",
              borderRadius: "50%",
              marginRight: 4,
            }}
            src="/img/ava.jpg"
          />
          <Image
            style={{
              width: 14,
              height: 14,
              objectFit: "cover",
              borderRadius: "50%",
            }}
            src="/img/ava.jpg"
          />
        </div>
      )}
    </div>
  );
}

export default MessageComponent;
