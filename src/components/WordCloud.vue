<template>
  <div>
    <h1>Word Cloud</h1>
    <canvas></canvas>
  </div>
</template>

<script>
const wordcloud = require('wordcloud');

export default {
  name: 'HelloWorld',
  data () {
    return {}
  },
  methods: {
    makeWordCloud (wordList) {
      wordcloud(document.getElementById('canvas'), {
        list: wordList.map((elem) => [elem[0], elem[1] * 10])
      });
    }
  }
}
</script>

<style>
  #UrlInput {
    width: 80%;
    margin: auto;
    margin-top: 5em;
    float: both;
  }
  #UrlButton {
    float: both;
    width: 80%;
    margin: auto;
    margin-top: 5em;
  }
  canvas {
    height: 800px;
    width: 1200px;
  }
</style>
