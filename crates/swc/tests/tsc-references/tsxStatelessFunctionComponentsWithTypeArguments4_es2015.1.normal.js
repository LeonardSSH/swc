// @filename: file.tsx
// @jsx: preserve
// @module: amd
// @noLib: true
// @skipLibCheck: true
// @libFiles: react.d.ts,lib.d.ts
import _extends from "@swc/helpers/src/_extends.mjs";
const React = require('react');
// Error
function Baz(arg1, arg2) {
    let a0 = /*#__PURE__*/ React.createElement(OverloadComponent, {
        a: arg1.b
    });
    let a2 = /*#__PURE__*/ React.createElement(OverloadComponent, _extends({}, arg1, {
        "ignore-prop": true
    })) // missing a
    ;
}
export { };
