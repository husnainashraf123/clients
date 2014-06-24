$(document).ready(function() {
//    $( "#options2" ).trigger( "click" );

    var cb = function(start, end, label) {
        console.log(start.toISOString(), end.toISOString(), label);
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        $('#reportrange input[name=date-range-picker]').val(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
   
        var daterange=$('.get-date-range').val();
        window.location.assign("http://local.zendapp/link/daterange?daterange=" + daterange);
        
//        alert($('.get-date-range').val());
        //alert("Callback has fired: [" + start.format('MMMM D, YYYY') + " to " + end.format('MMMM D, YYYY') + ", label = " + label + "]");
    }

    var optionSet1 = {
        startDate: moment().subtract('days', 29),
        endDate: moment(),
        minDate: '01/01/2012',
        maxDate: '12/31/2014',
        dateLimit: {days: 60},
        showDropdowns: true,
        showWeekNumbers: true,
        timePicker: false,
        timePickerIncrement: 1,
        timePicker12Hour: true,
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
            'Last 7 Days': [moment().subtract('days', 6), moment()],
            'Last 30 Days': [moment().subtract('days', 29), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
        },
        opens: 'left',
        buttonClasses: ['btn btn-default'],
        applyClass: 'btn-small btn-primary',
        cancelClass: 'btn-small',
        format: 'MM/DD/YYYY',
        separator: ' to ',
        locale: {
            applyLabel: 'Submit',
            cancelLabel: 'Clear',
            fromLabel: 'From',
            toLabel: 'To',
            customRangeLabel: 'Custom',
            daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            firstDay: 1
        }
    };

    var optionSet2 = {
        startDate: moment().subtract('days', 7),
        endDate: moment(),
        opens: 'left',
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
            'Last 7 Days': [moment().subtract('days', 6), moment()],
            'Last 30 Days': [moment().subtract('days', 29), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
        }
    };

    $('#reportrange span').html('Select Date range');
//    $('#reportrange input[name=date-range-picker]').val(moment().subtract('days', 29).format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
   
    $('#reportrange').daterangepicker(optionSet1, cb);
    $('#reportrange').data('daterangepicker').setOptions(optionSet2, cb);
    $('#reportrange').on('show.daterangepicker', function() {
        console.log("show event fired");
    });
    $('#reportrange').on('hide.daterangepicker', function() {
        console.log("hide event fired");
    });
    $('#reportrange').on('apply.daterangepicker', function(ev, picker) {
        console.log("apply event fired, start/end dates are "
                + picker.startDate.format('MMMM D, YYYY')
                + " to "
                + picker.endDate.format('MMMM D, YYYY')
                );
    });
    $('#reportrange').on('cancel.daterangepicker', function(ev, picker) {
        console.log("cancel event fired");
    });

    $('#options1').click(function() {
        $('#reportrange').data('daterangepicker').setOptions(optionSet1, cb);
    });
    $('#options2').click(function() {
        $('#reportrange').data('daterangepicker').setOptions(optionSet2, cb);
    });

    $('#destroy').click(function() {
        $('#reportrange').data('daterangepicker').remove();
    });

});



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
    // validate Client form on keyup and submit
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
    // validate Link form on keyup and submit
    $("#createLink").validate({
        rules: {
            url: {
                required: true,
                url: true
            },
        },
        messages: {
            url: {
                required: "Please provide a URL",
                url: "Please enter valid URL"
            },
        }
    });

});

// A $( document ).ready() block.
$(document).ready(function() {

//    $('input[name=date-range-picker]').daterangepicker().prev().on(ace.click_event, function(){
//					$(this).next().focus();
//    });


//    $('#reportrange').daterangepicker(
//            {
//                ranges: {
//                    'Today': [moment(), moment()],
//                    'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
//                    'Last 7 Days': [moment().subtract('days', 6), moment()],
//                    'Last 30 Days': [moment().subtract('days', 29), moment()],
//                    'This Month': [moment().startOf('month'), moment().endOf('month')],
//                    'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
//                },
//                startDate: moment().subtract('days', 29),
//                endDate: moment()
//            },
//    function(start, end) {
//        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
//        $('#reportrange input[name=date-range-picker]').val(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
//
//        alert($('.get-date-range').val());
//            $('.get-date-range').change(function() {
//        alert($(this).val());
//    });
//
//    });



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
        var part = $(this).attr('data-id');
//        alert(part);
        if (part == "link") {
            var current_website = $("#form-field-select-1").val();
        }


        if ($(':checkbox:checked').size() > 0) {
            $('#modal-table').modal('show');

            $('.delete_user_btn').on('click', function(e) {
                $(':checkbox:checked').each(function(i) {

                    var rowId = $(this).attr('data-id');
//                                alert(rowId);
                    if (rowId != 'all') {

                        if (part == "client") {
                            var url = '/clients/delete/' + rowId;
                        } else if (part == "link") {
//                             alert(rowId);
                            var url = '/link/delete/' + rowId;
                        } else {
                            var url = '/auth/admin/delete/' + rowId;
                        }
//                         alert(url);
                        $.ajax({
                            url: url,
                            dataType: 'json',
                            success: function(data)
                            {


                            }
                        });
                    }
                });
            });
            if (part == "client") {
                window.location.assign("http://local.zendapp/clients/setmessage");
            } else if (part == "link") {
                window.location.assign("http://local.zendapp/link/setmessage/" + current_website);
            } else {
                window.location.assign("http://local.zendapp/auth/admin/setmessage");
            }
        } else {
            if (part == "client") {
                alert("Please select the Client");
            } else if (part == "link") {
                alert("Please select the Link");
            } else {
                alert("Please select the User");
            }
        }
    });

