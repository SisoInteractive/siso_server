module.exports = function (path, column, context) {
    context.topic = '';
    context.tags = [
        { url: '?column=case', text: 'Case'},
        { url: '?column=career', text: 'Career'},
        { url: '?column=news', text: 'News'}
    ];

    switch (path) {
        case /\/admin/:
            path = '/admin';
            break;
        case /\/entry/:
            path = '/entry';
            break;
    }

    //  fill the url via path
    context.tags.map(function (tag) {
        return tag.url = path + tag.url;
    });

    //  get context's topic
    context.tags.forEach(function (tag, index, arr) {
        if (tag.text.toLowerCase() == column) {
            return context.topic = arr.splice(index, 1)[0];
        }
    });

    return context;
};