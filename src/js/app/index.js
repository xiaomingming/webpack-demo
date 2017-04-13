require('Style/index.scss');
// import p, {
// 	version as v
// } from '../utils/a';
import * as A from '../utils/a'
// var A = require('../utils/a')
import * as B from '../utils/b'
// import jq from '../libs/jquery-1.8.2'
console.log(A)
// jq(function() {
// 	jq('#J-rules-dialog').hide();
// 	jq('body').on('click', function() {
// 		alert('hahaha ,jq');
// 	});
// });
// console.log(B.version);
// $(function() {
// 	var $rules = $('#J-rules'),
// 		$ruleDialog = $('#J-rules-dialog'),
// 		$gaizi = $('#J-gaizi');
// 	$rules.on('click', function() {
// 		$ruleDialog.fadeIn();
// 	});
// 	$ruleDialog.on('click', '.close', function() {
// 		$ruleDialog.fadeOut();
// 	});
// 	var setGaiziPosition = function() {
// 		var contentWidth = $('body').outerWidth();
// 		var minWidth = 1080;
// 		var gaiziWidth = $gaizi.outerWidth();
// 		$gaizi.css({
// 			right: Math.max(Math.abs(contentWidth - minWidth) / 2 - gaiziWidth - 30, 20) + 'px'
// 		}).fadeIn(200);
// 	};
// 	setGaiziPosition();
// 	$(window).resize(setGaiziPosition);
// });
// console.log(process.env.NODE_ENV);
// if (module.hot) {
// 	const reporter = window.__webpack_hot_middleware_reporter__;
// 	const success = reporter.success;
// 	reporter.success = function() {
// 		document.querySelectorAll('link[href][rel=stylesheet]').forEach((link) => {
// 			const nextStyleHref = link.href.replace(/(\?\d+)?$/, `?${Date.now()}`);
// 			link.href = nextStyleHref;
// 		});
// 		success();
// 	};
// }