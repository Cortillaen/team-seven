<template>
  <div id="app-header">
    <h1 class="top-header">News API Application</h1>
    <router-link :to="{ path: 'Analysis', params: {article, articleAnalysis} }" repalce>Analysis</router-link>
    <router-link :to="{ path: 'WordCloud', params: {article, articleAnalysis} }" replace>Word Cloud</router-link>
    <router-link to="/about">About</router-link>
    <input id="UrlInput" type="Text" placeholder="Enter Url Here" />
    <button v-on:click="findArticle" id="UrlButton">Submit</button>
    <router-view/>
  </div>
</template>

<script>
import Analysis from './components/Analysis.vue'
import WordCloud from './components/WordCloud.vue'
function analyze (text) {
  let words = text.split(/[^a-zA-Z0-9']/)
  let analysis = {}
  analysis.wordCounts = []
  analysis.uniqueWords = 0
  analysis.totalWords = words.length
  for (var key in words) {
    if (words[key].length > 4) {
      let tempIndex = analysis.wordCounts.findIndex((element) => { // get index of current word, -1 if new
        return element[0] === words[key]
      })
      if (tempIndex !== -1) { // if not new, increment counter
        analysis.wordCounts[tempIndex][1]++
      } else { // otherwise add to list with counter of 1
        analysis.wordCounts.push([words[key], 1])
        analysis.uniqueWords++
      }
    } else if (words[key] === '') {
      analysis.totalWords--
    }
  }
  analysis.totalChars = text.length
  return analysis
}
export default {
  components: {
    'appAnalysis': Analysis,
    'appWordCloud': WordCloud
  },
  props: ['articleAnalysis', 'article'],
  data () {
    return {
      tempAnalysis: self.articleAnalysis,
      tempArticle: self.article
    }
  },
  methods: {
    findArticle (evt) {
      let self = this
      this.newThing = ''
      let url = document.getElementById('UrlInput').value
      this.newThing = url
      let request = require('request')
      request.get({
        url: 'http://analytics.eventregistry.org/api/v1/extractArticleInfo',
        qs: {
          'url': this.newThing,
          'apiKey': '356ca9e5-1b8e-466e-922c-fe3d15170e35'
        }
      }, function (response, body) {
        try {
          body = JSON.parse(body['body'])
          let title = body['title']
          let articleBody = body['body']
          self.tempAnalysis = analyze(articleBody)
          self.tempArticle = title
          console.log(self.tempAnalysis)
          console.log(self.tempArticle)
        } catch (err) {
          this.article = 'Something is wrong with the URL you entered :('
        }
      })
    }
  }
}
</script>

<style>
#app-header {
font-size: 24px;
font-style: normal;
font-variant: normal;
font-weight: 500;
line-height: 26.4px;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-align: center;
color: #111;
overflow: hidden;
padding-top: 2em;
}
a {
text-decoration: none;
padding: 1em;
color: #111;
}
  #UrlInput {
    width: 80%;
    margin: auto;
    margin-top: 5em;
    float: both;
  }
  #UrlButton {
    float: both;
    margin: auto;
    margin-top: 2em;
  }
</style>
