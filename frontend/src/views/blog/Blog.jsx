import React, { useContext, useEffect, useState } from "react";
import { Container, Image, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import "./styles.css";
import { fetchLoadPost } from "../../data/fetch";
import { newComment, loadComments } from "../../data/fetch";
import { AuthorContext } from "../../context/AuthorContextProvider";

const Blog = (props) => {
  const { authorInfo } = useContext(AuthorContext);
  const [comments, setComments] = useState([]);
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  const initialFormState = {
    content: "",
    blogPost: params.id,
    author: authorInfo?._id,
  };

  const [formValue, setFormValue] = useState(initialFormState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSaveComment = async () => {
    try {
      await newComment(params.id, formValue);
      const commentsRes = await loadComments(params.id);
      setComments(commentsRes.data);
      setFormValue(initialFormState); // Reset form value
    } catch (error) {
      console.error("Errore durante il salvataggio del commento:", error);
    }
  };

  useEffect(() => {
    const postDetails = async () => {
      try {
        const response = await fetchLoadPost(params.id);
        const commentsRes = await loadComments(params.id);
        if (response) {
          setBlog(response);
          setComments(commentsRes.data);
          setLoading(false);
        } else {
          navigate("/404");
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    postDetails();
  }, [params, navigate]);

  console.log(blog);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="blog-details-root">
        <Container>
          <Image className="blog-details-cover" src={blog.cover} />
          <h1 className="blog-details-title">{blog.title}</h1>

          <div className="blog-details-container">
            <div className="blog-details-author">
              <BlogAuthor {...blog.author} />
            </div>
            <div className="blog-details-info">
              <div>{blog.createdAt}</div>
              <div>{`lettura da ${blog.readTime.value} ${blog.readTime.unit}`}</div>
              <div
                style={{
                  marginTop: 20,
                }}
              >
                <BlogLike defaultLikes={["123"]} onChange={console.log} />
              </div>
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          ></div>

          <Row>
            <h3 className="mt-5">Sezione Commenti</h3>
            <div className="comments">
            {comments.map((comment, i) => (
              <Col
              key={`item-${i}`}
              md={8}
              className="mb-3"
              style={{
                marginBottom: 20,
              }}
              >
                <Container>
                  <div className="blog-comments">
                    <h3>{comment.content}</h3>
                    <p>{"commento di " + comment.author.name}</p>
                  </div>
                </Container>
              </Col>
            ))}
            </div>
          </Row>
          <div className="form">
            <div className="row">
              <div className="row">
                <div className="input-div">
                  <div className="d-flex">
                    <Row>
                      <Col xs={"auto"} className="pe-0">
                        <Image
                          className="blog-author"
                          src={authorInfo.avatar}
                          roundedCircle
                        />
                      </Col>
                      <Col>
                        <h6>{authorInfo.name}</h6>
                      </Col>
                    </Row>
                  </div>
                  <textarea
                    rows="2"
                    className="input-box"
                    placeholder="Scrivi qui un commento"
                    name="content"
                    value={formValue.content}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="btn-div">
              <button
                className="post-btn"
                onClick={handleSaveComment}
                type="button"
              >
                Post
              </button>
            </div>
          </div>
        </Container>
      </div>
    );
  }
};

export default Blog;
