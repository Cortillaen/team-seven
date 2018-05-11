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
      .assert.elementNotPresent('#statsDisplay')
      .assert.elementPresent('#UrlInput')
      .setValue('input[type=text]', 'https://www.cnn.com/2018/05/10/politics/donald-trump-elkhart-indiana-rally/index.html')
      .pause(100)
      .click('button')
      .pause(3000)
      .assert.elementPresent('#statsDisplay')
      .assert.containsText('p', 'Trump to project party unity at Indiana rally')
      .useXpath()
      .click('//a[2]')
      .assert.elementPresent('//canvas')
      .click('//a[3]')
      .useCss()
      .assert.elementPresent('#about-us')
      .useXpath()
      .click('//a[1]')
      .useCss()
      .assert.elementPresent('#statsDisplay')
      .assert.containsText('p', 'Trump to project party unity at Indiana rally')
      .end()
  }
}
