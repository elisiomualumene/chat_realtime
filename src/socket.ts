import { io } from "./http";

interface RoomUser {
    socket_id: string;
    username: string,
    room: string;
}

interface mes {
    text: string;
    room: string
}

const user: RoomUser[] = [];
let messages: mes[] = []

io.on('connection', socket => {
    socket.on('select_room', (data, callback) => {
        //console.log(data)

        socket.join(data.room)

        const userInRoom = user.find(user => user.username === data.username && user.room === data.room)

        if(userInRoom){
            userInRoom.socket_id = socket.id
        }else{
            user.push({
                room: data.room,
                socket_id: socket.id,
                username: data.username
            })
        }
        const allmessages = getMessages(data.room);
        callback(allmessages)
    })

    socket.on('message', data => {

        const me: mes = {
            text: data.message,
            room: data.room
        }

        messages.push(me);

        io.to(data.room).emit('message', me)
    })
})

function getMessages(room: string){
    const messageRoom = messages.filter(message => message.room === room)
    return messageRoom;
}