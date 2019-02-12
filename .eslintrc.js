module.exports = {
	"env": {
		"browser": true,
		"es6": true
	},
	
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended"
	],
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 2018,
		"sourceType": "module"
	},
	"plugins": [
		"prefer-arrow",
		"react"
	],
	"rules": {
		// "func-style": [
		// 	"error",
		// 	"expression",
		// 	{ "allowArrowFunctions": true }
		// ],
		"prefer-arrow/prefer-arrow-functions": [
			"warn",
			{
				"disallowPrototype": true,
				"singleReturnOnly": true,
				"classPropertiesAllowed": true
			}
		],
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"windows"
		],
		"quotes": [
			"error",
			"single"
		],
		"semi": [
			"error",
			"never"
		]
	}
};
