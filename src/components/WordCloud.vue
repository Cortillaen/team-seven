<template>
  <div>
    <h2 id="articleTitle">{{ articleTitle }}</h2>
    <canvas></canvas>
  </div>
</template>

<script>
const wordcloud = require('wordcloud');

export default {
  props: ['articleData'],
  data: function () {
    return {
      articleTitle: ''
    }
  },
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
      if (this.$parent.dataString === '') {
        this.$parent.dataString = this.articleData;
      }
      this.articleTitle = this.articleData.slice(0, this.articleData.indexOf('|'));
      this.makeWordCloud(JSON.parse(this.articleData.slice(this.articleData.indexOf('|') + 1))['wordCounts']);
    },
  updated:
    function () {
      this.articleTitle = this.articleData.slice(0, this.articleData.indexOf('|'));
      this.makeWordCloud(JSON.parse(this.articleData.slice(this.articleData.indexOf('|') + 1))['wordCounts']);
    }
}
</script>

<style>
  canvas {
    height: 600px;
    width: 800px;
    border: solid black 5px;
    margin-bottom: 20px
  }
  #articleTitle {
    font-weight: bold;
    text-decoration: underline;
    margin-bottom: 15px;
  }
</style>
