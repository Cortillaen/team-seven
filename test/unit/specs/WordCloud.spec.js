import Vue from 'vue'
import WordCloud from '@/components/WordCloud.vue'

describe('WordCloud', () => {
  // Inspect the raw component options
  it('should have the methods property', () => {
    expect(typeof WordCloud.methods).toBe('property')
  })

  // Evaluate the results of functions in the raw
  // component options
  it('sets the correct default data', () => {
    expect(typeof WordCloud.data).toBe('function')
    // need return results from data() to test further
  })

  // Mount an instance and inspect the render ouput
  const Constructor = Vue.extend(WordCloud)
  const vm = new Constructor().$mount()
  // Check word cloud results against test
})
