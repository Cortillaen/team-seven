<template>
  <div>
    <h1>Analysis</h1>
    <h2>The thing: {{theThing}}</h2>
  </div>
</template>

<script>
export default {
  methods: {
    findArticle (evt) {
      let value = document.getElementById('UrlInput').value
      return value
    }
  },
  data () {
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
