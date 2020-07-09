module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./config/config.js":
/*!**************************!*\
  !*** ./config/config.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nvar config = {\n    env: \"development\" || false,\n    port: process.env.PORT || 3000,\n    jwtSecret: process.env.JWT_SECRET || 'marlina_kreatif_studio',\n    mongoUri: process.env.MONGODB_URI || process.env.MONGO_HOST || 'mongodb://' + (process.env.IP || 'localhost') + \":\" + (process.env.MONGO_PORT || '27017') + '/mernproject'\n};\n\nexports.default = config;\n\n//# sourceURL=webpack:///./config/config.js?");

/***/ }),

/***/ "./server/controllers/auth.controller.js":
/*!***********************************************!*\
  !*** ./server/controllers/auth.controller.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _user = __webpack_require__(/*! ../models/user.model */ \"./server/models/user.model.js\");\n\nvar _user2 = _interopRequireDefault(_user);\n\nvar _jsonwebtoken = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n\nvar _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);\n\nvar _expressJwt = __webpack_require__(/*! express-jwt */ \"express-jwt\");\n\nvar _expressJwt2 = _interopRequireDefault(_expressJwt);\n\nvar _config = __webpack_require__(/*! ./../../config/config */ \"./config/config.js\");\n\nvar _config2 = _interopRequireDefault(_config);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar signin = function signin(req, res) {\n    _user2.default.findOne({\n        'email': req.body.email\n    }, function (err, user) {\n        if (err || !user) {\n            return res.status('401').json({\n                error: 'User Not Found'\n            });\n        }\n\n        if (!user.authenticate(req.body.password)) {\n            return res.status('401').send({\n                error: \"Email and password don't match.\"\n            });\n        }\n        var token = _jsonwebtoken2.default.sign({\n            _id: user._id\n        }, _config2.default.jwtSecret);\n\n        res.cookie(\"t\", token, { expire: new Date() + 999 });\n\n        return res.json({\n            token: token, user: {\n                _id: user._id,\n                name: user.name,\n                email: user.email\n            }\n        });\n    });\n};\n\nvar signout = function signout(req, res) {\n    res.clearCookies(\"t\");\n    return res.status('200').json({\n        message: \"Signed out\"\n    });\n};\n\nvar requiredSignin = (0, _expressJwt2.default)({\n    secret: _config2.default.jwtSecret,\n    userProperty: 'auth',\n    algorithms: ['RS256']\n});\n\nvar hasAuthorization = function hasAuthorization(req, res, next) {\n    var authorized = req.profile && req.auth && req.profile._id === req.auth._id;\n    if (!authorized) {\n        return res.status('403').json({\n            error: \"User is not authorized\"\n        });\n    }\n\n    next();\n};\n\nexports.default = { signin: signin, signout: signout, requiredSignin: requiredSignin, hasAuthorization: hasAuthorization };\n\n//# sourceURL=webpack:///./server/controllers/auth.controller.js?");

/***/ }),

