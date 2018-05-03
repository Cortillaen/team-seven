<template>
  <div id="app-header">
    <h1 class="top-header">News API Application</h1>
    <router-link :to="{ path: 'Analysis', query: { url: 'value' } }">Analysis</router-link>
    <router-link to="/wordcloud">Word Cloud</router-link>
    <router-link to="/about">About</router-link>
    <input id="UrlInput" type="Text" placeholder="Enter Url Here" />
    <button v-on:click="findArticle" id="UrlButton">Submit</button>
    <router-view/>
  </div>
</template>

<script>
import Analysis from './components/Analysis.vue'

export default {
  components: {
    Analysis
  },
  props: ['theThing'],
  methods: {
    findArticle (evt) {
      let self = this
      let url = document.getElementById('UrlInput').value
      self.$router.push({name: 'Analysis', params: {theThing: url}})
    }
  }
}
</script>

<style>
#app-header {
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
padding-top: 2em;
}
a {
text-decoration: none;
padding: 1em;
color: #111;
}
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
