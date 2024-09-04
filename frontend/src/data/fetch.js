export const fetchLoadPosts = async () => {
  const response = await fetch(
    "http://localhost:5000/blogPosts/?page=1&perPage=10"
  );
  const data = await response.json();
  return data;
};

export const fetchNewPost = async (formValue, cover) => {
  const formData = new FormData();
  // formdata.append serve a fare l'upload di un file all'interno di un form
  formData.append("cover", cover); // aggiungi immagine
  formData.append("category", formValue.category);
  formData.append("title", formValue.title);
  formData.append("readTime", JSON.stringify(formValue.readTime)); // converte l'oggetto in stringa JSON
  formData.append("author", formValue.author);
  formData.append("content", formValue.content);
  const res = await fetch("http://localhost:5000/blogPosts", {
    method: "POST",
    body: formData, // nessun content type necessario
  });
  const data = await res.json();
  return data;
};

export const fetchLogin = async (formvalue) => {
  const res = await fetch("http://localhost:5000/login", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(formvalue),
  });
  const data = await res.json();
  return data;
};

export const fetchRegister = async (regFormValue, avatar) => {
  console.log(regFormValue);
  const formData = new FormData();
  formData.append("avatar", avatar);
  formData.append("name", regFormValue.name);
  formData.append("surname", regFormValue.surname);
  formData.append("email", regFormValue.email);
  formData.append("password", regFormValue.password);
  const res = await fetch("http://localhost:5000/register", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  return data;
};

export const fetchME = async () => {
  const res = await fetch("http://localhost:5000/me", {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
   
  });
  if (!res.ok) {
    throw new Error(res.status);
  }
  const data = await res.json();
  return data;
};

