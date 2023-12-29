const internals = {};
const externals = {};

internals.routes = {
  mainMenu: {
    hash: "#mainMenuMemoryGame",
    controller: "main-controller",
  },
  playLevelOneMenu: {
    hash: "#playLevelOne",
    controller: "main-controller",
  },
};

internals.defaultRoute = "mainMenu";
internals.currentHash = "";

externals.start = function () {
  window.location.hash = internals.routes[internals.defaultRoute].hash;
  setInterval(internals.hashCheck, 150);
};

// VER NOTAS - EDITAR

internals.hashCheck = function () {

  // the hash code stays the same
  if (window.location.hash === internals.currentHash) {
    return;
  }

  // the hash has changed and have found a new one
  let routeName = Object.keys(internals.routes).find(function (name) {
    return window.location.hash === internals.routes[name].hash;
  });

  // the hash has changed but does not exists
  if (!routeName) {
    routeName = internals.defaultRoute;
    window.location.hash = internals.routes[routeName].hash;
  }

  internals.loadController(internals.routes[routeName].controller);
};

internals.loadController = function (controllerName) {
  internals.currentHash = window.location.hash;
  import(`./controllers/${controllerName}.mjs`)
  .then((module) => module.default.start())
  .catch((error) => console.log('Error loading controller:', error));

};


export default externals;