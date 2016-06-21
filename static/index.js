/**
 * Created by lenovo on 2016/6/20.
 * @author jackwang <wdmzjjm@163.com>
 * @blog http://www.notalent.cn
 */
$(document).ready(function(){

    var table = $('#table_id').DataTable({
        ajax: {
            "url": "test.php",
            "data": function (d) {
                //添加额外的参数传给服务器
                d.extra_search = $('#filterForm').serializeArray();
            }
        }

    });
    $('input[name="daterange"]').daterangepicker();
    $('select').select2();

    $('#table_id tbody').on( 'click', 'tr', function () {
        if(!table.row(this).nodes().to$().hasClass('selected')){
            table.row( this ).nodes().to$().addClass( 'selected' );
        }else{
            table.row( this ).nodes().to$().removeClass( 'selected' );
        }
    } );

    $('#cancel').click(function(){
       $('#information').css({"display": "none"});
    });


    $('#add').click(function(){
        $('#information').css({"display": "block"});
        $('#name').val("");
        $('#remark').val("");
        $('input[name="status"]').removeAttr('checked');
        $('input[name="status"]:eq(0)').prop("checked",true).trigger('change');
        $('#type').val("").trigger('change');
        $('#infoForm').submit(function(e){
            e.preventDefault();
            $.post("test.php", {data: $(this).serializeArray()}, function(data){
                //此处通过传值判断是否成功，成功则刷新列表
                if(data){
                    $('#information').css({"display": "none"});
                    table.ajax.reload();
                }
            });
        });
    });
    $('#edit').click(function(){
        var data = table.rows('.selected').data(),
            len = data.length;
        if(len == 1){
            $('#information').css({"display": "block"});
            $('#name').val(data[0][1]);
            $('#remark').val(data[0][2]);
            $('input[name="status"][value!="' + data[0][3] + '"]').removeAttr('checked');
            $('input[name="status"][value="' + data[0][3] + '"]').prop("checked",true).trigger('change');
            $('#type').val(data[0][6]).trigger('change');

            $('#infoForm').submit(function(e){
                e.preventDefault();
                $.post("test.php", {data: $(this).serializeArray()}, function(data){
                    //此处通过传值判断是否成功，成功则刷新列表
                    if(data){
                        $('#information').css({"display": "none"});
                        table.ajax.reload();
                    }

                });
            });
        }else{
            alert('请选择一条信息进行编辑！');
        }
    });
    $('#delete').click(function(){
        var data = table.rows('.selected').data(),
            len = data.length,
            code = [];
        for(var i = 0; i < len; i++){
            code.push(data[i][0]);
        }
        if(table.rows( '.selected').nodes().to$().length){
            if(confirm('确认删除吗？')){
                $.post("test.php",{code: code},function(data){
                    //此处通过传值判断是否成功，成功则刷新列表
                    if(data){
                        table.ajax.reload();
                    }
                });
            }
        }else{
            alert('没有选择要删除的数据');
        }
    });

    $('#filterForm').submit(function(e){
        e.preventDefault();
        table.ajax.reload();
        var args = table.ajax.params();
        console.log(args.extra_search);
        // $.post("test.php", {data: $(this).serializeArray()}, function(data){
        //     //此处通过传值判断是否成功，成功则刷新列表
        //     if(data){
        //         console.log(table.data(data));
        //     }
        // });
    });
});