<template>
  <div id="about-us">This page was designed around the idea that you should easily be able to discern
    the quality of an article based on simple criteria.
    ARI: Automated readability index, https://en.wikipedia.org/wiki/Automated_readability_index
    Dale-Chall: https://en.wikipedia.org/wiki/Dale%E2%80%93Chall_readability_formula
    Coleman–Liau index: https://en.wikipedia.org/wiki/Coleman%E2%80%93Liau_index
    flesch-kincaid: https://en.wikipedia.org/wiki/Flesch%E2%80%93Kincaid_readability_tests
    SMOG: https://en.wikipedia.org/wiki/SMOG
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
</style>
