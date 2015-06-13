System.config({
  "baseURL": "/",
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "runtime"
    ]
  },
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  },
  "bundles": {
    "build/blog": [
      "npm:core-js@0.9.6/library/modules/$.fw",
      "npm:babel-runtime@5.2.6/helpers/class-call-check",
      "js/CodeView",
      "npm:core-js@0.9.6/library/modules/$",
      "npm:core-js@0.9.6/library/fn/object/define-property",
      "npm:babel-runtime@5.2.6/core-js/object/define-property",
      "npm:babel-runtime@5.2.6/helpers/create-class",
      "js/Blog",
      "js/index"
    ]
  }
});

System.config({
  "map": {
    "babel": "npm:babel-core@5.2.6",
    "babel-runtime": "npm:babel-runtime@5.2.6",
    "core-js": "npm:core-js@0.9.6",
    "traceur": "github:jmcriffey/bower-traceur@0.0.87",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.87",
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:core-js@0.9.6": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

