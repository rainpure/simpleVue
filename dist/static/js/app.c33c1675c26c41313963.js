webpackJsonp([1],{

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const debug =  false ? true : false;
// 测试环境地址
if (debug) {
    var host = 'https://api.guangyangyundong.com/api';
    // var host = 'http://120.77.72.16:8080/api';
    //   var host = 'http://192.168.1.107:8080/api';
} else {
    //正式环境地址
    var host = 'https://api.guangyangyundong.com/api';
}
console.warn('当前resource: ', host);

let resources = {
    universityId: 1,
    host: host,
    // graphQL查询Api
    graphQlApi: `${host}\/graphql`,
    users(id) {
        return `${host}\/users\/${id}`;
    }
};

/* harmony default export */ __webpack_exports__["a"] = (resources);

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(431);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_HomePage_vue__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_HomePage_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__views_HomePage_vue__);




let routes = [{
    path: '/home',
    component: __WEBPACK_IMPORTED_MODULE_2__views_HomePage_vue___default.a,
    name: '验证学籍信息',
    hidden: true
}, {
    path: '/',
    redirect: { path: '/home' },
    hidden: true
}];

__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);
const router = new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
    routes
});

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.name) {
        document.title = to.name;
    }
    next();
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),

/***/ 161:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 162:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 163:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(424)

var Component = __webpack_require__(157)(
  /* script */
  __webpack_require__(203),
  /* template */
  __webpack_require__(429),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'app',
	components: {}
});

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__resources__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_js_md5__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_js_md5___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_js_md5__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_element_ui__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_element_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_element_ui__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





const universitiesQuery = `
{
	universities {
		id
		name
	}
}`;

const studentQuery = `
query(
	$universityId: Long
	$studentNo: String
	$name: String
){
	student(
		universityId: $universityId,
		studentNo: $studentNo
		name: $name
	){
		name
		id
		userId
	}
}`;

/* harmony default export */ __webpack_exports__["default"] = ({
	data() {
		return {
			step: 1,
			openid: '',
			isLoading: false,
			universities: [],
			loginForm: {
				// 测试账号: 15210231110 name: 林金鸿
				universityId: 1,
				studentNo: '',
				name: '',
				password: '',
				rePassword: ''
			},
			userId: '',
			verifyError: false, // 学号与姓名验证结果
			passError: false,
			passErrorMsg: ''
		};
	},
	watch: {
		'loginForm': {
			handler: function (val, oldval) {
				this.isLoading = false;
				this.verifyError = false;
				this.passError = false;
			},
			deep: true //对象内部的属性监听，也叫深度监听  
		}
	},
	methods: {
		getUniversities() {
			this.$ajax.post(`${__WEBPACK_IMPORTED_MODULE_0__resources__["a" /* default */].graphQlApi}`, {
				'query': `${universitiesQuery}`
			}).then(res => {
				this.universities = res.data.data.universities;
			});
		},
		next() {
			let _this = this;

			if (!this.loginForm.name || !this.loginForm.universityId || !this.loginForm.studentNo) {
				__WEBPACK_IMPORTED_MODULE_2_element_ui__["Message"].error({
					message: '学校／学号／姓名不能为空'
				});
				return;
			}

			let params = {
				universityId: this.loginForm.universityId,
				studentNo: this.loginForm.studentNo.trim(),
				name: this.loginForm.name.trim()
			};
			_this.isLoading = true;
			this.$ajax.post(`${__WEBPACK_IMPORTED_MODULE_0__resources__["a" /* default */].graphQlApi}`, {
				'query': `${studentQuery}`,
				variables: params
			}).then(res => {
				if (res.data.data.student) {
					try {
						_this.userId = res.data.data.student.userId;
						// 调用一次user更新接口，更新userid
						let updateUrl = __WEBPACK_IMPORTED_MODULE_0__resources__["a" /* default */].users(_this.userId);
						this.$ajax({
							method: 'post',
							url: updateUrl,
							timeout: 10000,
							params: {
								'openid': _this.openid //this is important !
							} }).then(res => {
							console.log('成功更新openid');
							__WEBPACK_IMPORTED_MODULE_2_element_ui__["Message"].success({
								message: '学籍信息验证成功！'
							});
							_this.step++;
							_this.isLoading = false;
						});
					} catch (e) {
						alert(e);
					}
				} else {
					_this.verifyError = true;
				}
			});
		},
		submit() {
			let _this = this;
			let reg = /^[0-9a-zA-Z]+$/;
			if (this.loginForm.password !== this.loginForm.rePassword) {
				_this.passError = true;
				_this.passErrorMsg = '两次密码输入不一致，请重新输入';
				return;
			}

			if (this.loginForm.password.length < 6 || this.loginForm.password.length > 12 || !reg.test(this.loginForm.password)) {
				_this.passError = true;
				_this.passErrorMsg = '请输入6~12位，包含英文或者数字的密码';
				return;
			}

			_this.passError = false;
			let url = __WEBPACK_IMPORTED_MODULE_0__resources__["a" /* default */].users(this.userId);
			this.$ajax({
				method: 'post',
				url: url,
				timeout: 10000,
				params: {
					'studentNo': this.loginForm.studentNo,
					'password': __WEBPACK_IMPORTED_MODULE_1_js_md5___default()(this.loginForm.password),
					'openid': this.openid //this is important !
				} }).then(res => {
				__WEBPACK_IMPORTED_MODULE_2_element_ui__["Message"].success({
					message: '成功更新密码！'
				});
				window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.guangyangyundong.sport';
			});
		}
	},
	mounted: function () {
		this.getUniversities();
		this.openid = getQueryString('openid') || getCookie('openid');
		// 获取url参数
		function getQueryString(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return unescape(r[2]);
			return null;
		}

		// 获取cookies
		function getCookie(name) {
			var arr = document.cookie.split('; ');
			var i = 0;
			for (i = 0; i < arr.length; i++) {
				var arr2 = arr[i].split('=');
				if (arr2[0] == name) {
					var getC = decodeURIComponent(arr2[1]);
					return getC;
				}
			}
			return '';
		}
	}
});

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_polyfill__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_polyfill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_polyfill__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__App__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__App__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_element_ui__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_element_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_element_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_element_ui_lib_theme_default_index_css__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_element_ui_lib_theme_default_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_element_ui_lib_theme_default_index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__router__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__resources__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_axios__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_font_awesome_css_font_awesome_min_css__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_font_awesome_css_font_awesome_min_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_font_awesome_css_font_awesome_min_css__);











