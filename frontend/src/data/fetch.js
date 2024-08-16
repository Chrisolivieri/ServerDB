export const fetchLoadPosts = async () => {
  const response = await fetch("http://localhost:5000/blogPosts");
  const data = await response.json();
  return data;
};

export const fetchNewPost = async () => {
    const response = await fetch("http://localhost:5000/blogPosts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
     // body: JSON.stringify(formValue),
    })
    const data = await response.json();
    return data;
}