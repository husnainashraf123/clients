$(document).ready(function() {


    var cb = function(start, end, label) {
        console.log(start.toISOString(), end.toISOString(), label);
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        $('#reportrange input[name=date-range-picker]').val(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));

        var daterange = $('.get-date-range').val();
        
        var url = $("#addbuttonlink").attr("href")
//        alert(url);
        var website_id = url.substring(url.lastIndexOf('/') + 1);
        var parts = $("#form-field-select-1").attr('data-id');
        if (parts == 'link') {
            window.location.assign("http://dashboard.speakeasymarketinginc.com/link/daterange?daterange=" + daterange + "&websiteid=" + website_id);
        } else if(parts == 'lead'){
            window.location.assign("http://dashboard.speakeasymarketinginc.com/lead/daterange?daterange=" + daterange + "&websiteid=" + website_id);
        } else {
            window.location.assign("http://dashboard.speakeasymarketinginc.com/transcript/daterange?daterange=" + daterange + "&websiteid=" + website_id);
        }

//         $('#reportrange span').html(daterange);
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

    $('#reportrange span').html('Select Date Range');

//    $('#reportrange input[name=date-range-picker]').val(moment().subtract('days', 29).format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));

    $('#reportrange').daterangepicker(optionSet2, cb);
//    $('#reportrange').data('daterangepicker').setOptions(optionSet2, cb);
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
    // validate Client form on keyup and submit
    $("#createTranscript").validate({
        rules: {
            name: "required",
            date_posted: "required",
            date_revised: "required",
            date_received: "required",
            fileupload: {
                required: true,
                extension: 'docx|doc'
            },
        },
        messages: {
            name: "Please enter your Name",
            date_posted: "Please enter Posted Date",
            date_revised: "Please enter Revised Date",
            date_received: "Please enter Recevied Date",
            fileupload: {
                required: "Please selet some file",
                extension: 'Please enter a value with a valid mimetype.'
            },
        }

    });
    // validate Transcript form on keyup and submit
    $("#updateTranscript").validate({
        rules: {
            name: "required",
            date_posted: "required",
            date_revised: "required",
            date_received: "required",
            fileupload: {
//               required: true,
                extension: 'docx|doc'
            },
        },
        messages: {
            name: "Please enter your Name",
            date_posted: "Please enter Posted Date",
            date_revised: "Please enter Revised Date",
            date_received: "Please enter Recevied Date",
            fileupload: {
//                required: "Please selet some file",
                extension: 'Please enter a value with a valid mimetype.'
            },
        }

    });
    // validate Client form on keyup and submit
    $("#createLead").validate({
        rules: {
            lead_name: "required",
            caller_type: "required",
            lead_date: "required",
            lead_source: "required",
            inc_phone: "required",
            lead_email: {
                required: true,
                email: true,
            },
            call_duration: {
                integer: true
            },
        },
        messages: {
            lead_name: "Please enter your Name",
            caller_type: "Please enter Select Type",
            lead_date: "Please enter Select Date",
            lead_source: "Please Select Lead Source",
            inc_phone: "Please enter Phone Number",
            lead_email: {
                required: "Please enter your Email",
                email: "Please enter valid Email",
            },
            call_duration: {
                integer: "Please enter an integer value",
            },
        }

    });
    // validate Book form on keyup and submit
    $("#createBook").validate({
        rules: {
            name: "required",
        },
        messages: {
           name: "Please enter Book name",
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
                    window.location.assign("http://dashboard.speakeasymarketinginc.com/clients/setmessage")


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
                    window.location.assign("http://dashboard.speakeasymarketinginc.com/auth/admin/setmessage");

                }
            });
        });

    });

    $('.multiple-delete').on('click', function(e) {
         var part = $(this).attr('data-id');
        if (part == "link" || part == "transcript" || part == "book" || part == "lead") {
            var current_website = $("#form-field-select-1").val();
        }
       
        if ($(':checkbox:checked').size() > 0) {
            $('#modal-table').modal('show');
            var value = 0;
            $('.delete_user_btn').on('click', function(e) {

                $(':checkbox:checked').each(function(i) {
                    var rowId = $(this).attr('data-id');
//                    alert(rowId);
                    value = value + 1;
                    if (rowId != 'all') {

                        if (part == "client") {
                            var url = '/clients/delete/' + rowId;
                        } else if (part == "link") {
                            var url = '/link/delete/' + rowId;
                        } else if (part == "book") {
                            var url = '/book/delete/' + rowId;
                        } else if (part == "lead") {
                            var url = '/lead/delete/' + rowId;
                        } else if (part == "transcript") {
                            var url = '/transcript/delete/' + rowId;
                        } else {
                            var url = '/auth/admin/delete/' + rowId;
                        }
                        $.ajax({
                            url: url,
                            dataType: 'json',
                            success: function(data)
                            {
                                
                                if (value == $(':checkbox:checked').size()) {                    
                                if (part == "client") {
                                    window.location.assign("http://dashboard.speakeasymarketinginc.com/clients/setmessage");
                                } else if (part == "link") {
                                    window.location.assign("http://dashboard.speakeasymarketinginc.com/link/setmessage/" + current_website);
                                } else if (part == "book") {
                                    window.location.assign("http://dashboard.speakeasymarketinginc.com/book/setmessage/" + current_website);
                                } else if (part == "lead") {
                                    window.location.assign("http://dashboard.speakeasymarketinginc.com/lead/setmessage/" + current_website);
                                } else if (part == "transcript") {
                                    window.location.assign("http://dashboard.speakeasymarketinginc.com/transcript/setmessage/" + current_website);
                                } else {
                                    window.location.assign("http://dashboard.speakeasymarketinginc.com/auth/admin/setmessage");
                                }
                            }

                            }
                        });
                    }
                });
                
            });



        } else {
            if (part == "client") {
                alert("Please select the Client");
            } else if (part == "link") {
                alert("Please select the Links");
            } else if (part == "book") {
                alert("Please select the Books");
            } else if (part == "lead") {
                alert("Please select the Leads");
            } else if (part == "transcript") {
                alert("Please select the Transcripts");
            } else {
                alert("Please select the User");
            }
        }
    });

    $('.alert').delay(5000).fadeOut(400);

    $("#form-field-select-1").change(function() {
        var rowId = this.value;
        var dataid = $('#form-field-select-1').attr('data-id');
        if (dataid == "link") {
            window.location.assign("http://dashboard.speakeasymarketinginc.com/link/changewebsite/" + rowId);
        } else if (dataid == "book") {
            window.location.assign("http://dashboard.speakeasymarketinginc.com/book/changewebsite/" + rowId);
        } else if (dataid == "lead") {
            window.location.assign("http://dashboard.speakeasymarketinginc.com/lead/changewebsite/" + rowId);
        } else {
            window.location.assign("http://dashboard.speakeasymarketinginc.com/transcript/changewebsite/" + rowId);
        }

    });

    $('.actiondeletelink').on('click', function(e) {

        var rowId = $(this).attr('data-id');
        alert(rowId);
        $('#modal-table').modal('show');
    });

    $("#datepicker").datepicker({
        showOtherMonths: true,
        selectOtherMonths: false,
    });
    $("#date_received").datepicker({
        showOtherMonths: true,
        selectOtherMonths: false,
    });
    $("#date_posted").datepicker({
        showOtherMonths: true,
        selectOtherMonths: false,
    });
    $("#date_revised").datepicker({
        showOtherMonths: true,
        selectOtherMonths: false,
    });

    $('.input-mask-phone').mask('(999) 999-9999');
});
function exportAll(data) {
    concole.log(data);
}
function downloadAll(current_website_id) {
//            alert(current_website_id);
    var download_ids = new Array();
    var num = 0;
    if ($(':checkbox:checked').size() > 0) {
        $(':checkbox:checked').each(function(i) {

            var rowId = $(this).attr('data-id');
            if (rowId != 'all') {
                num = 1;
                download_ids.push(rowId);
            } else {
                num = 0
                return false;
            }
        });
        input_value = download_ids.toString();

    }
    var url = '/transcript/downloadall/' + current_website_id;
    if (num == 0) {
        input_value = '';
    }
    $.ajax({
        type: 'POST',
        url: url,
        data: {'downloadids': input_value},
        success: function()
        {

        }
    });


}
function deleterow(id, part) {
    var rowId = id;

    $('#modal-table').modal('show');
    var current_website = $("#form-field-select-1").val();
    $('.delete_user_btn').on('click', function(e) {
        if (part == 'link') {
            var url = '/link/delete/' + rowId;
        } else if (part == "book") {
            var url = '/book/delete/' + rowId;
        } else if (part == 'lead') {
            var url = '/lead/delete/' + rowId;
        } else {
            var url = '/transcript/delete/' + rowId;
        }
        $.ajax({
            type: 'POST',
            url: url,
            dataType: 'json',
            data: {'current_website': current_website},
            success: function(data)
            {
                console.log(current_website);

                if (part == 'link') {
                    window.location.assign("http://dashboard.speakeasymarketinginc.com/link/setmessage/" + current_website);
                } else if (part == "book") {
                    window.location.assign("http://dashboard.speakeasymarketinginc.com/book/setmessage/" + current_website);
                } else if (part == "lead") {
                    window.location.assign("http://dashboard.speakeasymarketinginc.com/lead/setmessage/" + current_website);
                } else {
                    window.location.assign("http://dashboard.speakeasymarketinginc.com/transcript/setmessage/" + current_website);
                }

            }
        });
    });

}

jQuery(function($) {
    var oTable1 = $('#sample-table-2').dataTable({
        "aoColumns": [
            {"bSortable": false},
            null, null, null, null, null, null, null,
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