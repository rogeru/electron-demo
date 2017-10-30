// renderer process (chromium)
const fs = require('fs')

// List files in current folder
const el = document.getElementById('files')
fs.readdir(__dirname, (err, items) => {
  items.forEach(item => {
    let li = document.createElement('li')
    li.innerHTML = item
    el.appendChild(li)
  })
})

// Create Circuit SDK client instance
const client = Circuit.Client({
  client_id: 'b7023420677448efb9db025e33de8552'
})

// Login the user using OAuth 2.0 Resource Owner Grant Type
// The preferred authentication types for an electron app is:
// - Authorization Type Grant for user-based apps
// - Client Credentials Type Grant for electron bots
function login() {
  client.logon({
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  })
    .then(console.log)
    .catch(console.error)
}

// Send a text message to a user in a direct conversation
function send() {
  client.getDirectConversationWithUser(document.getElementById('email').value, true)
    .then(conv => client.addTextItem(conv.convId, document.getElementById('message').value))
    .then(console.log)
    .catch(console.error)
}

// Call a user in a direct conversation
function call() {
  client.makeCall(document.getElementById('email').value)
    .then(call => _callId = call.callId)
    .catch(console.error)
}

let _callId;
client.addEventListener('callStatus', evt => {
  if (_callId && _callId !== evt.call.callId) {
    console.log('callStatus event for a different call, ignore it');
    return;
  }
  _callId = evt.call.callId;

  if (evt.reason === 'remoteStreamUpdated') {
    // Attach the stream to the audio element
    remoteAudio = document.getElementById('remoteAudio');
    remoteAudio.src = evt.call.remoteAudioUrl;
    return;
  }
});

// For debug purposes log all Circuit SDK events
client.supportedEvents.forEach(e => client.addEventListener(e, console.log))
