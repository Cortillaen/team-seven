<template>
  <div>
    <h1>Analysis</h1>
    <!-- <h2>{{ articleData }}</h2> -->
    <ul id="analysisData"></ul>
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
