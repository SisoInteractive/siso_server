var entry = {
    form: function (column, isEditing) {
        //  init rich editor
        $('#summernote').summernote({
            height: 400
        });

        //  form
        var form = $('.ui.form');

        //  set http method
        if (isEditing) {
            var form = $('.entry form');
            form.attr('action',form.attr('action') + '/' + $('input[name="entry_id"]').val() + '?_method=PUT&column=' + column);
        }

        //  set entry date
        $('input[name="entry_date"]').val(new Date().toString());

        //  validate
        var validateConfig = {
            onSuccess: function () {
                submit();
            },
            fields: {
                entry_title: {
                    rules: [
                        {
                            type   : 'minLength[2]',
                            prompt : '主题不能少于2个字'
                        }
                    ]
                },
                entry_body: {
                    rules: [
                        {
                            type   : 'minLength[6]',
                            prompt : '正文不能少于10个字'
                        }
                    ]
                }
            }
        };

        if (column == 'case' && isEditing == false) {
            validateConfig.fields['entry_home'] = {
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'HOME首页图必须上传'
                    }
                ]
            };
            validateConfig.fields['entry_home_mobile'] = {
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'HOME首页 Mobile图必须上传'
                    }
                ]
            };
            validateConfig.fields['entry_case'] = {
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'Case studies图图必须上传'
                    }
                ]
            };
            validateConfig.fields['entry_case_mobile'] = {
                rules: [
                    {
                        type   : 'empty',
                        prompt : 'Case studies Mobile图必须上传'
                    }
                ]
            };
        }

        form.form(validateConfig);

        //  stop the form from submitting normally
        $('.ui.form').submit(function(){ return false; });

        function submit() {
            $('.entry-submit').prop('disabled', true);
            $('.entry-submit').text('创建中..');
            $('input[name="entry_body"]').val($('#summernote').summernote('code'));
            //  submit
            $('.ui.form').form('submit');
        }
    },

    message: function () {
        var query = location.search;
        if (query) {
            var state = query.slice(1).match(/state=(\d+)/);
            var msg = '';
            var type = '';

            if (state && state[1] == '201') { msg = '<p>创建成功</p>'; type = 'positive'; }
            if (state && state[1] == '400') { msg = '<p>创建失败</p>'; type = 'negative'; }
            //  show message
            if (msg) app.message.show(msg, type, 2500);
        }
    },

    init: function () {
        var that = this;
        var column = $('input[name="entry_type"]').val();
        var status = $('input[name="entry_status"]').val();
        that.form(column, status);
        that.message();
    }
};

$(function () {
    entry.init();
});