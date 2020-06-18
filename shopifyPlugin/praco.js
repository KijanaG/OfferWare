var serialize = require('serialize-javascript');
let serializedString = serialize({ str: '<script>alert(0)</script>' });
console.log(serializedString)
