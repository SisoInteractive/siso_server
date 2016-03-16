exports.home = function (req, res) {
    var context = {
        state: {
            state: 'home'
        },
        menu: [
            //  red orange yellow olive green teal blue violet purple pink brown grey black
            {
                title: '文章管理',
                url: '/admin?column=career',
                color: 'red',
                icon: 'newspaper'
            },
            {
                title: '创建文章',
                url: '/entry?column=case',
                color: 'orange',
                icon: 'add circle'
            },
            {
                title: '个人中心',
                url: '/user',
                color: 'yellow',
                icon: 'user'
            }
        ],
        title: 'HOME'
    };
    res.status(200);
    res.render('page', context);
};