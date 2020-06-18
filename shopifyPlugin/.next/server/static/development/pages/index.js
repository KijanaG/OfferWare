module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/ResourceList.js":
/*!************************************!*\
  !*** ./components/ResourceList.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shopify_polaris__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shopify/polaris */ "@shopify/polaris");
/* harmony import */ var _shopify_polaris__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_shopify_polaris__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var store_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! store-js */ "store-js");
/* harmony import */ var store_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(store_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _shopify_app_bridge_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @shopify/app-bridge/actions */ "@shopify/app-bridge/actions");
/* harmony import */ var _shopify_app_bridge_actions__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_shopify_app_bridge_actions__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _shopify_app_bridge_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @shopify/app-bridge-react */ "@shopify/app-bridge-react");
/* harmony import */ var _shopify_app_bridge_react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_shopify_app_bridge_react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! graphql-tag */ "graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-apollo */ "react-apollo");
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_apollo__WEBPACK_IMPORTED_MODULE_7__);

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









class ResourceListWithProducts extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      updating: {}
    });

    _defineProperty(this, "handleUpload", (id, index) => {
      let updating = this.state.updating;
      updating[id] = true;
      this.setState({
        updating: updating
      });
    });

    _defineProperty(this, "postProductToDB", product => {
      axios__WEBPACK_IMPORTED_MODULE_3___default.a.patch('/api/products', {
        product
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(async res => {
        this.setState({
          updating: {}
        });
        await this.props.fetchProducts();
      }).catch(err => {
        alert("Something went wrong, please refresh page.", err);
      });
    });
  }

  render() {
    const app = this.context;

    const redirectToProduct = () => {
      const redirect = _shopify_app_bridge_actions__WEBPACK_IMPORTED_MODULE_4__["Redirect"].create(app);
      redirect.dispatch(_shopify_app_bridge_actions__WEBPACK_IMPORTED_MODULE_4__["Redirect"].Action.APP, '/edit-products');
    };

    return __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_1__["Card"], null, __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_1__["ResourceList"], {
      showHeader: true,
      resourceName: {
        singular: 'Product',
        plural: 'Products'
      },
      items: this.props.products,
      renderItem: (item, _, indx) => {
        let complete = false;

        if (item.streetAddress && item.city && item.email && item.zipCode && item.state && item.businessName && item.merchantDescription) {
          complete = true;
        }

        const media = __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_1__["Thumbnail"], {
          source: item.images[0] ? item.images[0].originalSrc : '',
          alt: item.images[0] ? item.images[0].altText : ''
        });

        return __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_1__["ResourceList"].Item, {
          id: item.id,
          media: media,
          accessibilityLabel: `View details for ${item.title}`,
          onClick: () => {}
        }, __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_1__["Stack"], null, __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_1__["Stack"].Item, {
          fill: true
        }, __jsx("h3", null, " ", __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_1__["TextStyle"], {
          variation: "strong"
        }, " ", item.title, " "), " ")), __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_1__["Stack"].Item, null, this.state.updating[item.id] ? __jsx(react_apollo__WEBPACK_IMPORTED_MODULE_7__["Query"], {
          query: GET_PRODUCT_BY_ID,
          variables: {
            id: [item.id]
          }
        }, ({
          data,
          loading,
          error
        }) => {
          if (error) return __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_1__["TextStyle"], null, error.message);
          if (data) this.postProductToDB(data.nodes[0]);
          return __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_1__["Button"], {
            loading: this.state.updating[item.id],
            primary: true
          }, "Update Item");
        }) : __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_1__["Form"], {
          onSubmit: () => this.handleUpload(item.id, indx),
          preventDefault: true
        }, __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_1__["Button"], {
          loading: false,
          submit: true,
          primary: true
        }, "Update Item"))), __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_1__["Stack"].Item, null, "\xA0 ", item.redeemedTotal, "/", item.transactionTotal, " \xA0"), __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_1__["Stack"].Item, null, __jsx("div", {
          style: {
            color: complete ? "green" : "red"
          }
        }, __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_1__["Button"], {
          monochrome: true,
          outline: true,
          onClick: () => {
            store_js__WEBPACK_IMPORTED_MODULE_2___default.a.set('product', item);
            redirectToProduct();
          }
        }, complete ? " Complete " : "Incomplete", " ")))));
      }
    }));
  }

}

_defineProperty(ResourceListWithProducts, "contextType", _shopify_app_bridge_react__WEBPACK_IMPORTED_MODULE_5__["Context"]);

/* harmony default export */ __webpack_exports__["default"] = (ResourceListWithProducts);
const GET_PRODUCT_BY_ID = graphql_tag__WEBPACK_IMPORTED_MODULE_6___default.a`
  query getProducts($id: [ID!]!) {
    nodes(ids: $id) {
      ... on Product {
        title
        descriptionHtml
        id
        variants(first:4){
          edges{
            node{
              compareAtPrice
              price
              title
            }
          }
        }
        images(first: 10) {
          edges {
            node {
              originalSrc
              altText
            }
          }
        }
      }
    }
  }
`;

/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shopify_polaris__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shopify/polaris */ "@shopify/polaris");
/* harmony import */ var _shopify_polaris__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_shopify_polaris__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _shopify_app_bridge_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shopify/app-bridge-react */ "@shopify/app-bridge-react");
/* harmony import */ var _shopify_app_bridge_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_shopify_app_bridge_react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var store_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! store-js */ "store-js");
/* harmony import */ var store_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(store_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! graphql-tag */ "graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-apollo */ "react-apollo");
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_apollo__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _components_ResourceList__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/ResourceList */ "./components/ResourceList.js");

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

