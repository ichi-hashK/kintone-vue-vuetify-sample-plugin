<template>
  <v-container class="text-center">
    <h1>こんにちは、Vue ＆ Vuetify！</h1>
    <v-btn color="primary" @click="sayHello">クリックしてね</v-btn>
  </v-container>
</template>

<script setup>
function sayHello() {
  alert("やっほ〜！Vuetifyのボタンが反応したよ🎉");
}
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}
</style>
