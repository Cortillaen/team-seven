<template>
  <div>
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
      request.get({
        url: 'http://eventregistry.org/json/articleMapper',
        qs: {
          'articleUrl': urlTarget,
          'includeAllVersions': true,
          'deep': true
        }
      }, function (response, body) {
        let output = JSON.parse(response)
		console.log(output)
		
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
