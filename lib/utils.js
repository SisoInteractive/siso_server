function formatDate (date, format) {
    var split = format.split(/\W/);
    //  if symbol not matched, symbol will use Chinese to identify
    var symbol = format.match(/\/|-/) || false;
    if (symbol) symbol = symbol[0];
    split = split.map(function (item) {
        var modified;
        if (item == 'yyyy') modified = date.getFullYear() + (symbol || '年');
        if (item == 'mm')   modified = fixedZero(date.getMonth()+1) + (symbol || '月');
        if (item == 'dd')   modified = fixedZero(date.getDate()) + (symbol || '日');
        return modified;
    });
    return symbol ? split.join('').slice(0, -1) : split.join('');
}

function fixedZero (n) {
    return n < 10 ? '0' + n : '' + n;
}

exports.formatDate = formatDate;

exports.fixedZero = fixedZero;

