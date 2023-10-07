$(document).ready(function () {
    $("#create-news-form").submit(function (event) {
      event.preventDefault(); // Menghentikan pengiriman formulir secara default

      // Mengambil data dari formulir
      let title = $("#title").val();
      let cover = $("#cover").val();
      let content = $("#content").val();

      // Mengirim data ke API menggunakan AJAX
      $.ajax({
        url: "/api/v1/news", // Ganti dengan URL API sesuai dengan struktur Anda
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ title: title, cover: cover, content: content, isPublic: true, author: "Admin" }),
        success: function (response) {
          // Tindakan setelah berhasil
          alert("Berita berhasil ditambah.");
          // Redirect ke halaman lain atau lakukan sesuatu yang sesuai kebutuhan Anda
          window.location.href = "/";
        },
        error: function (error) {
          // Tindakan jika terjadi kesalahan
          console.error("Terjadi kesalahan: " + JSON.stringify(error));
          alert("Gagal menyimpan berita.");
        },
      });
    });
  });

$("#comment-form").submit(function(event){
  event.preventDefault()

  const name = $("#name").val()
  const commentText = $("#comment").val()
  const newsId = $("#newsId").val()

  $.ajax({
    url: "/api/v1/comments",
    type: "POST",
    contentType : "application/json",
    data: JSON.stringify({name,comment:commentText,news_id:newsId}),
    success : function(response){
      alert("Komentar berhasil ditambah.")
      window.location.href = "/news/"+newsId
    },
    error : function(error){
      console.error("terjadi kesalahan: " + JSON.stringify(error))
      alert("Gagal menyimpan komentar.")
    }
  })
  $("#name").val("")
  $("#comment").val("")
})

// Delete comment Start
const deleteButton = document.querySelectorAll("#delete-comment")
const deleteCommentEndPoint = "/api/v1/delete_comments"


for (let i = 0; i < deleteButton.length; i++) {
  deleteButton[i].addEventListener("click",async (event)=>{
    event.preventDefault()
    const commentId = deleteButton[i].getAttribute('data-id-comment')
    const response = await fetch(deleteCommentEndPoint,{
      method : "POST",
      headers: {
        "Content-type": "application/json",
      },
      body : JSON.stringify({
        id : parseInt(commentId)
      })
    })
    const json = await response.json()
    if (json.statusCode==201) {
      alert("Berhasil menghapus komentar")
      window.location.reload()
    }else if(json.statusCode==400){
      alert("gagal menghapus komentar")
    }
  })
}

// Delete comment End

// Edit News Start

const updateNewsButton = document.getElementById("update")
const titleUpdate = document.getElementById("title-update")
const coverUpdate = document.getElementById("cover-update")
const authorUpdate = document.getElementById("author-update")
const contentUpdate = document.getElementById("content-update")
const newsUpdateId = document.getElementById("news-id")
const newsUpdateIdValue = newsUpdateId.getAttribute("data-news-id")
const updateNewsEndPoint = `/api/v1/edit_news/${newsUpdateIdValue}`
updateNewsButton.addEventListener("click",async (event)=>{
  event.preventDefault()
  const titleUpdateValue = titleUpdate.value
  const coverUpdateValue = coverUpdate.value
  const authorUpdateValue = authorUpdate.value
  const contentUpdateValue = contentUpdate.value

  const response = await fetch(updateNewsEndPoint,{
    method : "POST",
    headers: {
      "Content-type": "application/json",
    },
    body : JSON.stringify({
      title : titleUpdateValue,
      cover : coverUpdateValue,
      author : authorUpdateValue,
      content : contentUpdateValue
    })
  })
  const json = await response.json()
  if(json.statusCode==200){
    alert("data berhasil diupdate")
    window.location.href = "/"
  } else if(json.statusCode==400){
    alert("gagal menyimpan perubahan")
  }
})
// Edit News End