function pagination (page) {
    if (page.count >= 2) {
        if (page.number > 0) {
            console.log('Prev');
        }

        if (page.count < page.pergroup) {
            createNumbers(1, page.count);
        }

        if (page.count > page.pergroup) {
            var start;
            var end;

            if (page.number+1 < page.pergroup/2) {
                start = 1;
                end = page.pergroup;
            } else {
                start = (page.number+1) - page.pergroup/2 + 1;
                end = (page.number+1) + page.pergroup/2;
                end = end <= page.count ? end : page.count;
            }

            createNumbers(start, end);
        }

        if (page.number < page.count) {
            console.log('Next');
        }
    }

    function createNumbers (start, end) {
        for (var i = start; i <= end; i++) {
            if (i == page.number+1) {
                console.log('<a class="active" href="/admin?column=case&page=' + i + '">' + i + '</a>');
            } else {
                console.log('<a href="/admin?column=case&page=' + i + '">' + i + '</a>');
            }
        }
    }
}

pagination({count: 5, number: 2, pergroup: 10});
console.log('Expect: 1..5', 3);
console.log('\n');
pagination({count: 15, number: 3, pergroup: 10});
console.log('Expect: 1..10', 4);
console.log('\n');
pagination({count: 15, number: 5, pergroup: 10});
console.log('Expect: 2..11', 6);
console.log('\n');
pagination({count: 15, number: 14, pergroup: 10});
console.log('Expect: 11..15', 15);
pagination({count: 25, number: 14, pergroup: 10});
console.log('Expect: 11..20', 15);