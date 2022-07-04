// Require .vert and .frag as raw text.

// webpack.config.js
module.exports = {
    module: {
        rules: [
            {
                test: /\.(glsl)$/i,

                type: "asset/source",
            },
        ],
    },
};
