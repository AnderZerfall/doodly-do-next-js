import { Canvas } from '@components/Canvas/Canvas';
import { io } from 'socket.io-client';

export default function HomePage() {
    const socket = io();
  return (
    <Canvas />
  );
}
