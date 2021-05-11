<template>
  <div class="home">
    <div>
      <ul>
        <li v-for="(message, index) in messages" :key="index">{{message}}</li>
      </ul>
    </div>
    <input type="text" v-model="message" />
    <button @click="handleSubmitNewMessage">send</button>
  </div>
</template>

<script>
import io from "socket.io-client"
const url = "http://localhost:3000"
const socket = io(url)
export default {
  name: 'Home',
  data() {
    return {
      message: "",
      messages: [],
      sender: ""
    }
  },
  methods: {
    handleSubmitNewMessage() {
      socket.emit("new-message-to-server", {
        message: this.message,
        sender: this.sender
      })
    }
  },
  mounted() {
    this.sender = prompt()
    socket.on("new-message-to-client", data => {
      this.messages.push(data)
    })
    socket.on("all-messages-to-client", data => {
      this.messages = data
    })
  }
}
</script>
