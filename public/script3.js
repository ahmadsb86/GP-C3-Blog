const PATH = `${document.location.origin}/API/create-post`



$('#btn').click( ()=>{
  $.ajax({
    type:   "POST",
    url: PATH,
    data: {
      title: $('#title').val(),
      subtitle: $("#subtitle").val(),
      by: $("#date").val(),
      content: $("#content").val()
    },
    success: (data)=>{
      console.log(data)
      
    }
  
  });
})