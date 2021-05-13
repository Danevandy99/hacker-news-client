import expressApp from './functions/app/index.js';

(async () => {
  const app = expressApp();

  app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port " + (process.env.PORT || 3000) + "...")
  });
})();
