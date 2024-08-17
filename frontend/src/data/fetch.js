export const fetchLoadPosts = async () => {
  const response = await fetch("http://localhost:5000/blogPosts/?page=1&perPage=10");
  const data = await response.json();
  return data;
};

export const fetchNewPost = async (formValue) => {
    const response = await fetch("http://localhost:5000/blogPosts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValue),
    })
    const data = await response.json();
    return data;
}