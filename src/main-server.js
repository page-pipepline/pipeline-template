import createApp from './create-app.js';

export default function context() {
  const { app } = createApp();
  return app;
}
