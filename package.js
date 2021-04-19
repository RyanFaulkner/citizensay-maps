Package.describe({
  name: 'citizensay:maps',
});

Package.onUse(function(api) {
  api.versionsFrom('1.10.2');
  api.use([
      'ecmascript',
      'citizensay:core',
      'citizensay:workflows'
  ]);
  api.mainModule('client.js', 'client');
  api.mainModule('server.js', 'server');

  api.addAssets([
      "lib/icons/bench.png",
      "lib/icons/marker.png",
      "lib/icons/n4c.png",
      "lib/icons/tree.png"
  ], "client");
});

Npm.depends({
    "leaflet": "1.7.1",
    "react-leaflet": "3.1.0"
});