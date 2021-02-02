$(function() {

  'use strict';

 var user_id=$('#user_id').val();
  // console.log(user_id);
 var base_url=$('#base_url').val();
 // console.log(base_url);
 if(user_id!=null){
  $.ajax({
    url:base_url+"agent/User/dealerchart",
    type:"post",
    data:{"user_id":user_id},
    success:function(res)
    {
     var userData=$.parseJSON(res);
     // console.log(userData);
     dealerchartdata(userData);
     // console.log('donw');
    },
    error:function()
    {
        console.log('error');
    },
  })
 }

function dealerchartdata(userData)
{
    var l=[];
    var d=[];
    var i=0;
    $.each(userData, function (index,value) {
  
        l[i]=index;
        d[i]=value;
        i++;
    
    });
    
     var leables=l;
     var datasets= jQuery.makeArray();
     var data1;
     $.each(d,function(index1,value1){
      
          $.each(value1,function(index2,value2){
              data1=value2['dealer'];
              datasets.push(data1);
       
          });
     });
   var data = {
   labels:leables,
    datasets: [{
      label: '# Dealer Appointment',
      data:datasets,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(255,99,132,1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  };


 
  var options = {
    scales: {
      yAxes: [{
        ticks: {
          // beginAtZero: true,
                   // suggestedMin: 50,
                    suggestedMax: 100,
        },
        gridLines: {
        	color: '#0d0d0d'
        }
      }]
    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius:0
      }
    }

  };
 

  // Get context with jQuery - using jQuery's .get() method.
  if ($("#barChart").length) {
    var barChartCanvas = $("#barChart").get(0).getContext("2d");
    // This will get the first returned node in the jQuery collection.
    var barChart = new Chart(barChartCanvas, {
      type: 'bar',
      data: data,
      options: options
    });
  }
}

});
