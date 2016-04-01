exports.home = function (app) {
    return function (req, res) {
        var context = {
            state: {
                state: 'home'
            },
            globalVariables: {
                path: app.get('path')
            },
            menu: [
                //  red orange yellow olive green teal blue violet purple pink brown grey black
                {
                    title: '文章管理',
                    url: '/admin',
                    icon: 'newspaper'
                },
                {
                    title: '创建文章',
                    url: '/entry',
                    icon: 'add circle'
                },
                {
                    title: '成员管理',
                    url: '/photo',
                    icon: 'photo'
                },
                {
                    title: '个人中心',
                    url: '/user',
                    icon: 'user'
                }
            ],
            title: 'HOME'
        };
        res.status(200);
        res.render('page', context);
    }
};