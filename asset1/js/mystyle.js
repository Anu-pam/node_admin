$(document).ready(function(){

 
     $.ajax({
        url:'/addLabour',  
        method:'post',  
        dataType:'json',  
        data:{}, 
        success:function(response){
            // console.log(response);  
            if(response.msg=='success'){ 
                 
                $.each(response.data,function(index,data){  
       $('#state').append("<option value='"+data.state_id+"'>"+data.state_name+"</option>");   
                }); 
            }else{  
                alert('some error occurred try again');  
            }  
        },  
        error:function(response){  
            alert('server error occured')  
        }  
     });

$('#state').change(function(){
var state_id=$('#state').val();
if(state_id != '')
{
    // alert(state_id);
    $.ajax({
        url:"/fetch_city",
        method:"POST",
        data:{state_id:state_id},
        success:function(response)
        {
            if(response.msg=='success'){ 
                $('#city').empty();
                $('#city').append("<option value=''>Select city</option>");
                $.each(response.data,function(index,data){  
                $('#city').append("<option value='"+data.city_id+"'>"+data.city_name+"</option>");
                }); 
            }
        }
       });
}
});
  
  
})