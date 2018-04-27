<template>
<div id="app-header">
<h1 class="top-header">News API Application</h1>
<router-link :to="{ name: 'HelloWorld' }">Home</router-link>
<router-link to="/about">About</router-link>
<router-view/>
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
color: #111;
overflow: hidden;
padding-top: 2em;
}
a {
text-decoration: none;
padding: 1em;
color: #111;
}

</style>
