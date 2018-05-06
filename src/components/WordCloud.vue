<template>
  <div>
    <h1>Word Cloud</h1>
    <canvas id='canvas'/>
  </div>
</template>

<script>
const wordcloud = require('wordcloud')
export default {
  name: 'WordCloud',
  props: ['article', 'articleAnalysis'],
  updated: function () {
    console.log(this.articleAnalysis)
    let wordList = this.articleAnalysis['wordCounts']
    JSON.parse(wordList['wordCounts'])
    wordcloud(document.getElementById('canvas'), {
      list: wordList.map((elem) => [elem[0], elem[1] * 10])
    })
  }
}
</script>

<style>
</style>
