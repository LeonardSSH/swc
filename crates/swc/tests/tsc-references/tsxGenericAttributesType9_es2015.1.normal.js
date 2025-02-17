// @filename: file.tsx
// @jsx: preserve
// @noLib: true
// @skipLibCheck: true
// @libFiles: react.d.ts,lib.d.ts
import _extends from "@swc/helpers/src/_extends.mjs";
const React = require('react');
export function makeP(Ctor) {
    return class extends React.PureComponent {
        render() {
            return /*#__PURE__*/ React.createElement(Ctor, _extends({}, this.props));
        }
    };
}
