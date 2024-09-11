import { io, Socket } from "socket.io-client";

const socketInitializer = (customIdInput:string)=>
{
    console.log('customIdInput ....')
    console.log(customIdInput)
    // return io("http://52.252.1.225:3000", {query:{customId:customIdInput}})
    return io("http://192.168.1.32:3000", {query:{customId:customIdInput}})
}

export default socketInitializer;