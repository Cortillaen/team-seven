<template>
  <div id="app-header">
    <h1 class="top-header">News API Application</h1>
	<div id="app-nav">
        <router-link :to="{ name: 'HelloWorld' }">Home</router-link>
        <router-link to="/about">Article Quality</router-link>
	    <router-link to="/ratings">Word Cloud</router-link>
	    <router-link to="/about">About</router-link>
	    <router-view/>
    </div>
  </div>

</template>

<script>
export default {
  name: 'App'
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
  color: #ffffff;
  background-color: #4abdac;
  overflow: hidden;
}
#app-nav {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  background-color: #dfdce3;
  margin: 0;
  overflow: hidden;
}
a {
    text-decoration: none;
	padding: 1em;
	float: left;
	color: #4abdac;
}

</style>
