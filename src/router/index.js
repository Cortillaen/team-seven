import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Analysis from '@/components/Analysis'
import WordCloud from '@/components/WordCloud'
import About from '@/components/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/analysis',
      name: 'Analysis',
      component: Analysis
    },
    {
      path: '/wordcloud',
      name: 'Word Cloud',
      component: WordCloud
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
