const express = require('express');
const { isEnabled, features } = require('./featureFlags');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  const newUI = isEnabled(features.NEW_UI);
  
  if (newUI) {
    res.send(`
      <html>
        <head>
          <title>DevOps Assignment 1 - New UI</title>
          <style>
            body { font-family: sans-serif; background: #121212; color: #fff; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .card { background: #1e1e1e; padding: 2rem; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); text-align: center; border: 1px solid #333; }
            h1 { color: #bb86fc; }
            .badge { background: #03dac6; color: #000; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>Modern Dashboard <span class="badge">NEW</span></h1>
            <p>Welcome to the premium experience. This feature was enabled via a Feature Flag!</p>
            <p>CI/CD Pipeline Status: <strong>Operational</strong></p>
          </div>
        </body>
      </html>
    `);
  } else {
    res.send(`
      <html>
        <head>
          <title>DevOps Assignment 1 - Default UI</title>
          <style>
            body { font-family: sans-serif; padding: 2rem; }
          </style>
        </head>
        <body>
          <h1>Standard Application</h1>
          <p>This is the default view. Enable the feature flag to see the new UI.</p>
          <p>CI/CD Pipeline Status: <strong>Active</strong></p>
        </body>
      </html>
    `);
  }
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date() });
});

module.exports = app;
