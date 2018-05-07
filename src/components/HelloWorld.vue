<template>
  <div>
    <input id="UrlInput" type="Text" placeholder="Enter Url Here" />
    <button v-on:click="findArticle" id="UrlButton">Submit</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  methods: {
    findArticle (evt) {
      let url = document.getElementById('UrlInput').value
      this.$emit('clicked', url)
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
padding: 2em;
height: 100%;
background-color: #0cd;
}
#app-body {
background-color: #fff;
padding: 2em;
}</style>
