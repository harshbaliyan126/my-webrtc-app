const divSelectRoom = document.getElementById('select-room');
const divConsultingRoom = document.getElementById('consulting-room');
const inputRoom = document.getElementById('room-number');
const btnGoRoom = document.getElementById('go-room');
const localVideo = document.getElementById('local-video');
const remoteVideo = document.getElementById('remote-video');


let roomNumber, localStream, remoteStream, rtcPeerConnection, isCaller;

const iceServers = {
	'iceServers': [
		{'urls': 'stun:stun.services.mozilla.com'},
		{'urls': 'stun:stun.l.google.com:19302'},
	]
}

const streamConstraints = {audio: true, video: true};


btnGoRoom.onclick = () => {
	if(inputRoom.value === '') {
		alert('Please type a room number');
	} else {
		console.log(inputRoom.value)
		navigator.mediaDevices.getUserMedia(streamConstraints)
			.then(stream => {
				localStream = stream;
				localVideo.srcObject = stream;
			})
			.catch(error => {
				console.log('An error ocurred', error);
			});
		divSelectRoom.style = 'display: none';
		divConsultingRoom.style = 'display: block';
	}
}