/***/ "./server/controllers/user.controller.js":
/*!***********************************************!*\
  !*** ./server/controllers/user.controller.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _user = __webpack_require__(/*! ../models/user.model */ \"./server/models/user.model.js\");\n\nvar _user2 = _interopRequireDefault(_user);\n\nvar _lodash = __webpack_require__(/*! lodash */ \"lodash\");\n\nvar _lodash2 = _interopRequireDefault(_lodash);\n\nvar _dbErrorHandler = __webpack_require__(/*! ./../helpers/dbErrorHandler */ \"./server/helpers/dbErrorHandler.js\");\n\nvar _dbErrorHandler2 = _interopRequireDefault(_dbErrorHandler);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar create = function create(req, res, next) {\n    console.info(\"INFO =>>>>>>\", req.body);\n    var user = new _user2.default(req.body);\n    user.save(function (err, result) {\n        if (err) {\n            console.log(\"ERROR+++++++++>>>>>\", err);\n\n            return res.status(400).json({\n                error: _dbErrorHandler2.default.getErrorMessage\n            });\n        }\n        res.status(200).json({\n            message: \"Successfully signed up!\"\n        });\n    });\n};\nvar list = function list(req, res) {\n    _user2.default.find(function (err, users) {\n        if (err) {\n            return res.status(400).json({\n                error: _dbErrorHandler2.default.getErrorMessage(err)\n            });\n        }\n        res.json(users);\n    }).select('name email updated created');\n};\nvar userByID = function userByID(req, res, next, id) {\n    _user2.default.findById(id).exec(function (err, user) {\n        if (err || !user) {\n            return res.status(400).json({\n                error: \"User not found\"\n            });\n        }\n        req.profile = user;\n        next();\n    });\n};\nvar read = function read(req, res) {\n    req.profile.hased_password = undefined;\n    req.profile.salt = undefined;\n    return res.json(req.profile);\n};\nvar update = function update(req, res, next) {\n    var user = req.profile;\n    user = _lodash2.default.extend(user, req.body);\n    user.update = Date.now();\n    user.save(function (err) {\n        if (err) {\n            return res.status(400).json({\n                error: _dbErrorHandler2.default.getErrorMessage(err)\n            });\n        }\n        user.hased_password = undefined;\n        user.salt = undefined;\n        res.json(user);\n    });\n};\nvar remove = function remove(req, res, next) {\n    var user = req.profile;\n    user.remove(function (err, deleteUser) {\n        if (err) {\n            return res.status(400).json({\n                error: _dbErrorHandler2.default.getErrorMessage(err)\n            });\n        }\n        deleteUser.hased_password = undefined;\n        deleteUser.salt = undefined;\n        res.json(deleteUser);\n    });\n};\n\nexports.default = {\n    create: create, list: list, userByID: userByID, read: read, remove: remove, update: update\n};\n\n//# sourceURL=webpack:///./server/controllers/user.controller.js?");

/***/ }),

/***/ "./server/express.js":
/*!***************************!*\
  !*** ./server/express.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nvar _bodyParser2 = _interopRequireDefault(_bodyParser);\n\nvar _cookieParser = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\n\nvar _cookieParser2 = _interopRequireDefault(_cookieParser);\n\nvar _compression = __webpack_require__(/*! compression */ \"compression\");\n\nvar _compression2 = _interopRequireDefault(_compression);\n\nvar _helmet = __webpack_require__(/*! helmet */ \"helmet\");\n\nvar _helmet2 = _interopRequireDefault(_helmet);\n\nvar _cors = __webpack_require__(/*! cors */ \"cors\");\n\nvar _cors2 = _interopRequireDefault(_cors);\n\nvar _user = __webpack_require__(/*! ./routes/user.routes */ \"./server/routes/user.routes.js\");\n\nvar _user2 = _interopRequireDefault(_user);\n\nvar _auth = __webpack_require__(/*! ./routes/auth.routes */ \"./server/routes/auth.routes.js\");\n\nvar _auth2 = _interopRequireDefault(_auth);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * A collection of middleware functions to help secure Express apps by setting various HTTP headers\n */\n\n/**\n * Cookie parsing middleware to parse and set cookies in request objects \n */\nvar app = (0, _express2.default)();\n\n/**\n * configuration express here\n */\n\n/**\n * Middleware to enable CORS (Cross-origin resource sharing)\n */\n\n/**\n * Compression middleware that will attempt to compress response bodies \n * for all requests that traverse through the middleware\n */\n\n/**\n * Body parsing middleware to handle the complexities of parsing streamable request objects,\n * so we can simplify browser-server communication by exchanging JSON in the request body:\n */\napp.use(_bodyParser2.default.json());\napp.use(_bodyParser2.default.urlencoded({ extended: true }));\n\napp.use((0, _cookieParser2.default)());\napp.use((0, _compression2.default)());\napp.use((0, _helmet2.default)());\napp.use((0, _cors2.default)());\n\napp.use('/', _user2.default);\napp.use('/', _auth2.default);\n\n/**\n * auth error handling for express-jwt\n */\napp.use(function (err, req, res, next) {\n  if (err.name === \"UnauthorizedError\") {\n    res.status(401).json({ error: err.name + \":\" + err.message });\n  }\n});\n\nexports.default = app;\n\n//# sourceURL=webpack:///./server/express.js?");

/***/ }),

