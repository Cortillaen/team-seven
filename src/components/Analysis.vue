<template>
  <div>
    <h1>Analysis</h1>
    <h2>{{ theThing }}</h2>
  </div>
</template>

<script>
export default {
  props: ['theThing'],
  updated:
    function () {
      var request = require('request')
      let urlTarget = this.theThing
      console.log(this.theThing)
      request.get({
        url: 'http://eventregistry.org/json/articleMapper',
        qs: {
          'articleUrl': urlTarget,
          'includeAllVersions': true,
          'deep': true
        }
      }, function (response, body) {
        console.log(body)
      })
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
