const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  remotes: {
    auth: "http://localhost:4201/remoteEntry.js",
    bike: "http://localhost:4202/remoteEntry.js",
    user: "http://localhost:4203/remoteEntry.js"
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});
