<template>
  <div id="app">
    <h1 id="top-header">News API Application</h1>
    <div id="app-nav">
      <router-link :to="{ name: 'Analysis', params: { 'articleData': dataString } }">Analysis</router-link>
      <router-link :to="{ name: 'WordCloud', params: { 'articleData': dataString } }">Word Cloud</router-link>
      <router-link :to="{ name: 'About' }">About</router-link>
    </div>
    <div id="app-body">
      <input id="UrlInput" type="Text" placeholder="Enter Url Here" />
      <button v-on:click="findArticle" id="UrlButton">Submit</button>
      <router-view :key="$route.fullPath" />
    </div>
  </div>
</template>

<script>
import Analysis from './components/Analysis.vue'

const daleChall = require('dale-chall');
const syllable = require('syllable');

function analyze (text) {
  let sentences = text.split(/[.?!]\s/g); // Split on punctuation
  let valuableChars = text.replace(/\W+/g, ''); // Only alphanumeric characters

  let valuableWords = text.trim() // Remove whitespace at start and end.
  valuableWords = valuableWords.toLowerCase(); // Lowercase all words
  valuableWords = valuableWords.replace(/[ ]{2,}/gi, ' '); // Convert multiple whitespace values to a single space
  valuableWords = valuableWords.split(' '); // Split on whitespace

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

  /*
  Get number of 'difficult' words for dale-chall daleChall
  Get syllable count for flesch–kincaid formula
  Get count of words with >= 3 syllables for smog formula
  */
  analysis.difficultWords = 0;
  analysis.syllableCount = 0;
  analysis.polySyllableCount = 0;
  for (var i = 0; i < valuableWords.length; i++) {
    var numSyllables = syllable(valuableWords[i]);
    analysis.syllableCount += numSyllables;
    if (numSyllables >= 3) {
      analysis.polySyllableCount++
    }
    if (daleChall.includes(valuableWords[i]) === false) {
      analysis.difficultWords++;
    }
  }

  analysis.totalChars = text.length;
  analysis.totalValuableChars = valuableChars.length;
  analysis.sentenceCount = sentences.length;
  analysis.totalValuableWords = valuableWords.length;
  return analysis;
}

export default {
  components: {
    Analysis
  },
  data: function () {
    return {
      dataString: ''
    }
  },
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
          // fetch article id, then the article
          document.getElementById('UrlButton').innerText = 'Submit';
          let articleText = JSON.parse(body.toJSON()['body'].slice(14, -1))[articleID]['info']['body'];
          let titleString = JSON.parse(body.toJSON()['body'].slice(14, -1))[articleID]['info']['title'];
          // process article text and set up links
          let articleData = analyze(articleText);
          self.dataString = titleString + '|' + JSON.stringify(articleData);
          self.$router.push({name: 'Analysis', params: {'articleData': self.dataString}});
        });
      }, function (response, body) {
        console.err('ERROR');
        console.err(response);
        console.err(body);
      });
    }
  }
}
</script>

<style>
  html {
    background-color: #0cd;
  }
  body {
    background-color: transparent;
  }
  #app {
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
    padding: 2em;
    height: 100%;
  }
  #app-nav {
    padding: 1em;
    margin: auto;
  }
  #top-header {
    font-size: 72px;
    font-weight: bold;
    color: #fff;
  }
  #app-body {
    background-color: #fff;
    padding: 2em;
    border-radius: 20px;
    overflow: hidden;
    width: max-content;
    margin: auto;
  }
  a {
    text-decoration: none;
    padding: 0.5em;
    margin: auto;
    color: #111;
    background: #8dc;
    border-radius: 10px;
  }
  a:hover {
    color: #fff;
  }
  #UrlInput {
    width: 800px;
    margin: auto;
    margin-top: 5em;
    float: both;
  }
  #UrlButton:hover {
    color: #fff;
  }
  #UrlButton {
    float: both;
    margin: 0.5em 1em 1em 1em;
    padding: 0.5em;
    border-radius: 10px;
    background: #8dc;
  }
</style>
