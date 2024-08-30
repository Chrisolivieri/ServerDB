export const fetchLoadPosts = async () => {
  const response = await fetch("http://localhost:5000/blogPosts/?page=1&perPage=10");
  const data = await response.json();
  return data;
};

export const fetchNewPost = async (formValue,cover) => {
  const formData = new FormData()
  // formdata.append serve a fare l'upload di un file all'interno di un form
  formData.append('cover', cover) // aggiungi immagine
  formData.append('category', formValue.category)
  formData.append('title', formValue.title)
  formData.append('readTime', JSON.stringify(formValue.readTime)) // converte l'oggetto in stringa JSON
  formData.append('author', formValue.author)
  formData.append('content', formValue.content)
  const res= await fetch ('http://localhost:5000/blogPosts', {
      
      method: "POST",
      body: formData // nessun content type necessario
  })
  const data = await res.json() 
  return data
} 