<template>
  <div>
    <h1>Analysis</h1>
    <!-- <h2>{{ articleData }}</h2> -->
    <div id="analysis">
      <ul id="analysisData"></ul>
      <ul id="wordCounts"></ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['articleData'],
  mounted:
    function () {
      console.log('From analysis: ', this.articleData);
      let dataObj = JSON.parse(this.articleData);
      let ul = document.getElementById('analysisData');

      // Analysis synopsis
      let li = document.createElement('li');
      li.innerText = 'Total Words: ' + dataObj.totalWords;
      ul.appendChild(li);
      li = document.createElement('li');
      li.innerText = 'Unique Words: ' + dataObj.uniqueWords;
      ul.appendChild(li);
      li = document.createElement('li');
      li.innerText = 'Total Characters: ' + dataObj.totalChars;
      ul.appendChild(li);

      // Analysis word counts
      ul = document.getElementById('wordCounts');
      let words = dataObj.wordCounts;
      for (var index in words) {
        li = document.createElement('li');
        li.innerText = words[index][0] + ': ' + words[index][1];
        ul.appendChild(li);
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

  #analysisData {
    font-size: 28px;
    font-weight: 400;
    line-height: 31.5px;
  }

  #wordCounts {
    font-size: 20px;
    font-weight: 300;
    line-height: 21.5px;
  }

  ul {
    list-style-position: inside;
    list-style-type: none;
    font-style: normal;
    font-variant: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #111;
    padding: 15px 15px 0px 15px;
    margin: 0px;
  }

  #analysis {
    margin: auto;
    width: 50%;
    border: 5px solid grey;
  }
</style>
