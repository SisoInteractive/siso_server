var entry = {
    form: function (column, isEditing) {
        //  init rich editor
        $('#summernote').summernote({
            height: 400
        });

        //  set http method
        if (isEditing) {
            var form = $('.entry form');
            form.attr('action',form.attr('action') + '/' + $('input[name="entry_id"]').val() + '?_method=PUT&column=' + column);
        }

        //  set entry type
        $('input[name="entry_date"]').val(new Date().toString());

        $('.entry-submit').click(function () {
            var result = valid();
            return result;
        });

        function valid() {
            var msg = [];

            var title = $('input[name="entry_title"]');
            if (title.val().length < 2) msg.push('标题不能少于2个字');

            var content = $('textarea[name="entry_body"]');
            if (content.val().length < 10) msg.push('正文不能少于10个字');

            //  case
            if (column == 'case' && isEditing == false) {
                var homeImg = $('input[name="entry_home"]');
                if (!homeImg.val()) msg.push('HOME首页图必须上传');

                var homeMobileImg = $('input[name="entry_home_mobile"]');
                if (!homeImg.val()) msg.push('HOME首页 Mobile图必须上传');

                var caseImg = $('input[name="entry_case"]');
                if (!caseImg.val()) msg.push('Case studies图图必须上传');

                var caseMobileImg = $('input[name="entry_case_mobile"]');
                if (!caseImg.val()) msg.push('Case studies Mobile图必须上传');
            }

            //  invalid when msg has items
            if (msg.length) {
                msg.forEach(function (i) {
                    console.log(i);
                });
                //  cancel submit
                return false;
            }

            //  valid and submit
            $('input[name="entry_body"]').val($('#summernote').summernote('code'));
            return true;
        }
    },

    init: function () {
        var that = this;
        var column = $('input[name="entry_type"]').val();
        var status = $('input[name="entry_status"]').val();
        that.form(column, status);
    }
};

$(function () {
    entry.init();
});