<template>
  <div>
    <h3>{{ articleTitle }}</h3>
    <div id="analysisDisplay"></div>
  </div>
</template>

<script>
const BarChart = require('barchart');

/*
  Input:  Takes number of words, characters, and sentences as parameters.
  Output: Returns approximate representation of US grade-level needed to
          comprehend the text.
*/
const automatedReadability = require('automated-readability');

export default {
  props: ['articleData', 'articleTitle'],
  mounted:
    function () {
      let returnedCounts = JSON.parse(this.articleData);
      let qualityIndex = 0;
      let quantityIndex = 0;
      let durationIndex = 0;
      if (returnedCounts['uniqueWords'] < 500) {
        qualityIndex = returnedCounts['uniqueWords'] / 500.00 * 100;
      } else { qualityIndex = 100; }
      if (returnedCounts['totalWords'] < 1500) {
        quantityIndex = returnedCounts['totalWords'] / 1500.00 * 100;
      } else { quantityIndex = 100; }
      if (returnedCounts['totalChars'] < 10000) {
        durationIndex = returnedCounts['totalChars'] / 10000.00 * 100;
      } else { durationIndex = 100; }

      let bc = new BarChart({
        barColors: ['#00AB8E', '#33CCDD', '#ffffff'],
        minimum: 0,
        maximum: 100,
        width: 700,
        height: 500,
        chartPadding: 20,
        barSpacing: 100,
        labelSize: 20,
        container: document.getElementById('analysisDisplay')
      });

      bc.data([[
        {'name': 'Quality Index', 'value': qualityIndex},
        {'name': 'Quantity Index', 'value': quantityIndex},
        {'name': 'Duration Index', 'value': durationIndex}
      ]]
      );

      console.log(automatedReadability({
        sentence: returnedCounts['sentenceCount'],
        word: returnedCounts['totalWords'],
        character: returnedCounts['totalChars']
      }));
    },
  updated:
    function () {
      let returnedCounts = JSON.parse(this.articleData);
      let qualityIndex = 0;
      let quantityIndex = 0;
      let durationIndex = 0;
      if (returnedCounts['uniqueWords'] < 500) {
        qualityIndex = returnedCounts['uniqueWords'] / 500.00 * 100;
      } else { qualityIndex = 100; }
      if (returnedCounts['totalWords'] < 1500) {
        quantityIndex = returnedCounts['totalWords'] / 1500.00 * 100;
      } else { quantityIndex = 100; }
      if (returnedCounts['totalChars'] < 10000) {
        durationIndex = returnedCounts['totalChars'] / 10000.00 * 100;
      } else { durationIndex = 100; }

      var bc = new BarChart({
        barColors: ['#00AB8E', '#33CCDD', '#ffffff'],
        minimum: 0,
        maximum: 100,
        width: 700,
        height: 500,
        chartPadding: 20,
        barSpacing: 100,
        labelSize: 20,
        container: document.getElementById('analysisDisplay')
      });

      bc.data([[
        {'name': 'Quality Index', 'value': qualityIndex},
        {'name': 'Quantity Index', 'value': quantityIndex},
        {'name': 'Duration Index', 'value': durationIndex}
      ]]
      );
    }
}
</script>
<style>
  div {
    margin: auto;
    width: 100%;
  }
</style>
