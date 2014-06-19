$().ready(function() {
    // validate User form on keyup and submit
    $("#createUser").validate({
        rules: {
            usr_name: {
                required: true,
                minlength: 2
            },
            usr_password: {
                required: true,
                minlength: 5
            },
            usr_email: {
                required: true,
                email: true
            },
        },
        messages: {
            usr_name: {
                required: "  Please enter a username",
                minlength: "Your username must consist of at least 2 characters"
            },
            usr_password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long"
            },
            usr_email: "Please enter a valid email address",
        }

    });
    // validate signup form on keyup and submit
    $("#createClient").validate({
        rules: {
            name: "required",
            website: "required",
            phone: "required",
            email: {
                required: true,
                email: true
            },
        },
        messages: {
            name: "Please enter your Name",
            website: "Please enter atleast one Website",
            phone: "Please enter your Phone number",
            email: "Please enter a valid email address",
        }

    });

});

// A $( document ).ready() block.
$(document).ready(function() {


    var yourRegex = /^www?\.[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;// url
    $('#website').tagsInput({
        //    width: 'auto',
        pattern: yourRegex // default: false
    });

// deleting client by id
    $('.actiondelete').on('click', function(e) {
//        console.log(this);
        var rowId = $(this).attr('data-id');

        $('#modal-table').modal('show');
        $('.delete_user_btn').on('click', function(e) {
            $.ajax({
                url: '/clients/delete/' + rowId,
                dataType: 'json',
                success: function(data)
                {
                    window.location.assign("http://local.zendapp/clients/setmessage")
                   

                }
            });
        });

    });


    $('.actiondeleteuser').on('click', function(e) {

        var rowId = $(this).attr('data-id');
//        console.log(rowId);
        $('#modal-table').modal('show');
        $('.delete_user_btn').on('click', function(e) {
            $.ajax({
                url: '/auth/admin/delete/' + rowId,
                dataType: 'json',
                success: function(data)
                {
                    window.location.assign("http://local.zendapp/auth/admin/setmessage");

                }
            });
        });

    });

    $('.multiple-delete').on('click', function(e) {
//        alert('helloo');
//alert($(':checkbox:checked').size());
    if($(':checkbox:checked').size() > 0){
        $('#modal-table').modal('show');

        $('.delete_user_btn').on('click', function(e) {
            $(':checkbox:checked').each(function(i) {

                var rowId = $(this).attr('data-id');
                if (rowId != 'all') {
//                       alert(rowId);
                    $.ajax({
                        url: '/auth/admin/delete/' + rowId,
                        dataType: 'json',
                        success: function(data)
                        {


                        }
                    });
                }
            });
        });
        window.location.assign("http://local.zendapp/auth/admin/setmessage");
    }else{
        alert("Please select the User");
    }
    });

    var value = $("#form-field-select-1").val();
    $('.alert').delay(5000).fadeOut(400);
    makeTable(value);


    $("#form-field-select-1").change(function() {
        makeTable(this.value);
    });

    $('.actiondeletelink').on('click', function(e) {
//        console.log(this);

        var rowId = $(this).attr('data-id');
        alert(rowId);
        $('#modal-table').modal('show');


    });

    $("#datepicker").datepicker({
        showOtherMonths: true,
        selectOtherMonths: false,
        //isRTL:true,


        /*
         changeMonth: true,
         changeYear: true,
         
         showButtonPanel: true,
         beforeShow: function() {
         //change button colors
         var datepicker = $(this).datepicker( "widget" );
         setTimeout(function(){
         var buttons = datepicker.find('.ui-datepicker-buttonpane')
         .find('button');
         buttons.eq(0).addClass('btn btn-xs');
         buttons.eq(1).addClass('btn btn-xs btn-success');
         buttons.wrapInner('<span class="bigger-110" />');
         }, 0);
         }
         */
    });

$('.input-mask-phone').mask('(999) 999-9999');
});

function makeTable(id) {
    var rowId = id;
//    $('.alert').show();
    $("#addbuttonlink").attr("href", "/link/add/" + rowId);
    $.ajax({
        type: 'GET',
        url: '/link/getLinkById/' + rowId,
        dataType: 'json',
        success: function(response)
        {
//                    console.log(response.data);

            $('.linktable > tr').remove();
            for (cnt in response.data) {
                console.log(response.data[cnt]);
                var mydiv = '<tr><td class="center"><input type="checkbox" class="ace" /><span class="lbl"></span></label></td><td>' + response.data[cnt].date + '</td>\n\
                    <td>' + response.data[cnt].url + '</td><td class="hidden-480 hidden">3,330</td><td class="hidden">Feb 12</td> <td class="hidden-480 hidden">\n\
                   <span class="label label-sm label-warning">Expiring</span></td><td><div class="visible-md visible-lg hidden-sm hidden-xs action-buttons">\n\
                   <a class="blue" href="#"><i class="icon-zoom-in bigger-130"></i></a><a class="green" href="/link/edit/' + response.data[cnt].id + '"><i class="icon-pencil bigger-130"></i></a>\n\
                    <a href="" class="red" onclick="deletelink(' + response.data[cnt].id + ');" ><i class="icon-trash bigger-130"></i></a></div>\n\
                    <div class="visible-xs visible-sm hidden-md hidden-lg"><div class="inline position-relative"><button class="btn btn-minier btn-yellow dropdown-toggle" data-toggle="dropdown">n\
                   <i class="icon-caret-down icon-only bigger-120"></i></button> <ul class="dropdown-menu dropdown-only-icon dropdown-yellow pull-right dropdown-caret dropdown-close">\n\
                   <li><a href="#" class="tooltip-info" data-rel="tooltip" title="View"><span class="blue"> <i class="icon-zoom-in bigger-120"></i></span></a></li>\n\
                   <li><a href="#" class="tooltip-success" data-rel="tooltip" title="Edit"><span class="green"><i class="icon-edit bigger-120"></i>\n\
                   <li> <a href="#" class="tooltip-error" data-rel="tooltip" title="Delete"><span class="red"><i class="icon-trash bigger-120"></i></span></a></li>\n\
                    </ul></div></div></td></tr>';
                $(".linktable").append(mydiv);
            }


//            $(".actiondeletelink").attr("href", "");


        }
    });
}

function deletelink(id) {
    var rowId = id;
    $('#modal-table').modal('show');
    var url = window.location.pathname;
    var main_id = url.substring(url.lastIndexOf('/') + 1)
//alert(main_id);
    $('.delete_link_btn').on('click', function(e) {
        $.ajax({
            url: '/link/delete/' + rowId,
            dataType: 'json',
            success: function(data)
            {
//                    window.location.assign("http://local.zendapp/link/index/" + main_id)

            }
        });
    });

}

jQuery(function($) {
    var oTable1 = $('#sample-table-2').dataTable({
        "aoColumns": [
            {"bSortable": false},
            null, null, null, null, null,
            {"bSortable": false}
        ]});


    $('table th input:checkbox').on('click', function() {
        var that = this;
        $(this).closest('table').find('tr > td:first-child input:checkbox')
                .each(function() {
                    this.checked = that.checked;
                    $(this).closest('tr').toggleClass('selected');
                });

    });

    $('[data-rel="tooltip"]').tooltip({placement: tooltip_placement});
    function tooltip_placement(context, source) {
        var $source = $(source);
        var $parent = $source.closest('table')
        var off1 = $parent.offset();
        var w1 = $parent.width();

        var off2 = $source.offset();
        var w2 = $source.width();

        if (parseInt(off2.left) < parseInt(off1.left) + parseInt(w1 / 2))
            return 'right';
        return 'left';
    }
});