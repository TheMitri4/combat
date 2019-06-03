module.exports = {
	'env': {
		'browser': true,
		"node": true,
		'commonjs': true,
		'es6': true
	},
	'extends': 'pedant',
	'parserOptions': {
		'ecmaVersion': 6
	},
	
	'rules': {
		'indent': [
			'error',
			'tab'
		],
	
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			2,
			'always'
		],
		'no-unused-vars': [
			1
		]
	}
};