//    var value = $("#form-field-select-1").val();
    $('.alert').delay(5000).fadeOut(400);
//   $("#addbuttonlink").attr("href", "/link/add/" + value);
//   $(".current-websiteid").attr("data-id", rowId );

    $("#form-field-select-1").change(function() {
        var rowId = this.value;
        window.location.assign("http://local.zendapp/link/changewebsite/" + rowId);
//        $("#addbuttonlink").attr("href", "/link/add/" + rowId);
//        $(".current-websiteid").attr("data-id", rowId );
//        makeTable(this.value);
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

//function makeTable(id) {
//    var rowId = id;
////    alert(rowId);
////    $('.alert').show();
//    $("#addbuttonlink").attr("href", "/link/add/" + rowId);
//    $.ajax({
//        type: 'GET',
//        url: '/link/getLinkById/' + rowId,
//        dataType: 'json',
//        success: function(response)
//        {
////                    console.log(response.data);
//
//            $('.linktable > tr').remove();
//            for (cnt in response.data) {
////                console.log(response.data[cnt]);
//                var mydiv = '<tr><td class="center"><input type="checkbox" class="ace" data-id="' + response.data[cnt].id + '"/><span class="lbl"></span></label></td><td>' + response.data[cnt].date + '</td>\n\
//                    <td>' + response.data[cnt].url + '</td><td class="hidden-480 hidden">3,330</td><td class="hidden">Feb 12</td> <td class="hidden-480 hidden">\n\
//                   <span class="label label-sm label-warning">Expiring</span></td><td><div class="visible-md visible-lg hidden-sm hidden-xs action-buttons">\n\
//                   <a class="blue" href="#"><i class="icon-zoom-in bigger-130"></i></a><a class="green" href="/link/edit/' + response.data[cnt].id + '"><i class="icon-pencil bigger-130"></i></a>\n\
//                    <a href="#" class="red" onclick="deletelink(' + response.data[cnt].id + ');" ><i class="icon-trash bigger-130"></i></a></div>\n\
//                    <div class="visible-xs visible-sm hidden-md hidden-lg"><div class="inline position-relative"><button class="btn btn-minier btn-yellow dropdown-toggle" data-toggle="dropdown">n\
//                   <i class="icon-caret-down icon-only bigger-120"></i></button> <ul class="dropdown-menu dropdown-only-icon dropdown-yellow pull-right dropdown-caret dropdown-close">\n\
//                   <li><a href="#" class="tooltip-info" data-rel="tooltip" title="View"><span class="blue"> <i class="icon-zoom-in bigger-120"></i></span></a></li>\n\
//                   <li><a href="#" class="tooltip-success" data-rel="tooltip" title="Edit"><span class="green"><i class="icon-edit bigger-120"></i>\n\
//                   <li> <a href="#" class="tooltip-error" data-rel="tooltip" title="Delete"><span class="red"><i class="icon-trash bigger-120"></i></span></a></li>\n\
//                    </ul></div></div></td></tr>';
//                $(".linktable").append(mydiv);
//            }
//
//
//            $(".current-websiteid").attr("data-id", rowId );
//
//
//        }
//
//    });
//}

function deletelink(id) {
    var rowId = id;
    $('#modal-table').modal('show');
    var current_website = $("#form-field-select-1").val();
//    var url = window.location.pathname;
//    var main_id = url.substring(url.lastIndexOf('/') + 1)
//alert(current_website);
//alert(rowId);
    $('.delete_link_btn').on('click', function(e) {
        $.ajax({
            url: '/link/delete/' + rowId,
            dataType: 'json',
            success: function(data)
            {
                console.log(current_website);

                window.location.assign("http://local.zendapp/link/setmessage/" + current_website);

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