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
                    color: 'red',
                    icon: 'newspaper'
                },
                {
                    title: '创建文章',
                    url: '/entry',
                    color: 'orange',
                    icon: 'add circle'
                },
                {
                    title: '照片管理',
                    url: '/photo',
                    color: 'olive',
                    icon: 'photo'
                },
                {
                    title: '个人中心',
                    url: '/user',
                    color: 'blue',
                    icon: 'user'
                }
            ],
            title: 'HOME'
        };
        res.status(200);
        res.render('page', context);
    }
};