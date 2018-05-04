<template>
  <div>
    <h1>Analysis</h1>
    <h2>{{ theThing }}</h2>
  </div>
</template>

<script>
export default {
  props: ['theThing'],
  updated:
    function () {
      var request = require('request')
      let urlTarget = this.theThing
      console.log(this.theThing)
      request.get({
        url: 'http://eventregistry.org/json/articleMapper',
        qs: {
          'articleUrl': urlTarget,
          'includeAllVersions': true,
          'deep': true
        }
      }, function (response, body) {
        console.log(body)
      })
    },
  methods: {
    crunch (text) {
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
</style>
