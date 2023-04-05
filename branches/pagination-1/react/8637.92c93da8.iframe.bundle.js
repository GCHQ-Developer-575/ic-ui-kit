"use strict";(self.webpackChunk_ukic_react=self.webpackChunk_ukic_react||[]).push([[8637],{"../web-components/dist/esm/ic-checkbox-group.entry.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ic_checkbox_group:()=>CheckboxGroup});__webpack_require__("./node_modules/core-js/modules/es.function.name.js"),__webpack_require__("./node_modules/core-js/modules/es.string.small.js"),__webpack_require__("./node_modules/core-js/modules/es.array.from.js"),__webpack_require__("./node_modules/core-js/modules/es.string.iterator.js"),__webpack_require__("./node_modules/core-js/modules/es.array.for-each.js"),__webpack_require__("./node_modules/core-js/modules/web.dom-collections.for-each.js"),__webpack_require__("./node_modules/core-js/modules/es.array.index-of.js"),__webpack_require__("./node_modules/core-js/modules/es.string.trim.js"),__webpack_require__("./node_modules/core-js/modules/es.symbol.to-primitive.js"),__webpack_require__("./node_modules/core-js/modules/es.date.to-primitive.js"),__webpack_require__("./node_modules/core-js/modules/es.symbol.js"),__webpack_require__("./node_modules/core-js/modules/es.symbol.description.js"),__webpack_require__("./node_modules/core-js/modules/es.object.to-string.js"),__webpack_require__("./node_modules/core-js/modules/es.number.constructor.js"),__webpack_require__("./node_modules/core-js/modules/es.object.define-property.js");var _index_90721b3c_js__WEBPACK_IMPORTED_MODULE_15__=__webpack_require__("../web-components/dist/esm/index-90721b3c.js"),_helpers_b2b47a7d_js__WEBPACK_IMPORTED_MODULE_16__=__webpack_require__("../web-components/dist/esm/helpers-b2b47a7d.js");__webpack_require__("../web-components/dist/esm/types-dd515332.js");function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,(arg=descriptor.key,key=void 0,"symbol"==typeof(key=function _toPrimitive(input,hint){if("object"!=typeof input||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!=typeof res)return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string"))?key:String(key)),descriptor)}var arg,key}var CheckboxGroup=function(){function CheckboxGroup(hostRef){!function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,CheckboxGroup),(0,_index_90721b3c_js__WEBPACK_IMPORTED_MODULE_15__.r)(this,hostRef),this.icChange=(0,_index_90721b3c_js__WEBPACK_IMPORTED_MODULE_15__.c)(this,"icChange",7),this.label=void 0,this.name=void 0,this.required=!1,this.hideLabel=!1,this.disabled=!1,this.helperText="",this.small=!1,this.validationStatus="",this.validationText="",this.checkedOptions=[]}return function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Object.defineProperty(Constructor,"prototype",{writable:!1}),Constructor}(CheckboxGroup,[{key:"selectHandler",value:function selectHandler(){var _this=this;this.checkboxOptions=Array.from(this.host.querySelectorAll("ic-checkbox")),this.checkboxOptions.forEach((function(checkbox){checkbox.checked&&-1===_this.checkedOptions.indexOf(checkbox.value)&&_this.checkedOptions.push(checkbox.value)})),this.icChange.emit({value:this.checkedOptions})}},{key:"componentDidLoad",value:function componentDidLoad(){var _this2=this;this.checkboxOptions=Array.from(this.host.querySelectorAll("ic-checkbox")),this.checkboxOptions.forEach((function(checkbox){checkbox.checked&&-1===_this2.checkedOptions.indexOf(checkbox.value)&&_this2.checkedOptions.push(checkbox.value),checkbox.name||(checkbox.name=_this2.name),checkbox.groupLabel=_this2.label})),(0,_helpers_b2b47a7d_js__WEBPACK_IMPORTED_MODULE_16__.a)([{prop:this.label,propName:"label"},{prop:this.name,propName:"name"}],"Checkbox Group")}},{key:"render",value:function render(){var _class,describedBy=(0,_helpers_b2b47a7d_js__WEBPACK_IMPORTED_MODULE_16__.h)(this.name,""!==this.helperText,""!==this.validationStatus),hadValidationStatus=(0,_helpers_b2b47a7d_js__WEBPACK_IMPORTED_MODULE_16__.j)(this.validationStatus,this.disabled);return(0,_index_90721b3c_js__WEBPACK_IMPORTED_MODULE_15__.h)(_index_90721b3c_js__WEBPACK_IMPORTED_MODULE_15__.H,null,("error"===this.validationStatus||this.required||this.hideLabel)&&(0,_index_90721b3c_js__WEBPACK_IMPORTED_MODULE_15__.h)("span",{id:"screenReaderOnlyText",class:"screen-reader-only-text","aria-hidden":"true"},this.label," ","error"===this.validationStatus?"invalid data ":null," ",this.required?"required":null),(0,_index_90721b3c_js__WEBPACK_IMPORTED_MODULE_15__.h)("fieldset",{id:this.name,"aria-labelledby":(("error"===this.validationStatus||this.required||this.hideLabel?"screenReaderOnlyText":"")+" "+describedBy).trim(),disabled:this.disabled},!this.hideLabel&&(0,_index_90721b3c_js__WEBPACK_IMPORTED_MODULE_15__.h)("legend",null,(0,_index_90721b3c_js__WEBPACK_IMPORTED_MODULE_15__.h)("ic-input-label",{class:(_class={},_class[""+this.validationStatus]=!0,_class),label:this.label,helperText:this.helperText,required:this.required,disabled:this.disabled,for:this.name})),(0,_index_90721b3c_js__WEBPACK_IMPORTED_MODULE_15__.h)("div",{class:"checkboxes-container"},(0,_index_90721b3c_js__WEBPACK_IMPORTED_MODULE_15__.h)("slot",null))),hadValidationStatus&&(0,_index_90721b3c_js__WEBPACK_IMPORTED_MODULE_15__.h)("ic-input-validation",{for:this.name,ariaLiveMode:"polite",status:this.validationStatus,message:this.validationText}))}},{key:"host",get:function get(){return(0,_index_90721b3c_js__WEBPACK_IMPORTED_MODULE_15__.g)(this)}}]),CheckboxGroup}();CheckboxGroup.style='/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%;}body{margin:0}main{display:block}h1{font-size:2em;margin:0.67em 0}hr{box-sizing:content-box;height:0;overflow:visible;}pre{font-family:monospace, monospace;font-size:1em;}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;-webkit-text-decoration:underline dotted;text-decoration:underline dotted;}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace, monospace;font-size:1em;}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0;}button,input{overflow:visible}button,select{text-transform:none}button,[type="button"],[type="reset"],[type="submit"]{-webkit-appearance:button}button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type="button"]:-moz-focusring,[type="reset"]:-moz-focusring,[type="submit"]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:0.35em 0.75em 0.625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal;}progress{vertical-align:baseline}textarea{overflow:auto}[type="checkbox"],[type="radio"]{box-sizing:border-box;padding:0;}[type="number"]::-webkit-inner-spin-button,[type="number"]::-webkit-outer-spin-button{height:auto}[type="search"]{-webkit-appearance:textfield;outline-offset:-2px;}[type="search"]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit;}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font-style:inherit;vertical-align:baseline}:host{display:block}ic-input-label.error{color:var(--ic-status-error)}ic-input-label ic-typography{margin-bottom:var(--ic-space-sm)}:host([small]) ic-input-label ic-typography{margin-bottom:calc(var(--ic-space-sm) / 2)}ic-input-validation{margin-top:var(--ic-space-sm)}:host([small]) ic-input-validation{margin-top:calc(var(--ic-space-sm) / 2)}.checkboxes-container{margin-bottom:calc(-1 * var(--ic-space-xxs))}:host([small]) .checkboxes-container{margin-bottom:calc(-1 * var(--ic-space-xxxs))}.screen-reader-only-text{position:absolute;left:-9999px;background-color:#fff;color:#000;text-transform:none}'}}]);