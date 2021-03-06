/* global setup:true, initSetup:true */

setup = {};

initSetup = function(){
   var simteconf = require('simteconf');
   var phiConf = simteconf('phido.conf', {
      skipNames: ['//', '#']
   });
   // Read GoldED settings:
   var encodingGED = phiConf.last('EncodingGoldED') || 'utf8';
   var confGED = simteconf(phiConf.last('ConfigGoldED'), {
      encoding: encodingGED,
      skipNames: ['//', '#', '-'+'-']
   });
   setup.UserName =
      phiConf.first('UserName') || confGED.first('UserName') || 'anonymous';
   setup.areaSeparators = (
      phiConf.all('AreaSep') || confGED.all('AreaSep') || []
   ).filter(function(areaSep){
      var ok = /^\s*\S+\s+"[^"]+"\s+\d+\s+[Ee][Cc][Hh][Oo]\s*$/.test(areaSep);
      return ok;
   }).map(function(areaSep){
      var matches =
         /^\s*(\S+)\s+"([^"]+)"\s+\d+\s+[Ee][Cc][Hh][Oo]\s*$/.exec(areaSep);
      return {
         sepName: matches[1],
         sepDesc: matches[2]
      };
   }).sort(function(a, b){
      if( a.sepName < b.sepName ){
         return -1;
      } else if ( a.sepName > b.sepName ){
         return 1;
      } else return 0;
   });
   // Read HPT areas:
   var encodingHPT = phiConf.last('EncodingHPT') || 'utf8';
   setup.areas = simteconf(phiConf.last('AreasHPT'), {
      encoding: encodingHPT,
      skipNames: ['#'],
      lowercase: false,
      prefixGroups: [
         'NetmailArea',
         'BadArea',
         'DupeArea',
         'LocalArea',
         'EchoArea'
      ]
   });
};