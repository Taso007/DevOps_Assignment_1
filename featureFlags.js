/**
 * Simple Feature Flag utility
 * Checks environment variables for feature status
 */
const isEnabled = (featureName) => {
  return process.env[featureName] === 'true';
};

module.exports = {
  isEnabled,
  features: {
    NEW_UI: 'NEW_UI_ENABLED'
  }
};
