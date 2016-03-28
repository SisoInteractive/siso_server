var admin = {
    operate: {
        pushHome: function () {
            var btn = $(this);
            var url = btn.attr('data-href');
            btn.prop('disabled', true);
            $.ajax({
                url: 'http://' + $('input[name="gv_path"]').val() + url,
                method: 'POST',
                data: {
                    entry_pushHome: true
                },
                success: function (result,status,xhr) {
                    location.reload();
                },
                error: function (xhr,status,err) {
                    if (xhr.status == 501) {
                        app.message.show(xhr.responseText.message, 'negative', 2500);
                    }
                    else if (xhr.status == 404) {
                        console.error(JSON.parse(xhr.responseText).message);
                    }
                }
            });
        },

        delete: function (e) {
            e.stopPropagation();
            var btn = $(this);
            var url = btn.attr('data-href');
            if (confirm('你确定要删除吗?')) {
                $.ajax({
                    url: 'http://' + $('input[name="gv_path"]').val() + url,
                    method: 'DELETE',
                    success: function (result,status,xhr) {
                        console.log('Delete entry success');
                        btn.parents('tr').remove();
                    },
                    error: function (xhr,status,err) {
                        if (xhr.status == 400) {
                            console.error(JSON.parse(xhr.responseText).message);
                        }
                        else if (xhr.status == 404) {
                            console.error(JSON.parse(xhr.responseText).message);
                        }
                    }
                });
            }

            return false;
        },
        init: function () {
            //  edit
            $('.entry-list').on('click', '.entry-delete', this.delete);
            //  push home
            $('.entry-list').on('click', '.push-home', this.pushHome);
        }
    },
    init: function () {
        admin.operate.init();
    }
};

$(function () {
    admin.init();
});