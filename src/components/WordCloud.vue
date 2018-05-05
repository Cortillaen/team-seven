<template>
  <div>
    <h1>Word Cloud</h1>
    <canvas></canvas>
  </div>
</template>

<script>
const wordcloud = require('wordcloud');

export default {
  props: ['articleData'],
  methods: {
    makeWordCloud (wordList) {
      let canvas = document.getElementsByTagName('canvas')[0];
      canvas.width = 800;
      canvas.height = 600;
      wordcloud(canvas, {
        list: wordList.map((elem) => [elem[0], elem[1]]),
        weightFactor: 14
      });
    }
  },
  mounted:
    function () {
      this.makeWordCloud(JSON.parse(this.articleData)['wordCounts']);
    },
  updated:
    function () {
      this.makeWordCloud(JSON.parse(this.articleData)['wordCounts']);
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
    height: 600px;
    width: 800px;
  }
</style>
