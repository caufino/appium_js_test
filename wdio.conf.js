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
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  }
};
