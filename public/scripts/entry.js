var entry = {
    caseStudies: function (isEditing) {
        //  set http method
        if (isEditing) {
            var form = $('.entry form');
            form.attr('action',form.attr('action') + '/' + $('input[name="entry_id"]').val() + '?_method=PUT&column=case');
        }

        //  set entry type
        $('input[name="entry_type"]').val('case');
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

            if (isEditing == false) {
                var homeImg = $('input[name="entry_home"]');
                if (!homeImg.val()) msg.push('HOME首页图必须上传');

                var caseImg = $('input[name="entry_case"]');
                if (!caseImg.val()) msg.push('Case studies图图必须上传');
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
            return true;
        }
    },

    career: function (isEditing) {
        //  set http method
        if (isEditing) {
            var form = $('.entry form');
            form.attr('action',form.attr('action') + '/' + $('input[name="entry_id"]').val() + '?_method=PUT&column=career');
        }

        //  set entry type
        $('input[name="entry_type"]').val('career');
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

            //  invalid when msg has items
            if (msg.length) {
                msg.forEach(function (i) {
                    console.log(i);
                });
                //  cancel submit
                return false;
            }
            //  valid and submit
            return true;
        }
    },

    news: function (isEditing) {
        //  set http method
        if (isEditing) {
            var form = $('.entry form');
            form.attr('action',form.attr('action') + '/' + $('input[name="entry_id"]').val() + '?_method=PUT&column=news');
        }

        //  set entry type
        $('input[name="entry_type"]').val('news');
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

            //  invalid when msg has items
            if (msg.length) {
                msg.forEach(function (i) {
                    console.log(i);
                });
                //  cancel submit
                return false;
            }
            //  valid and submit
            return true;
        }
    },

    init: function () {
        var column = location.search.match(/column=(\w+)/);
        column = column ? column[1] : '';
        var status = location.search.match(/status=(\w+)/);
        status = status ? status[1] : '';


        switch (column) {
            case 'case':
                this.caseStudies(status=='edit');
                break;
            case 'career':
                this.career(status=='edit');
                break;
            case 'news':
                this.news(status=='edit');
                break;
        }
    }
};

$(function () {
    entry.init();
});