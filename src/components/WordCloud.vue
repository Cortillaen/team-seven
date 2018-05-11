<template>
  <div>
    <h2>{{ articleTitle }}</h2>
    <canvas></canvas>
  </div>
</template>

<script>
const wordcloud = require('wordcloud');

export default {
  props: ['articleData', 'articleTitle'],
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
  canvas {
    height: 600px;
    width: 800px;
  }
</style>
