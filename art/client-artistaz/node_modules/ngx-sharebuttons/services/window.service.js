import { Injectable } from '@angular/core';
var WindowService = (function () {
    function WindowService() {
    }
    Object.defineProperty(WindowService.prototype, "nativeWindow", {
        get: function () {
            return _window();
        },
        enumerable: true,
        configurable: true
    });
    return WindowService;
}());
export { WindowService };
WindowService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
WindowService.ctorParameters = function () { return []; };
function _window() {
    // return the global native browser window object
    return typeof window !== 'undefined' ? window : undefined;
}
//# sourceMappingURL=window.service.js.map