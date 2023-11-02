import React, { useCallback, useEffect, useRef } from "react";
import { useSocket } from "../contexts/SocketProvider";
import { useNavigate } from "react-router-dom";

export default function Lobby() {
  const emailInputRef = useRef();
  const roomIdInputRef = useRef();
  const socket = useSocket();
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const data = {
        email: emailInputRef.current.value,
        roomId: roomIdInputRef.current.value,
      };
      socket.emit("room:join", data);
    },
    [socket, emailInputRef.current, roomIdInputRef.current]
  );
  const navigate = useNavigate();

  const handleJoinRoom = useCallback((data) => {
    const { email, roomId } = data;
    navigate(`/room/${roomId}`);
  }, []);

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket]);
  return (
    <div>
      <h1>Lobby</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="#Email">Email ID</label>
        <input
          ref={emailInputRef}
          id="Email"
          type="email"
          name="email"
          placeholder="Email"
        />
        <br />
        <label htmlFor="#RoomId">Room ID</label>
        <input
          ref={roomIdInputRef}
          id="RoomId"
          type="roomId"
          name="roomId"
          placeholder="roomId"
        />
        <br />
        <button type="submit">Join</button>
      </form>
    </div>
  );
}
