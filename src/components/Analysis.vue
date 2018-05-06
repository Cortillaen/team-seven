<template>
  <div>
    <h2 id='errorBox'>{{ article }}</h2>
  </div>
</template>

<script>
export default {
  name: 'Analyisis',
  props: ['article', 'articleAnalysis'],
  updated: function () {
    console.log(this.article)
  }

}
</script>
<style>
</style>
