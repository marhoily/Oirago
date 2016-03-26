
function onmessage1(a) {
    parse(new DataView(a.data));
}

function handlePlayerDeath() {
    /** @type {boolean} */
    isConnected = false;
    clearTimeout(timer);
    if (null == browser.storageInfo) {
        browser.createDefaultStorage();
    }
    /** @type {number} */
    max = Date.now();
    if (0 >= aux) {
        /** @type {number} */
        aux = max;
    }
    /** @type {boolean} */
    Aa = false;
    setPosition();
}

function parse(data) {
    /**
     * @return {?}
     */
    var offset: number;

    function encode() {
        /** @type {string} */
        var str = "";
        for (; ;) {
            var b = data.getUint16(offset, true);
            offset += 2;
            if (0 == b) {
                break;
            }
            str += String.fromCharCode(b);
        }
        return str;
    }

    /** @type {number} */
    offset = 0;
    if (240 == data.getUint8(offset)) {
        handlePlayerDeath();
    } else {
        switch (data.getUint8(offset++)) {
            case 16:
                init(data, offset);
                break;
            case 17:
                ballsCenterWhenNoBallsX = data.getFloat32(offset, true);
                offset += 4;
                ballsCenterWhenNoBallsY = data.getFloat32(offset, true);
                offset += 4;
                worldZoom = data.getFloat32(offset, true);
                offset += 4;
                break;
            case 18:
                /** @type {Array} */
                that = [];
                /** @type {Array} */
                balls = [];
                args = {};
                /** @type {Array} */
                parts = [];
                break;
            case 20:
                /** @type {Array} */
                balls = [];
                /** @type {Array} */
                that = [];
                break;
            case 21:
                matches = data.getInt16(offset, true);
                offset += 2;
                s = data.getInt16(offset, true);
                offset += 2;
                if (!nb) {
                    /** @type {boolean} */
                    nb = true;
                    xr = matches;
                    pos = s;
                }
                break;
            case 32:
                that.push(data.getUint32(offset, true));
                offset += 4;
                break;
            case 49:
                if (null != angles) {
                    break;
                }
                var b = data.getUint32(offset, true);
                offset = offset + 4;
                /** @type {Array} */
                list = [];
                /** @type {number} */
                var a = 0;
                for (; a < b; ++a) {
                    var token = data.getUint32(offset, true);
                    offset = offset + 4;
                    list.push({
                        id: token,
                        name: encode()
                    });
                }
                create();
                break;
            case 50:
                /** @type {Array} */
                angles = [];
                b = data.getUint32(offset, true);
                offset += 4;
                /** @type {number} */
                a = 0;
                for (; a < b; ++a) {
                    angles.push(data.getFloat32(offset, true));
                    offset += 4;
                }
                create();
                break;
            case 64:
                minX = data.getFloat64(offset, true);
                offset += 8;
                minY = data.getFloat64(offset, true);
                offset += 8;
                maxX = data.getFloat64(offset, true);
                offset += 8;
                maxY = data.getFloat64(offset, true);
                offset += 8;
                if (data.byteLength > offset) {
                    b = data.getUint32(offset, true);
                    offset += 4;
                    /** @type {boolean} */
                    started = !!(b & 1);
                    passes = encode();
                    browser.MC.updateServerVersion(passes);
                    console.log(`Server version ${passes}`);
                }
                break;
            case 102:
                b = data.buffer.slice(offset);
                options.core.proxy.forwardProtoMessage(b);
                break;
            case 104:
                browser.logout();
        }
    }
}