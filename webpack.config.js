// require the Node path module - part of the node library so don't need to install
const path = require('path')

// create a var that is an array of plugins for postcss-loader
const postCSSPlugins = [
  require('postcss-import'),
  require('postcss-simple-vars'),
  require('postcss-nested'),
  require('autoprefixer')
]

// create JS object - tell webpack that it is this object that should be exported and used
module.exports = {
  // Entry - this is the path to the file we want webpack to watch, process and bundle
  //  ./ refers to the current directory
  entry: './app/assets/scripts/App.js',
  output: {
    // what to name the bundled file
    filename: 'bundled.js',
    //absolite path to the correct folder
    path: path.resolve(__dirname, 'app')
  },
  // To get rid of warning message in terminal that mode has not been speciified
  mode: 'development',
  // watch the file for changes continuously
  watch: true,
  // module object with rule property
  module: {
    // can have multiple objects in the rules array!
    rules: [
      {
        // Test - only if the filename ends in .css then use the various loaders
        // postcss-loader needs some options or plugins to be specified - create var that is array above with these inside
        // Prevent css-loader dealing with images
        test: /\.css$/i,
        use: ['style-loader', 'css-loader?url=false', { loader: 'postcss-loader', options: { plugins: postCSSPlugins } }]
      }
    ]
  }
}