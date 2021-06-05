const { DateTime } = require('luxon');
const fs = require('fs');
const criticalCss = require('eleventy-critical-css');

module.exports = function(eleventyConfig) {
    // Copy files to public directory
    eleventyConfig.addPassthroughCopy('src/styles/**/*.css');
    eleventyConfig.addPassthroughCopy('src/scripts');
    eleventyConfig.addPassthroughCopy('src/**/*.(html|jpg|png|gif|webp|avif|ico|svg|mp4|xml)');

    // Collections
    eleventyConfig.addCollection('tagList', (collection) => {
        const tagSet = new Set();
        collection.getAll().forEach(item => {
            (item.data.tags || []).forEach(tag => tagSet.add(tag));
        });

        return [...tagSet].sort();
    });

    // Filters
    eleventyConfig.addFilter('readableDate', (dateObj) => {
        const year = dateObj.getFullYear();
        const date = dateObj.getDate();

        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        const monthIndex = dateObj.getMonth();
        const monthName = months[monthIndex];

        return `${monthName} ${date}, ${year}`;
    });

    // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
    });

    // Get the first `n` elements of a collection.
    eleventyConfig.addFilter('head', (array, n) => {
        if( n < 0 ) {
            return array.slice(n);
        }

        return array.slice(0, n);
    });

    // Return the smallest number argument
    eleventyConfig.addFilter('min', (...numbers) => {
        return Math.min.apply(null, numbers);
    });

    eleventyConfig.addFilter('filterTagList', tags => {
        // should match the list in tags.njk
        return (tags || []).filter(tag => ['all', 'nav', 'post', 'posts'].indexOf(tag) === -1);
    })

    // https://www.11ty.dev/docs/data-deep-merge/
    eleventyConfig.setDataDeepMerge(true);

    // Alias `layout: post` to `layout: layouts/post.njk`
    eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');

    // Transforms
    eleventyConfig.addTransform('htmlmin', require('./_11ty/transforms/htmlmin'));

    // Override Browsersync defaults (used only with --serve)
    eleventyConfig.setBrowserSyncConfig({
        callbacks: {
            ready: function(err, browserSync) {
                const content_404 = fs.readFileSync('_site/404.html');

                browserSync.addMiddleware('*', (req, res) => {
                    // Provides the 404 content without redirect.
                    res.writeHead(404, {'Content-Type': 'text/html; charset=UTF-8'});
                    res.write(content_404);
                    res.end();
                });
            },
        },
        ui: false,
        ghostMode: false
    });

    // Plugins
    eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-rss'));
    eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'), {
        templateFormats: ['njk', 'md'],
        trim: true,
    });
    eleventyConfig.addPlugin(require('@11ty/eleventy-navigation'));
    eleventyConfig.addPlugin(require('eleventy-plugin-reading-time'));
    eleventyConfig.addPlugin(criticalCss, {
        // Inline the generated critical-path CSS
        // - true generates HTML
        // - false generates CSS
        inline: true,
        // Viewport width
        width: 600,
        // Viewport height
        height: 900,
        // Minify critical-path CSS when inlining
        minify: true,
    });

    // Customize Markdown library and settings:
    const markdownIt = require('markdown-it');
    const markdownItAnchor = require('markdown-it-anchor');
    let markdownLibrary = markdownIt({
        html: true,
        breaks: true,
        linkify: true
    }).use(markdownItAnchor, {
        permalink: true,
        permalinkClass: "direct-link",
        permalinkSymbol: "#"
    });
    eleventyConfig.setLibrary("md", markdownLibrary);

    // By default, anything listed in .gitignore or .eleventyignore will be ignored by eleventy's watch process. If the compiled CSS is ignored, eleventy --serve wouldn't rebuild of the html whenever your sass is recompiled.
    eleventyConfig.setUseGitIgnore(false);

    return {
        dir: {
            input: 'src',
            includes: '_includes',
            layouts: '_layouts',
            data: '_data',
            output: '_site'
        },

        // Opt-out of pre-processing global data JSON files: (default: `liquid`)
        dataTemplateEngine: false,

        // Pre-process *.md files with: (default: `liquid`)
        markdownTemplateEngine: 'njk',

        // Pre-process *.html files with: (default: `liquid`)
        htmlTemplateEngine: 'njk',

        // Control which files Eleventy will process
        templateFormats: [
            'md',
            'njk',
            'html',
            'liquid'
        ],

        passthroughFileCopy: true,

        // -----------------------------------------------------------------
        // If your site deploys to a subdirectory, change `pathPrefix`.
        // Don’t worry about leading and trailing slashes, we normalize these.

        // If you don’t have a subdirectory, use '' or '/' (they do the same thing)
        // This is only used for link URLs (it does not affect your file structure)
        // Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/

        // You can also pass this in on the command line using `--pathprefix`

        // Optional (default is shown)
        pathPrefix: '/',
    };
};