__WEBPACK_IMPORTED_MODULE_1_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_3_element_ui___default.a);

__WEBPACK_IMPORTED_MODULE_1_vue__["default"].prototype.$ajax = __WEBPACK_IMPORTED_MODULE_7_axios___default.a;

new __WEBPACK_IMPORTED_MODULE_1_vue__["default"]({
	router: __WEBPACK_IMPORTED_MODULE_5__router__["a" /* default */],
	render: h => h(__WEBPACK_IMPORTED_MODULE_2__App___default.a)
}).$mount('#app');

/***/ }),

/***/ 424:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 425:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 428:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(425)

var Component = __webpack_require__(157)(
  /* script */
  __webpack_require__(204),
  /* template */
  __webpack_require__(430),
  /* scopeId */
  "data-v-d420df2c",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 429:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('transition', {
    attrs: {
      "name": "fade",
      "mode": "out-in"
    }
  }, [_c('router-view')], 1)], 1)
},staticRenderFns: []}

/***/ }),

/***/ 430:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "wechat-page"
  }, [(_vm.step === 1) ? _c('div', {
    staticClass: "page-1"
  }, [_c('label', [_vm._v("学校")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.loginForm.universityId),
      expression: "loginForm.universityId"
    }],
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.loginForm.universityId = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    staticStyle: {
      "display": "none"
    },
    attrs: {
      "value": "",
      "disabled": "",
      "selected": ""
    }
  }, [_vm._v("请选择您当前就读学校")]), _vm._v(" "), _vm._l((_vm.universities), function(universitiy) {
    return _c('option', {
      domProps: {
        "value": universitiy.id
      }
    }, [_vm._v(_vm._s(universitiy.name))])
  })], 2), _vm._v(" "), _c('label', [_vm._v("学号")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.loginForm.studentNo),
      expression: "loginForm.studentNo"
    }],
    attrs: {
      "size": "large",
      "type": "text",
      "placeholder": "请输入您的学号"
    },
    domProps: {
      "value": (_vm.loginForm.studentNo)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.loginForm.studentNo = $event.target.value
      }
    }
  }), _vm._v(" "), _c('label', [_vm._v("姓名")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.loginForm.name),
      expression: "loginForm.name"
    }],
    attrs: {
      "size": "large",
      "type": "text",
      "placeholder": "请输入您的姓名"
    },
    domProps: {
      "value": (_vm.loginForm.name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.loginForm.name = $event.target.value
      }
    }
  }), _vm._v(" "), (_vm.verifyError) ? _c('p', {
    staticClass: "error-msg"
  }, [_vm._v("该账号不存在，请联系客服 ")]) : _vm._e()]) : _vm._e(), _vm._v(" "), (_vm.step === 2) ? _c('div', {
    staticClass: "page-3"
  }, [_c('label', [_vm._v("新密码")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.loginForm.password),
      expression: "loginForm.password"
    }],
    attrs: {
      "min": "6",
      "max": "12",
      "size": "large",
      "type": "password",
      "placeholder": "请输入6~12位，包含英文或者数字的密码"
    },
    domProps: {
      "value": (_vm.loginForm.password)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.loginForm.password = $event.target.value
      }
    }
  }), _vm._v(" "), _c('label', [_vm._v("再次输入密码")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.loginForm.rePassword),
      expression: "loginForm.rePassword"
    }],
    attrs: {
      "min": "6",
      "max": "12",
      "size": "large",
      "type": "password",
      "placeholder": "请输入6~12位，包含英文或者数字的密码"
    },
    domProps: {
      "value": (_vm.loginForm.rePassword)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.loginForm.rePassword = $event.target.value
      }
    }
  }), _vm._v(" "), (_vm.passError) ? _c('p', {
    staticClass: "error-msg"
  }, [_vm._v(_vm._s(_vm.passErrorMsg))]) : _vm._e()]) : _vm._e(), _vm._v(" "), _c('button', {
    attrs: {
      "disabled": _vm.isLoading
    },
    on: {
      "click": function($event) {
        _vm.step == 1 ? _vm.next() : _vm.submit()
      }
    }
  }, [_vm._v(_vm._s(_vm.step == 1 ? '下一步' : '提交'))])])
},staticRenderFns: []}

/***/ })

},[205]);
//# sourceMappingURL=app.c33c1675c26c41313963.js.map