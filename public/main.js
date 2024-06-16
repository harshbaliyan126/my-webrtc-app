const divSelectRoom = document.getElementById('select-room');
const divConsultingRoom = document.getElementById('consulting-room');
const inputRoom = document.getElementById('room-number');
const btnGoRoom = document.getElementById('go-room');
const localVideo = document.getElementById('local-video');
const remoteVideo = document.getElementById('remote-video');

const socket = io('http://localhost:8080');

let roomNumber, localStream, remoteStream, rtcPeerConnection, isCaller;

const iceServers = [
  {
    urls: 'turn:103.100.217.56:3478',
    username: 'nawgati',
    credential: 'nawgati@123',
  },
];

/*
 **const streamConstraints = { audio: true, video: true };
 **
 **btnGoRoom.onclick = () => {
 **  if (inputRoom.value === '') {
 **    alert('Please type a room number');
 **  } else {
 **    console.log(inputRoom.value);
 **    navigator.mediaDevices
 **      .getUserMedia(streamConstraints)
 **      .then((stream) => {
 **        localStream = stream;
 **        localVideo.srcObject = stream;
 **      })
 **      .catch((error) => {
 **        console.log('An error ocurred', error);
 **      });
 **    divSelectRoom.style = 'display: none';
 **    divConsultingRoom.style = 'display: block';
 **  }
 **};
 */

const lc = new RTCPeerConnection({ iceServers });
const dc = lc.createDataChannel('channel');
dc.onmessage = (e) => console.log('just got a message ' + e.data);
dc.onopen = (e) => console.log('Connection opened!');
lc.onicecandidate = (e) => {
  console.log(
    'New Ice Candidate! reprinting SDP' + JSON.stringify(lc.localDescription)
  );
  socket.emit('offer', { sdp: lc.localDescription });
};
lc.createOffer()
  .then((o) => lc.setLocalDescription(o))
  .then((a) => console.log('set successfully!'));

socket.on('getAnswer', (data) => {
  lc.setRemoteDescription(data.sdp);
});

lc.ontrack = (event) => {
  if (remoteVideo.srcObject !== event.streams[0])
    remoteVideo.srcObject = event.streams[0];
};
