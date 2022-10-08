import React, { useCallback, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionBlog from "../redux/actions/actionBlog";
import { useDropzone } from "react-dropzone";

export default function AdminBlogs() {
  const [blogName, setBlogName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const blogList = useSelector((state) => state.blogList);
  const { getAllBlogs } = bindActionCreators(actionBlog, useDispatch());

  // Validation
  const [invalidBlogName, setInvalidBlogName] = useState(false);
  const [invalidAuthor, setInvalidAuthor] = useState(false);
  const [invalidDescription, setInvalidDescription] = useState(false);

  useEffect(() => {
    getAllBlogs();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    checkIfValid();
  };

  const checkIfValid = () => {
    let isValid = true;

    // Check if blog is Valid
    if (blogName.match("^$|^.*@.*..*$")) {
      setInvalidBlogName(true);
      isValid = false;
    } else {
      setInvalidBlogName(false);
    }

    // Check if author is valid
    if (author.match("^$|^.*@.*..*$")) {
      setInvalidAuthor(true);
      isValid = false;
    } else {
      setInvalidAuthor(false);
    }

    //Check if description has an input
    if (description.match("^$|^.*@.*..*$")) {
      setInvalidDescription(true);
      isValid = false;
    } else {
      setInvalidDescription(false);
    }

    return isValid;
  };

  function MyDropzone(blog) {
    // Callback function
    const onDrop = useCallback((acceptedFiles) => {
      const file = acceptedFiles[0];

      const formData = new FormData();
      formData.append("file", file);
    }, []);

    // React Dropzone
    const { getRootProps } = useDropzone({ onDrop });

    //Return statement
    return (
      <div className="col-md-12 col-lg-4 card border-0 my-3" key={blog.blogId}>
        <img
          src={blog.imageLink ? blog.imageLink : "/images/empty-img.png"}
          alt={blog.blogName}
          {...getRootProps()}
        />
        <div className="card-body px-0">
          <h4 className="card-title">{blog.blogName}</h4>
          <p className="card-text mt-3 text-muted">{blog.description}</p>
          <p className="card-text">
            <small className="text-muted">Author: </small>
            {blog.author}
          </p>
          <button to="/products" className="btn">
            DELETE
          </button>
        </div>
      </div>
    );
  }

  const renderBlogs = () => {
    return (
      <>
        {blogList.map((blog) => (
          <React.Fragment key={blog.blogId}>
            <div
              className="col-md-3 mb-4"
              style={{ height: "300px", width: "250px" }}
            >
              <MyDropzone {...blog} />
            </div>
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <>
      <hr />
      <Form onSubmit={handleSubmit} className="row">
        {/* BLOG NAME */}
        <Form.Group controlId="formBlogName" className="w-50">
          <Form.Control
            type="text"
            size="sm"
            placeholder="Enter Blog Name"
            value={blogName}
            onChange={(e) => setBlogName(e.target.value)}
            isInvalid={invalidBlogName}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Please input a valid blog name.
          </Form.Control.Feedback>
        </Form.Group>

        {/* BLOG AUTHOR */}
        <Form.Group controlId="formAuthor" className="w-50">
          <Form.Control
            type="text"
            size="sm"
            placeholder="Enter Author Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            isInvalid={invalidAuthor}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Please input a valid author name.
          </Form.Control.Feedback>
        </Form.Group>

        {/* DESCRIPTION */}
        <Form.Group controlId="formDescription" className="w-50">
          <Form.Control
            type="text"
            size="sm"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            isInvalid={invalidDescription}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Please input a blog description.
          </Form.Control.Feedback>
        </Form.Group>
        <div className="col-12 d-flex flex-wrap justify-content-center">
          <button
            className="bg-primary text-center text-white w-50"
            onClick={handleSubmit}
          >
            Upload
          </button>
        </div>
      </Form>
      <hr />
      <h4 className="text-danger">Blogs</h4>
      <div className="row justify-content-center">{renderBlogs()}</div>
    </>
  );
}
