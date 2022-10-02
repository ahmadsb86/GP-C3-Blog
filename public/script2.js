const PATH = `${document.location.origin}/API/get-post-content`




$.ajax({
  type:   "POST",
  url: PATH,
  data: {id:1},
  success: (data)=>{
    console.log(data)
    $('#title').text(data.title)
    $('#sub').text(data.subtitle)
    $('#data').text(data.by)
    $('#content').html(data.content)
  }

});