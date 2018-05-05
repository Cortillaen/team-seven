// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.app-header')
      .assert.containsText('h1', 'News API Application')
      .assert.elementCount('router-link', 3)
      .assert.elementPresent('.UrlInput')
      .assert.elementPresent('.UrlButton')
      // insert news site url into search bar
      // click submit button
      // verify Analysis page view
      // click WordCloud router-link
      // verfiy WordCloud page view
      // click About router-link
      //verify About page view
      .end()
  }
}
