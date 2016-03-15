var admin = {
    operate: {
        top: function () {

        },
        delete: function (e) {
            e.stopPropagation();
            var btn = $(this);
            var url = btn.attr('data-href');
            if (confirm('你确定要删除吗?')) {
                $.ajax({
                    url: location.origin + url,
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
            //  edit button
            $('.entry-list').on('click', '.entry-delete', this.delete);
        }
    },
    init: function () {
        admin.operate.init();
    }
};

$(function () {
    admin.init();
});