import { Pipe } from '@angular/core';
import { Helper } from './index';
var NFormatterPipe = (function () {
    function NFormatterPipe() {
    }
    NFormatterPipe.prototype.transform = function (num, digits) {
        if (typeof num !== 'number') {
            throw new Error('A number is expected for nFormatter');
        }
        return Helper.nFormatter(num, digits);
    };
    return NFormatterPipe;
}());
export { NFormatterPipe };
NFormatterPipe.decorators = [
    { type: Pipe, args: [{
                name: 'nFormatter'
            },] },
];
/** @nocollapse */
NFormatterPipe.ctorParameters = function () { return []; };
//# sourceMappingURL=n-formatter.pipe.js.map