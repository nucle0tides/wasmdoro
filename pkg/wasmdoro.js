/* tslint:disable */
import * as wasm from './wasmdoro_bg';

let cachedTextDecoder = new TextDecoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

let cachedGlobalArgumentPtr = null;
function globalArgumentPtr() {
    if (cachedGlobalArgumentPtr === null) {
        cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();
    }
    return cachedGlobalArgumentPtr;
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}

function freeWasmdoroTimer(ptr) {

    wasm.__wbg_wasmdorotimer_free(ptr);
}
/**
*/
export class WasmdoroTimer {

    static __wrap(ptr) {
        const obj = Object.create(WasmdoroTimer.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        freeWasmdoroTimer(ptr);
    }

    /**
    * @returns {WasmdoroTimer}
    */
    static new() {
        return WasmdoroTimer.__wrap(wasm.wasmdorotimer_new());
    }
    /**
    * @returns {void}
    */
    start_pomodoro() {
        return wasm.wasmdorotimer_start_pomodoro(this.ptr);
    }
    /**
    * @returns {void}
    */
    reset_pomodoro() {
        return wasm.wasmdorotimer_reset_pomodoro(this.ptr);
    }
    /**
    * @returns {void}
    */
    successful_pomodoro() {
        return wasm.wasmdorotimer_successful_pomodoro(this.ptr);
    }
    /**
    * @returns {number}
    */
    pomodoro_count() {
        return wasm.wasmdorotimer_pomodoro_count(this.ptr);
    }
    /**
    * @returns {string}
    */
    total_time() {
        const retptr = globalArgumentPtr();
        wasm.wasmdorotimer_total_time(retptr, this.ptr);
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];

        const realRet = getStringFromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 1);
        return realRet;

    }
    /**
    * @returns {boolean}
    */
    inprogress_pomodoro() {
        return (wasm.wasmdorotimer_inprogress_pomodoro(this.ptr)) !== 0;
    }
    /**
    * @returns {boolean}
    */
    times_up() {
        return (wasm.wasmdorotimer_times_up(this.ptr)) !== 0;
    }
    /**
    * @returns {void}
    */
    decrement_time() {
        return wasm.wasmdorotimer_decrement_time(this.ptr);
    }
    /**
    * @returns {string}
    */
    render() {
        const retptr = globalArgumentPtr();
        wasm.wasmdorotimer_render(retptr, this.ptr);
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];

        const realRet = getStringFromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 1);
        return realRet;

    }
}

export function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}

