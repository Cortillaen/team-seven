<template>
  <div id="about-us">
    <p>This page was designed around the idea that you should easily be able to discern the quality of an article based on simple criteria.  Below are five criteria used to measure the quality and difficulty of a piece of writing.</p>
    <ul>
      <li><a href="https://en.wikipedia.org/wiki/Automated_readability_index" target="_blank">ARI: Automated Readability Index</a></li>
      <li><a href="https://en.wikipedia.org/wiki/Dale%E2%80%93Chall_readability_formula" target="_blank">Dale-Chall Readability Formula</a></li>
      <li><a href="https://en.wikipedia.org/wiki/Coleman%E2%80%93Liau_index" target="_blank">Coleman–Liau Index</a></li>
      <li><a href="https://en.wikipedia.org/wiki/Flesch%E2%80%93Kincaid_readability_tests" target="_blank">Flesch-Kincaid Readability Index</a></li>
      <li><a href="https://en.wikipedia.org/wiki/SMOG" target="_blank">SMOG Index</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      msg: 'Welcome to News App'
    }
  }
}
</script>
<style>
  #about-us {
    padding: 0.5em;
    width: 800px
  }
  p {
    font-size: 150%;
  }
  ul {
    text-align: left;
  }
</style>
