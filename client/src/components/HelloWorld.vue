<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <form>
      <label><h3>Enter a seller name</h3></label>
      <input type="text" required v-model="seller" />
      <br />
      <button @click.prevent="newSale">sold an item!</button>
    </form>
    <h3>Total Sales</h3>
    <h1>{{ totalSales }}</h1>
    <h3>Leaderboard</h3>
    <ul v-for="(entry, index) in leaderboard" :key="entry[0]">
      <li>
        <b>{{ index + 1 }}.</b> <i>{{ entry[0] }} = </i>{{ entry[1] }}
      </li>
    </ul>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      socket: {},
      seller: "",
      totalSales: 0,
      leaderboard: [],
    };
  },
  created() {
    this.socket = io("http://localhost:3000");
  },
  mounted() {
    this.socket.on("totalSales", (totalSales) => {
      this.totalSales = totalSales;
    });
    this.socket.on("leaderboard", (leaderboard) => {
      this.leaderboard = leaderboard;
    });
  },
  methods: {
    newSale() {
      this.socket.emit("newSale", this.seller);
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
label {
  display: block;
  margin-top: 1em;
  margin-bottom: 1em;
}
input {
  margin-top: 0.25em;
}
button {
  margin-top: 0.5em;
}
h1 {
  margin-top: 0.25em;
}
h3 {
  margin-bottom: 0.25em;
}
</style>
