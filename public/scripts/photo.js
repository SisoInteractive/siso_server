var photo = {
    currentEditId: null,

    status: null,

    edit: function (member) {
        var that = this;

        resetPreviewPhoto();

        if (photo.status == 'create') {
            $('.edit-member .header').text('新增员工');
            $('.photo-viewer img').attr('src', '');
        }

        if (photo.status == 'edit') {
            var parent = member.parents('.member');
            that.currentEditId = parent.attr('data-id');
            console.log(that.currentEditId);
            $('.edit-member .header').text('编辑员工');
            $('input[name="name"]').val(parent.find('.header').text());
            $('input[name="position"]').val(parent.find('.position').text());
            $('input[name="positionEnglish"]').val(parent.find('.englishPosition').text());
            $('.photo-viewer img').attr('src', parent.find('.image img').attr('src'));
            $('.upload-photo .title').text('更新照片');
        }

        //  show modal
        $('.edit-member').modal('show');
    },

    dragSort: {
        init: function () {
            dragula([$('.photo-list')[0]], {
                accepts: function (el, target, source, sibling) {
                    return el.className.indexOf('member') >= 0;
                },
                mirrorContainer: $('.drag-container')[0]
            })
                .on('dragend', submitSort);
        }
    },

    init: function () {
        var that = this;

        //  create member
        $('.add-member').click(function () {
            that.status = 'create';
            that.edit();
        });

        //  edit member
        $('.photo-list').on('click', '.operator-edit', function () {
            var member = $(this);
            that.status = 'edit';
            that.edit(member);
        });

        //  edit member
        $('.photo-list').on('click', '.operator-delete', deleteMember);

        //  load photo
        $('.edit-member .upload-photo input').on('change', previewPhoto);

        //  init edit-member modal
        $('.edit-member').modal({
            onApprove: function () {
                $('.member-form').form('validate form');
                return false;
            }
        });

        //  init upload validation
        $('.member-form')
            .form({
                onSuccess: submitMember,
                fields: {
                    name: {
                        rules: [
                            {
                                type: 'empty',
                                prompt: '请填写姓名'
                            }
                        ]
                    },
                    position: {
                        rules: [
                            {
                                type: 'empty',
                                prompt: '请填写职位'
                            }
                        ]
                    },
                    positionEnglish: {
                        rules: [
                            {
                                type: 'empty',
                                prompt: '请填写英文职位'
                            }
                        ]
                    }
                }
            });

        //  init drag sort
        that.dragSort.init();
    }
};

//  init
$(function () {
    photo.init();
});

function deleteMember () {
    var member = $(this).parents('.member');
    if (confirm('您确定要删除此成员吗')) {
        $.ajax({
            url: $(this).attr('data-href'),
            method: 'POST',
            success: function () {
                app.message.show('删除成功', 'positive', 2500);
                member.remove();
                $(this).parents('.member').remove();
            },
            error: function (e) {
                app.message.show('删除失败, 服务器开了个小差', 'negative', 2500);
                console.log(e);
            }
        });
    }
}

function submitMember() {
    if (photo.status == 'create' && !$('input[name="photo"]').val()) {
        $('.member-form').form('add errors', ['请上传照片']);
        return false;
    }

    var formData = new FormData();

    if (photo.status == 'create' || $('input[name="photo"]').val()) {
        formData.append('photoSrc', $('input[name="photo"]')[0].files[0]);
    }

    formData.append('name', $('input[name="name"]').val());
    formData.append('position', $('input[name="position"]').val());
    formData.append('positionEnglish', $('input[name="positionEnglish"]').val());

    $.ajax({
        url: ('http://' + $('input[name="gv_path"]').val() + '/photo')
        + (photo.status == 'create' ? '' : '/' + photo.currentEditId + '?_method=PUT'),
        method: 'POST',
        cache: false,
        data: formData,
        processData: false,
        contentType: false,
        success: function (d) {
            $('.edit-member').modal('hide');
            app.message.show(photo.status == 'create' ? '创建成功' : '更新成功', 'positive', 2500);
            if (photo.status == 'create') { createItemDom(JSON.parse(d.data)); }
            if (photo.status == 'edit') { updateItem(JSON.parse(d.data)); }
        },
        error: function (e) {
            $('.edit-member').modal('hide');
            app.message.show(photo.status == 'create' ? '创建失败' : '更新失败' + ',服务器开了个小差', 'negative', 2500);
            console.log(e);
        }
    });
}

function submitSort () {
    var arr = {
        members: []
    };

    $('.photo-list .member').each(function (index, member) {
        arr.members.push({
            order: index,
            _id: $(member).attr('data-id')
        });
    });

    $.ajax({
        url: 'http://' + $('input[name="gv_path"]').val() + '/photo/sort',
        method: 'POST',
        data: arr,
        success: function (d) {
            app.message.show('顺序更新成功', 'positive', 2500);
        },
        error: function (e) {
            app.message.show('顺序更新失败' + ' ,服务器开了个小差', 'positive', 2500);
        }
    });
}

function previewPhoto () {
    var that = this;
    var filename = $(this).val();
    if (filename) {
        var result = checkFileExtension(filename, $(this));
        if (result) {
            readURLtoPreviewImg(that);
            $('.upload-photo .title').text('重新上传');
            $('.photo-process-tips').show();
        }
    }

    //  remove error message
    $('.member-form .message.error').empty();
}

function resetPreviewPhoto () {
    //  reset preview photo
    $('.upload-photo .title').text('上传照片');
    $('.photo-process-tips').hide();
    $('input[name="name"]').val('');
    $('input[name="position"]').val('');
    $('input[name="positionEnglish"]').val('');
    $('input[name="photo"]').val('');
}

//  some functions
function checkFileExtension (filename, field) {
    var arr = filename.split('.');
    var result = /jpeg|jpg|png/.test(arr[arr.length-1]);
    if (result == false) {
        alert('您必须上传正确的图片格式');
        field.val('');
        return false;
    }
    return true;
}

function readURLtoPreviewImg(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.photo-viewer img').attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function createItemDom (data) {
    var dom =
        '<div class="card member" data-id="' + data._id + '">' +
        '<div class="image">' +
        '<img src="' + data.photoSrc + '">' +
        '</div>' +
        '<div class="content">' +
        '<div class="header">' + data.name + '</div>' +
        '<div class="meta">' +
        '<a><span class="position">' + data.position + '</span> / <span class="englishPosition">' + data.positionEnglish + '</span></a>' +
        '</div>' +
        '</div>' +
        '<div class="extra content">' +
        '<span class="right floated operator-delete" data-href="http://localhost:4000/photo/' + data._id + '?_method=DELETE"><i class="trash icon"></i>删除</span>' +
        '<span class="operator-edit"><i class="write square icon"></i>编辑</span>' +
        '</div>' +
        '</div>';

    $('.photo-list').append(dom);
}

function updateItem (item) {
    var itemDom = $('.card[data-id=' + item._id + ']');
    itemDom.find('.image img').attr('src', item.photoSrc);
    itemDom.find('.header').text(item.name);
    itemDom.find('.position').text(item.position);
    itemDom.find('.englishPosition').text(item.positionEnglish);
}

