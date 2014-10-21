angular.module('helium', []).directive('heShadow', ['$sce', '$compile', function($sce, $compile){
	return {
		scope: {}, 
		restrict: 'A', 
		template: '<div ng-transclude></div>',
		transclude: true,
		compile: function(tElement, tAttrs){ 
			angular.element.prototype.shadow = function() {
				var t = angular.element(this);
				var g = (t[0]).createShadowRoot();
				return g;
			}
			var jsSrc, cssSrc, htmlSrc;

			var shadow = 
			!angular.isDefined(tAttrs.heShadow) 
			|| tAttrs.heShadow==undefined 
			|| tAttrs.heShadow == '' ? undefined: eval( '(' + tAttrs.heShadow + ')' );

			return function linking(scope, elm, attrs){

				var shadowRoot = angular.element(angular.element(elm)[0]).shadow();

				if(shadow){
					jsSrc = shadow.js;
					cssSrc = shadow.css;
					htmlSrc = shadow.html;
					if(angular.isDefined(htmlSrc)){
						//shadowRoot.appendChild($compile('<link href="' + cssSrc + '" rel="stylesheet" />'));
						//console.log($sce.trustAsHtml(htmlSrc));
						//shadowRoot.appendChild($sce.parseAsResourceUrl(htmlSrc));
					}
					if(angular.isDefined(cssSrc)){
						var comp = $compile('<link href="' + cssSrc + '" rel="stylesheet" />')(scope);
						elm.append(comp);
					}
					if(angular.isDefined(jsSrc)){
						var comp = $compile('<script scr="' + jsSrc + '"></script>')(scope);
						elm.append(comp);
					}
					shadowRoot.appendChild(elm);
				} else {
					shadowRoot.appendChild(angular.element(elm).children()[0]);
				}
			}
		}
	};
}]);