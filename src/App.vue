<template>
  <div id="app-header">
    <h1 class="top-header">News API Application</h1>
    <div id="nav">
      <router-link :to="{ name: 'Analysis', params: { 'articleData': dataString } }">Analysis</router-link>
      <router-link :to="{ name: 'WordCloud', params: { 'articleData': dataString } }">Word Cloud</router-link>
      <router-link :to="{ name: 'About' }">About</router-link>
    </div>
    <input id="UrlInput" type="Text" placeholder="Enter Url Here" />
    <button v-on:click="findArticle" id="UrlButton">Submit</button>
    <router-view/>
  </div>
</template>

<script>
import Analysis from './components/Analysis.vue'

function analyze (text) {
  let words = text.split(/[^a-zA-Z0-9']/);
  let analysis = {};

  analysis.wordCounts = [];
  analysis.uniqueWords = 0;
  analysis.totalWords = words.length;

  for (var key in words) {
    if (words[key].length > 4) {
      let tempIndex = analysis.wordCounts.findIndex((element) => { // get index of current word, -1 if new
        return element[0] === words[key];
      });

      if (tempIndex !== -1) { // if not new, increment counter
        analysis.wordCounts[tempIndex][1]++;
      } else { // otherwise add to list with counter of 1
        analysis.wordCounts.push([words[key], 1]);
        analysis.uniqueWords++;
      }
    } else if (words[key] === '') {
      analysis.totalWords--;
    }
  }
  analysis.totalChars = text.length;
  return analysis;
}

export default {
  components: {
    Analysis
  },
  data: function () {
    return {
      articleData: '',
      dataString: '',
      analysisString: '',
      wordcloudString: ''
    }
  },
  // props: ['dataString'],
  methods: {
    findArticle (evt) {
      let self = this
      let url = document.getElementById('UrlInput').value
      document.getElementById('UrlButton').innerText = 'Working.  Please wait...';

      var request = require('request')
      request.get({
        url: 'http://eventregistry.org/json/articleMapper',
        qs: {
          'articleUrl': url,
          'includeAllVersions': false,
          'deep': false,
          'apiKey': '6969dae1-7e3c-48df-87e2-9bc69d0fdd5d'
        }
      }, function (response, body) {
        let articleID = JSON.parse(body.toJSON()['body'])[url];
        request.get({
          url: ('http://eventregistry.org/json/article?action=getArticle&articleUri=' + articleID + '&resultType=info&infoArticleBodyLen=-1&callback=JSON_CALLBACK'),
          qs: {
            'articleUrl': url,
            'includeAllVersions': false,
            'deep': false,
            'apiKey': '6969dae1-7e3c-48df-87e2-9bc69d0fdd5d'
          }
        }, (response, body) => {
          // USE ARTICLE ID TO GET ARTICLE TEXT
          document.getElementById('UrlButton').innerText = 'Submit';
          let articleText = JSON.parse(body.toJSON()['body'].slice(14, -1))[articleID]['info']['body'];
          self.articleData = analyze(articleText);
          console.log(self.articleData);
          self.dataString = JSON.stringify(self.articleData);
          self.wordcloudString = '/wordcloud/' + JSON.stringify(self.articleData);
          self.analysisString = '/analysis/' + JSON.stringify(self.articleData);
          // console.log('dataString: ' + self.dataString);
          // console.log(self);
          self.$router.push({name: 'Analysis', params: {articleData: self.dataString}});
          // self.$router.push({name: 'Analysis', params: {articleData: self.articleData}});
        });
      }, function (response, body) {
        console.log('ERROR');
        console.log(response);
        console.log(body);
      });
    },
    test () {
      console.log('Test success');
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
    width: 80%;
    margin: auto;
    margin-top: 5em;
  }
</style>
