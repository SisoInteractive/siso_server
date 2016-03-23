var user = {
    nickname: function () {

    },

    init: function () {
        var that = this;

        $('.rename-nickname').click(function () {
            var newName = prompt('请输入新的昵称');
            if (!newName) return false;
            $.ajax({
                url: 'http://localhost:4000/user',
                method: 'PUT',
                data: {
                    nickname: newName
                },
                success: function () {
                    app.message.show('更改昵称成功', 'positive', 2500);
                    setTimeout(function () {
                        location.reload();
                    },2500);
                },
                error: function () {
                    app.message.show('更名昵称失败, 服务器开小差了', 'negative', 2500);
                }
            });
        });
    }
};

$(function () {
    user.init();
});