<template>
  <div>
  <input v-model="appUrl" id="UrlInput" type="Text" placeholder="Enter Url Here"/>
  <button v-on:click="findArticle" id="UrlButton">Submit</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      appUrl
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
</style>