/***/ "./server/helpers/dbErrorHandler.js":
/*!******************************************!*\
  !*** ./server/helpers/dbErrorHandler.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nvar getErrorMessage = function getErrorMessage(err) {\n    var message = \"\";\n    if (err.code) {\n        switch (err.code) {\n            case 11000:\n            case 11001:\n                message = getUniqueErrorMessage(err);\n                break;\n\n            default:\n                message = 'Something went wrong';\n                break;\n        }\n    } else {\n        for (var errName in err.errors) {\n            if (err.errors[errName].message) {\n                message = err.errors[errName].message;\n            }\n        }\n    }\n    return message;\n};\n\nvar getUniqueErrorMessage = function getUniqueErrorMessage(err) {\n    var output = void 0;\n\n    try {\n        var fieldName = err.message.substring(err.message.lastIndexOf('.$') + 2, err.message.lastIndexOf('_1'));\n        output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists';\n    } catch (error) {\n        output = 'Unique  field already exists';\n    }\n\n    return output;\n};\n\nexports.default = {\n    getErrorMessage: getErrorMessage\n};\n\n//# sourceURL=webpack:///./server/helpers/dbErrorHandler.js?");

/***/ }),

/***/ "./server/models/user.model.js":
/*!*************************************!*\
  !*** ./server/models/user.model.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nvar _crypto = __webpack_require__(/*! crypto */ \"crypto\");\n\nvar _crypto2 = _interopRequireDefault(_crypto);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// Declare the Schema of the Mongo model\nvar UserSchema = new _mongoose2.default.Schema({\n    name: {\n        type: String,\n        required: 'Name is required',\n        trim: true\n    },\n    email: {\n        type: String,\n        trim: true,\n        required: 'Email is required',\n        unique: 'Email already exist',\n        match: [/.+\\@.+\\..+/, 'Please fill valid email address']\n    },\n    created: {\n        type: Date,\n        default: Date.now\n    },\n    updated: Date,\n    hashed_password: {\n        type: String,\n        required: 'Password is required'\n    },\n    salt: String\n});\n\nUserSchema.virtual('password').set(function (password) {\n    console.log(\"ENTER VIRTUAL PASSWORD=============>>\", password);\n\n    this._password = password;\n    this.salt = this.makeSalt();\n    this.hashed_password = this.encryptPassword(password);\n    console.log(\"HASHED_PASSWORD IS =============>>\", this.hashed_password);\n}).get(function () {\n    return this._password;\n});\n\nUserSchema.methods = {\n    authenticate: function authenticate(plainText) {\n        return this.encryptPassword(plainText) === this.hashed_password;\n    },\n    encryptPassword: function encryptPassword(password) {\n        console.log(\"ENTER ECRYPT PASSWORD ====>\", password);\n\n        if (!password) {\n            return '';\n        }\n        try {\n            return _crypto2.default.createHmac('sha1', this.salt).update(password).digest('hex');\n        } catch (error) {\n            console.log(\"ECRYPT PASSWORD ERROR :::::::::\", error);\n\n            return '';\n        }\n    },\n    makeSalt: function makeSalt() {\n        return Math.round(new Date().valueOf() * Math.random()) + '';\n    }\n};\n\nUserSchema.path('hashed_password').validate(function (v) {\n    console.log(\"ENTER PATH HASHED_PASSWORD\");\n    if (this._password && this._password.length < 6) {\n        this.invalidate('password', 'Password must be at least 6 characters.');\n    }\n    if (this.isNew && !this._password) {\n        this.invalidate('password', 'Password is required');\n    }\n}, null);\n\nexports.default = _mongoose2.default.model('User', UserSchema);\n\n//# sourceURL=webpack:///./server/models/user.model.js?");

/***/ }),

/***/ "./server/routes/auth.routes.js":
/*!**************************************!*\
  !*** ./server/routes/auth.routes.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _auth = __webpack_require__(/*! ../controllers/auth.controller */ \"./server/controllers/auth.controller.js\");\n\nvar _auth2 = _interopRequireDefault(_auth);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar router = _express2.default.Router();\n\nrouter.route('/auth/signin').post(_auth2.default.signin);\n\nrouter.route('/auth/signout').get(_auth2.default.signout);\n\nexports.default = router;\n\n//# sourceURL=webpack:///./server/routes/auth.routes.js?");

