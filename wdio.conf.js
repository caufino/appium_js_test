export const config = {
  runner: 'local',
  path: '/',
  port: 4723,
  specs: ['./test/**/*.test.js'],
  maxInstances: 1,
  capabilities: [{
    platformName: 'Android',
    'appium:platformVersion': '16',
    'appium:deviceName': 'emulator-5554',
    'appium:automationName': 'UiAutomator2',
    'appium:appPackage': 'com.mentortools.academy',
    'appium:appActivity': 'com.mentortools.academy.MainActivity',
    'appium:noReset': false,
    'appium:fullReset': false,
    'appium:autoGrantPermissions': true
  }],
  logLevel: 'info',
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
    retries: 2
  },
  reporters: [
    'spec',
    ['video', {
      saveAllVideos: false,
      outputDir: './videos'
    }],
    ['mochawesome',
      {
        outputDir: './mochawesome-report',
        outputFileFormat: function (opts) {
          return `results-${opts.cid}.json`;
        },
        mochawesomeOpts: {
          reportDir: './mochawesome-report',
          reportFilename: 'report',
          quiet: true,
          overwrite: true,
          html: true,
          json: false,
          inlineAssets: true,
        }
      }
    ]
  ],
  afterTest: async function (test, context, { error, passed }) {
    if (!passed) {
      console.log(`[afterTest] Test failed: '${test.title}' saving screenshot...`);

      const fs = await import('fs');
      const path = await import('path');
      const screenshotsDir = path.resolve('./screenshots');

      if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir);
      }

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const safeTitle = test.title.replace(/[^\w\d-_]/g, '_');
      const filename = `${safeTitle}-${timestamp}.png`;
      const filePath = path.join(screenshotsDir, filename);

      await browser.saveScreenshot(filePath);
      console.log(`[afterTest] Screenshot saved: ${filePath}`);
    }
  }
};
