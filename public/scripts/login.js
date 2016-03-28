var login = {
    form: function () {
        var form = $('.ui.form');

        //  validate
        form.form({
                onSuccess: function () {
                    submit();
                },
                fields: {
                    name: {
                        identifier: 'name',
                        rules: [
                            {
                                type   : 'empty',
                                prompt : '请输入账号'
                            }
                        ]
                    },
                    pass: {
                        identifier: 'pass',
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
            }
        );

        //  stop the form from submitting normally
        $('.ui.form').submit(function(){ return false; });

        function submit() {
            $('.btn-submit').prop('disabled', true);

            $.ajax({
                url: 'http://' + $('input[name="gv_path"]').val() + '/user/login',
                method: 'POST',
                data: {
                    name: $('input[name="name"]').val(),
                    pass: $('input[name="pass"]').val(),
                    remember: $('.remember').hasClass('checked')
                },
                success: function (data, textStatus, jqXHR) {
                    if (jqXHR.status == 200) {
                        window.location = data.redirect;
                    }
                },
                error: function (data, textStatus, jqXHR) {
                    console.log('err');
                    console.log('data:', data);
                    console.log('textStatus:', textStatus);
                    console.log('jqXHR:', jqXHR);
                    $('.ui.form').form('add errors', ['账号或密码不正确']);
                    $('.btn-submit').prop('disabled', false);
                }
            });
        }
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