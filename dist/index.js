"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var facenn_1 = __importDefault(require("facenn"));
var imagecodec_1 = __importDefault(require("imagecodec"));
module.exports = function getFaceFeature(picture) {
    if (!picture) {
        return;
    }
    var type = '';
    var PNG = 'png';
    var arr = (new Uint8Array(picture)).subarray(0, 4);
    var headerString = arr.reduce(function (acc, cur) { return acc + cur.toString(16); }, '');
    switch (headerString) {
        case "89504e47":
            type = "png";
            break;
        case "47494638":
            type = "gif";
            break;
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
            type = "jpg";
            break;
        default:
            type = 'jpg';
            console.log('[mime-type] not png/gif/jpg.');
            break;
    }
    var bitmap = imagecodec_1.default.decode(picture, {
        components: imagecodec_1.default.COMPONENTS_RGB
    });
    if (!bitmap || !bitmap.buffer) {
        return;
    }
    var faces = facenn_1.default.detect(bitmap.buffer, {
        width: bitmap.width,
        height: bitmap.height,
        pixelFormat: facenn_1.default.PIX_FMT_RGB24
    }, true);
    var faceFeatures = [];
    if (faces.length) {
        var feature_1;
        faces.map(function (item) {
            feature_1 = facenn_1.default.feature(bitmap.buffer, {
                width: bitmap.width,
                height: bitmap.height,
                pixelFormat: facenn_1.default.PIX_FMT_RGB24
            }, item, {
                live: true,
                emotion: true
            });
            faceFeatures.push(feature_1);
        });
    }
    return faceFeatures;
};
