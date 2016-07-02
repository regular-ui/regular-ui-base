let filter = {};

filter.dateFormat = (() => {
    function fix(str = '') {
        str = str + '';
        return str.length <= 1 ? '0' + str : str;
    }

    const MAPS = {
        yyyy: (date) => date.getFullYear(),
        MM: (date) => fix(date.getMonth() + 1),
        dd: (date) => fix(date.getDate()),
        HH: (date) => fix(date.getHours()),
        mm: (date) => fix(date.getMinutes()),
        ss: (date) => fix(date.getSeconds()),
    }
    let trunk = new RegExp(Object.keys(MAPS).join('|'), 'g');

    return function(value, format = 'yyyy-MM-dd HH:mm') {
        if(!value)
            return '';
        value = new Date(value);

        return format.replace(trunk, (capture) => {
            return MAPS[capture] ? MAPS[capture](value) : '';
        });
    }
})();

filter.format = function(value, type, ...args) {
    return filter[type + 'Format'](value, ...args);
}

export default filter;
