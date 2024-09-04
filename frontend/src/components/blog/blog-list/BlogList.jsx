import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";
import { fetchLoadPosts } from "../../../data/fetch";


const BlogList = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const posts = await fetchLoadPosts();
      console.log(posts);
      setPosts(posts);
    })();
  }, []);

  

  return (
    <Row>
      {posts.map((post, i) => (
        <Col
          key={`item-${i}`}
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem key={post.title} {...post} />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;
