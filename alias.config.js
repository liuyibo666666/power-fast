/**
  * Created by webstorm
  * User: 小博
  * Date: 2020/3/27
  * Time: 15:10
  * describe:
  */
'use strict';
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

module.exports = {
  context: path.resolve(__dirname, './'),
  resolve: {
    extensions: [ '.js', '.css', '.scss', '.vue', '.json' ],
    alias: { '@': resolve('src'), '_c': resolve('src/components') }
  }
};