class Index extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      open: false,
      loadingDB: true,
      products: [],
      productIDs: null
    });

    _defineProperty(this, "postNewProductsToDB", products => {
      axios__WEBPACK_IMPORTED_MODULE_3___default.a.post('/api/products', {
        products: products.nodes
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(async res => {
        await this.fetchProducts();
        this.setState({
          productIDs: null
        });
      }).catch(err => {
        alert("Failed To Update Database, Please Try Again.");
      });
    });

    _defineProperty(this, "handleSelection", async resources => {
      const idsFromResources = resources.selection.map(product => product.id);
      this.setState({
        open: false,
        productIDs: idsFromResources
      });
    });

    _defineProperty(this, "fetchProducts", async () => {
      return await fetch('/api/products').then(res => res.json()).then(response => {
        this.setState({
          products: response.data,
          loadingDB: false
        });
        return true;
      }).catch(err => {
        alert(err);
        return null;
      });
    });
  }

  async componentDidMount() {
    this.fetchProducts();
  }

  render() {
    const emptyState = this.state.products.length === 0;
    const {
      loadingDB,
      productIDs
    } = this.state;

    if (loadingDB) {
      //Fetching Products from Database 
      return __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_1__["Page"], null, __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_1__["Layout"], null, __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_1__["EmptyState"], {
        centeredLayout: true,
        heading: 'Fetching Products from Database...'
      }, __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_1__["Spinner"], {
        accessibilityLabel: "Spinner",
        size: "large",
        color: "inkLightest"
      }))));
    }

    if (productIDs) {
      return (//If exists, user gave Voucher functionality to these products
        __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_1__["Page"], null, __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_1__["Layout"], null, __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_1__["EmptyState"], {
          centeredLayout: true,
          heading: 'Adding Specified Products to Database...'
        }, __jsx(react_apollo__WEBPACK_IMPORTED_MODULE_6__["Query"], {
          query: GET_PRODUCTS_BY_ID,
          variables: {
            ids: productIDs
          }
        }, ({
          data,
          loading,
          error
        }) => {
          if (loading) return __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_1__["Spinner"], {
            accessibilityLabel: "Spinner",
            size: "large",
            color: "inkLightest"
          });
          if (error) return __jsx("div", null, error.message);else {
            this.postNewProductsToDB(data);
            return __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_1__["Spinner"], {
              accessibilityLabel: "Spinner",
              size: "large",
              color: "inkLightest"
            });
          }
        }))))
      );
    }

    return __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_1__["Page"], null, __jsx(_shopify_app_bridge_react__WEBPACK_IMPORTED_MODULE_2__["TitleBar"], {
      primaryAction: {
        content: 'Select services',
        onAction: () => this.setState({
          open: true
        })
      }
    }), __jsx(_shopify_app_bridge_react__WEBPACK_IMPORTED_MODULE_2__["ResourcePicker"], {
      resourceType: "Product",
      showVariants: false,
      open: this.state.open,
      onSelection: resources => this.handleSelection(resources),
      onCancel: () => this.setState({
        open: false
      })
    }), emptyState ? __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_1__["Layout"], null, __jsx(_shopify_polaris__WEBPACK_IMPORTED_MODULE_1__["EmptyState"], {
      heading: "Send Vouchers to your customers to be redeemed in-store.",
      action: {
        content: 'Select Services',
        onAction: () => this.setState({
          open: true
        })
      },
      image: img
    }, __jsx("p", null, "Select products/services for which to send vouchers to customers via email."))) : __jsx(_components_ResourceList__WEBPACK_IMPORTED_MODULE_7__["default"], {
      fetchProducts: this.fetchProducts,
      products: this.state.products
    }));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Index);
const GET_PRODUCTS_BY_ID = graphql_tag__WEBPACK_IMPORTED_MODULE_5___default.a`
  query getProducts($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        title
        descriptionHtml
        id
        variants(first:4){
          edges{
            node{
              compareAtPrice
              price
              title
            }
          }
        }
        images(first: 10) {
          edges {
            node {
              originalSrc
              altText
            }
          }
        }
      }
    }
  }
`;

/***/ }),

/***/ 4:
/*!******************************!*\
  !*** multi ./pages/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/kjgarrett/Desktop/Deals/shopifyPlugin/pages/index.js */"./pages/index.js");


/***/ }),

/***/ "@shopify/app-bridge-react":
/*!********************************************!*\
  !*** external "@shopify/app-bridge-react" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@shopify/app-bridge-react");

/***/ }),

/***/ "@shopify/app-bridge/actions":
/*!**********************************************!*\
  !*** external "@shopify/app-bridge/actions" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@shopify/app-bridge/actions");

/***/ }),

/***/ "@shopify/polaris":
/*!***********************************!*\
  !*** external "@shopify/polaris" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@shopify/polaris");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "graphql-tag":
/*!******************************!*\
  !*** external "graphql-tag" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql-tag");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-apollo":
/*!*******************************!*\
  !*** external "react-apollo" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-apollo");

/***/ }),

/***/ "store-js":
/*!***************************!*\
  !*** external "store-js" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("store-js");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map