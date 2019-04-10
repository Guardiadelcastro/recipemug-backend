module.exports = {
  moduleFileExtensions: [
    "js",
    "ts",
    "tsx",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  globals: {
    "ts-jest": {
    "tsConfigFile": "tsconfig.json"
    }
  },
  testMatch:[
    "**/tests/*.+(ts|tsx|js)"
  ]
};
