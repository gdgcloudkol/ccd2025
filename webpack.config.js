const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'ccd2025-host',
  remotes: {
    './Home': 'http://localhost:3000/_next/static/chunks/remoteEntry.js',
    './User': 'http://localhost:3001/_next/static/chunks/remoteEntry.js',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
