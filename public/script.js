const PATH = `${document.location.origin}/API/get-post-names`




$.ajax({
  url: PATH,
  success: (data)=>{
    postJSON = data
    console.log(postJSON)

    for(let i = 0; i < postJSON.length; i++){
      $('#posts').append(
        $('<div/>')
          .addClass("mb-24")
          .append(
            $('<a/>')
              .attr('href', `post.html?id=${postJSON[i].id}`)
              .addClass("font-semibold text-xl serif hover:underline underline-offset-2 hover:cursor-pointer")
              .text(postJSON[i].title)
          )
          .append(
            $('<p/>')
              .addClass("text-small text-zinc-700 serif mb-4")
              .text(postJSON[i].subtitle)
          )
          .append(
            $('<p/>')
              .addClass("text-small text-zinc-500 serif italic")
              .text(postJSON[i].by)
          )
      );
    }


  },
});