// src/socket.js
import { io } from "socket.io-client";

// Substitua pela URL do seu backend
const socket = io("http://localhost:4000");

export default socket;
