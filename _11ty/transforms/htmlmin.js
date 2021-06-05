const htmlMinifier = require('html-minifier');

function htmlmin(content, outputPath) {
    if (outputPath && outputPath.endsWith('.html')) {
        return htmlMinifier.minify(
            content,
            {
                removeComments: true,
                collapseWhitespace: true,
                minifyJS: true,
                minifyCSS: true,
            },
        );
    }
    return content;
}

module.exports = htmlmin;