/***/ }),

/***/ "./server/routes/user.routes.js":
/*!**************************************!*\
  !*** ./server/routes/user.routes.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _express = __webpack_require__(/*! express */ \"express\");\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _user = __webpack_require__(/*! ./../controllers/user.controller */ \"./server/controllers/user.controller.js\");\n\nvar _user2 = _interopRequireDefault(_user);\n\nvar _auth = __webpack_require__(/*! ./../controllers/auth.controller */ \"./server/controllers/auth.controller.js\");\n\nvar _auth2 = _interopRequireDefault(_auth);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar router = _express2.default.Router();\n\nrouter.route('/api/users/').get(_user2.default.list).post(_user2.default.create);\n\nrouter.route('/api/users/:userId').get(_auth2.default.requiredSignin, _user2.default.read).put(_auth2.default.requiredSignin, _auth2.default.hasAuthorization, _user2.default.update).delete(_auth2.default.requiredSignin, _auth2.default.hasAuthorization, _user2.default.remove);\n\nrouter.param('userId', _user2.default.userByID);\n\nexports.default = router;\n\n//# sourceURL=webpack:///./server/routes/user.routes.js?");

/***/ }),

/***/ "./server/server.js":
/*!**************************!*\
  !*** ./server/server.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _config = __webpack_require__(/*! ./../config/config */ \"./config/config.js\");\n\nvar _config2 = _interopRequireDefault(_config);\n\nvar _express = __webpack_require__(/*! ./express */ \"./server/express.js\");\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _template = __webpack_require__(/*! ./../template */ \"./template.js\");\n\nvar _template2 = _interopRequireDefault(_template);\n\nvar _mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\n\nvar _mongoose2 = _interopRequireDefault(_mongoose);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n_mongoose2.default.Promise = global.Promise;\n_mongoose2.default.set('useUnifiedTopology', true);\n_mongoose2.default.connect(_config2.default.mongoUri, { useNewUrlParser: true });\n\n_mongoose2.default.connection.on('error', function () {\n    throw new Error('unable to connect to database : ' + _config2.default.mongoUri);\n});\n\n_express2.default.get('/', function (req, res) {\n    res.status(200).send((0, _template2.default)());\n});\n\n_express2.default.listen(_config2.default.port, function (err) {\n    if (err) {\n        console.error(\"ERROR TO START SERVER: \", err);\n    }\n    console.info('SERVER STARTED ON PORT %s.', _config2.default.port);\n});\n\n//# sourceURL=webpack:///./server/server.js?");

/***/ }),

/***/ "./template.js":
/*!*********************!*\
  !*** ./template.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nexports.default = function () {\n    return \"\\n    <!DOCTYPE html>\\n    <html lang=\\\"en\\\">\\n    <head>\\n        <meta charset=\\\"UTF-8\\\"/>\\n        <title>MERN SEKELETON</title>\\n    </head>\\n    <body>\\n        <div id=\\\"root\\\">HELLO WORLD</div>\\n    </body>\\n    </html>\";\n};\n\n//# sourceURL=webpack:///./template.js?");

/***/ }),

/***/ 0:
/*!********************************!*\
  !*** multi ./server/server.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! /home/marlina/Documents/PROJECT/mern_sekleton_backend/server/server.js */\"./server/server.js\");\n\n\n//# sourceURL=webpack:///multi_./server/server.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"compression\");\n\n//# sourceURL=webpack:///external_%22compression%22?");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cookie-parser\");\n\n//# sourceURL=webpack:///external_%22cookie-parser%22?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"crypto\");\n\n//# sourceURL=webpack:///external_%22crypto%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-jwt":
/*!******************************!*\
  !*** external "express-jwt" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-jwt\");\n\n//# sourceURL=webpack:///external_%22express-jwt%22?");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"helmet\");\n\n//# sourceURL=webpack:///external_%22helmet%22?");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonwebtoken\");\n\n//# sourceURL=webpack:///external_%22jsonwebtoken%22?");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"lodash\");\n\n//# sourceURL=webpack:///external_%22lodash%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ })

/******/ });