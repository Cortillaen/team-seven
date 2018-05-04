import Vue from 'vue'
import Router from 'vue-router'
import Analysis from '@/components/Analysis'
import WordCloud from '@/components/WordCloud'
import About from '@/components/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/analysis/:articleData',
      name: 'Analysis',
      component: Analysis,
      props: true
    },
    {
      path: '/wordcloud/:articleData',
      name: 'Word Cloud',
      component: WordCloud,
      props: true
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
