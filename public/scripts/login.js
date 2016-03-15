var login = {
    form: function () {
        var form = $('.ui.form');

        //  validate
        form.form({
                fields: {
                    name: {
                        rules: [
                            {
                                type   : 'empty',
                                prompt : '请输入账号'
                            }
                        ]
                    },
                    pass: {
                        rules: [
                            {
                                type   : 'empty',
                                prompt : '请输入密码'
                            },
                            {
                                type   : 'minLength[6]',
                                prompt : '您输入的密码长度太短'
                            }
                        ]
                    }
                }
            })
        ;

        //  submit form
        $('.btn-submit').on('click', function () {
            form.form('is valid') && submit();

            function submit() {
                $.ajax({
                    url: 'http://localhost:4000/user/login',
                    method: 'post',
                    data: {
                        name: $('input[name="name"]'),
                        pass: $('input[name="pass"]')
                    }
                });
            }
        });
    },

    init: function () {
        var that = this;

        //  init ui
        $('.ui.checkbox').checkbox();

        //  form
        that.form();
    }
};

login.init();