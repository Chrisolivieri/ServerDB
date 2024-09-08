export const fetchLoadPosts = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/blogPosts/?page=1&perPage=10`
  );
  const data = await response.json();
  return data;
};

export const fetchLoadPost = async (params) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/blogPosts/${params}`
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
  const res = await fetch(`${process.env.REACT_APP_API_URL}/blogPosts`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "POST",
    body: formData, // nessun content type necessario
  });
  const data = await res.json();
  return data;
};

export const fetchLogin = async (formvalue) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
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
  formData.append("avatar", avatar); //append serve a fare l'upload di un file all'interno di un form
  formData.append("name", regFormValue.name);
  formData.append("surname", regFormValue.surname);
  formData.append("email", regFormValue.email);
  formData.append("password", regFormValue.password);
  const res = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  return data;
};

export const fetchME = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) {
    throw new Error(res.status);
  }
  const data = await res.json();
  return data;
};

export const loadComments = async (id) => {
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/blogPosts/${id}/comments`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const data = await res.json();
  return data;
};

export const newComment = async (id, formValue) => {
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/blogPosts/${id}/comments`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formValue),
    }
  );
  const data = await res.json();
  return data;
};
