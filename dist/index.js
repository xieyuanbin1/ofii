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
