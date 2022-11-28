const socket = io();

const searchParams = new URLSearchParams(window.location.search)

const username = searchParams.get('username');
const room = searchParams.get('selected_room');

socket.emit('select_room', {username, room}, (response) => {response.forEach((data) => createMessage(data))
})


const message = document.getElementById('message').addEventListener('keypress', (event) => {
    if(event.key === 'Enter'){
        const message = event.target.value;

        const data = {
            username,
            room,
            message
        }
        socket.emit('message', data)
        event.target.value = ''
    }
})

const root = document.getElementById('root')
socket.on('message', (data) => {
    console.log(data)
    createMessage(data)
})


function createMessage(data){
    
    root.innerHTML += `<h1>${data.text}<h1>`
}