require('Style/index.scss');
// import p, {
//  version as v
// } from '../utils/a';
import * as A from '../utils/a'
// var A = require('../utils/a')
import * as B from '../utils/b'
// import jq from '../libs/jquery-1.8.2'
console.log(A)
$('.close').on('click', function() {
  require.ensure(['../utils/d'], function(require) {
    var C = require('../utils/c')
    require('../utils/d')
    console.log(C.alert())
  })
});
// jq(function() {
//  jq('#J-rules-dialog').hide();
//  jq('body').on('click', function() {
//    alert('hahaha ,jq');
//  });
// });