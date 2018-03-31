module.exports = {
    extends: "airbnb",
    "env": {
        "browser": true,
        "es6": true,
        "jest": true
    },
    rules: {
        indent: [2, 4],

        "object-curly-spacing": [2, "never"],

        "quotes": [ 2, "double", "avoid-escape" ],

        "prefer-const": 1,

        "react/prefer-es6-class": 0,
        "react/jsx-filename-extension": 0,
        "react/jsx-curly-spacing": [ 2, "never" ],
        "react/jsx-indent": [ 2, 4 ]
    }
};