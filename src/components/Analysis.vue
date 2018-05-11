<template>
  <div>
    <h2 id="articleTitle">Article Title</h2>
    <p>{{ articleTitle }}</p>
    <div id="statsDisplay">
      <h2 id="statsTitle">Article Statistics</h2>
    </div>
    <div id="gradeDisplay">
      <h2 id="gradeTitle">Writing Grade Level</h2>
    </div>
  </div>
</template>

<script>

const BarChart = require('barchart');
const automatedReadability = require('automated-readability');
const colemanLiau = require('coleman-liau');
const daleChallFormula = require('dale-chall-formula');
const fleschKincaid = require('flesch-kincaid');
const smogFormula = require('smog-formula');

export default {
  props: ['articleData', 'articleTitle'],
  mounted:
    function () {
      this.buildCharts();
    },
  updated:
    function () {
      this.buildCharts();
    },
  methods: {
    buildCharts () {
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
        maximum: Math.max(quantityIndex, qualityIndex, durationIndex),
        width: 700,
        height: 400,
        chartPadding: 20,
        barSpacing: 100,
        labelSize: 20,
        container: document.getElementById('statsDisplay')
      });

      bc.data([[
        {'name': 'Quality Index', 'value': qualityIndex},
        {'name': 'Quantity Index', 'value': quantityIndex},
        {'name': 'Duration Index', 'value': durationIndex}
      ]]
      );

      // Find automated-readability grade level
      let ariScore = automatedReadability({
        sentence: returnedCounts['sentenceCount'],
        word: returnedCounts['totalValuableWords'],
        character: returnedCounts['totalValuableChars']
      });
      ariScore = Math.ceil(ariScore); // Formula rounds up to nearest int
      if (ariScore >= 16) {
        ariScore = 16;
      }

      // Find coleman-liau grade level
      let clScore = colemanLiau({
        sentence: returnedCounts['sentenceCount'],
        word: returnedCounts['totalValuableWords'],
        letter: returnedCounts['totalValuableChars']
      });
      if (clScore >= 16) {
        clScore = 16;
      }

      // Find dale-chall grade level
      let dcScore = daleChallFormula({
        word: returnedCounts['totalValuableWords'],
        sentence: returnedCounts['sentenceCount'],
        difficultWord: returnedCounts['difficultWords']
      });
      dcScore = daleChallFormula.gradeLevel(dcScore);
      if (dcScore[1] === Infinity) {
        dcScore = dcScore[0];
      } else dcScore = dcScore[1];

      // Find flecsh-kincaid grade level
      let fkScore = fleschKincaid({
        sentence: returnedCounts['sentenceCount'],
        word: returnedCounts['totalValuableWords'],
        syllable: returnedCounts['syllableCount']
      });
      if (fkScore >= 16) {
        fkScore = 16;
      }

      // Find SMOG grade level
      let sScore = smogFormula({
        sentence: returnedCounts['sentenceCount'],
        polysillabicWord: returnedCounts['polySyllableCount']
      });
      if (sScore >= 16) {
        sScore = 16;
      }

      let scoreChart = new BarChart({
        autoScale: true,
        minimum: 1,
        maximum: Math.max(ariScore, clScore, dcScore, fkScore, sScore),
        width: 800,
        height: 400,
        chartPadding: 20,
        barSpacing: 10,
        labelSize: 20,
        container: document.getElementById('gradeDisplay')
      });

      scoreChart.data([[
        {'name': 'Automated Readability', 'value': ariScore},
        {'name': 'Coleman Liau', 'value': clScore},
        {'name': 'Dale Chall', 'value': dcScore},
        {'name': 'Flesch Kincaid', 'value': fkScore},
        {'name': 'SMOG', 'value': sScore}
      ]]
      );
    }
  }
}
</script>
<style>
  div {
    margin: auto;
    width: 100%;
  }
  #gradeDisplay, #statsDisplay {
    width: 750px;
    border: solid black 5px;
    margin-bottom: 20px
  }
  p {
    font-size: 150%;
    font-weight: bold;
    text-decoration: underline;
  }
  h2 {
    margin-bottom: 15px
  }
</style>
