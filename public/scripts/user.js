var user = {
    nickname: function () {
        var that = this;

        $('.rename-nickname').click(function () {
            $('.modal-nickname')
                .modal({
                    onApprove: changeNickName
                })
                .modal('show');

            function changeNickName() {
                $.ajax({
                    url: 'http://' + $('input[name="gv_path"]').val() + '/user',
                    method: 'PUT',
                    data: {
                        nickname: $('.new-nickname').val()
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
                })
            }
        });
    },

    password: function () {
        $('.change-password').click(function () {
            $('.modal-password')
                .modal({
                    onApprove: validPassword
                })
                .modal('show');

            function validPassword () {
                $('.passwordValid').form({
                    onSuccess: submit,
                    fields: {
                        pass : {
                            rules: [
                                {
                                    type: 'minLength[6]',
                                    prompt: '密码长度必须大于6个字符'
                                }
                            ]
                        },
                        repass : {
                            rules: [
                                {
                                    type: 'isExactly[' + $('.new-password').val() + ']',
                                    prompt: '密码必须与第一次输入的密码相同'
                                }
                            ]
                        }
                    }
                })
                    .form('validate form');

                function submit () {
                    $.ajax({
                        url: 'http://' + $('input[name="gv_path"]').val() + '/user',
                        method: 'PUT',
                        data: {
                            password: $('.new-password').val()
                        },
                        success: function () {
                            $('.modal-password').modal('hide');
                            app.message.show('更改密码成功', 'positive', 2500);
                            setTimeout(function () {
                                location.reload();
                            },2500);
                        },
                        error: function () {
                            $('.modal-password').modal('hide');
                            app.message.show('更改密码失败, 服务器开小差了', 'negative', 2500);
                        }
                    })
                }

                return false;
            }
        });
    },

    init: function () {
        var that = this;
        that.nickname();
        that.password();
    }
};

$(function () {
    user.init();
});