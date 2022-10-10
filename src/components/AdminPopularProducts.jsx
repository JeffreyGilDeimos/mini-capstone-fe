import React, { useCallback, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionPopularProducts from "../redux/actions/actionPopularProduct";
import { useDropzone } from "react-dropzone";

export default function AdminPopularProducts() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const popularProductList = useSelector((state) => state.popularProductList);
  const { getAllPopularProducts, addPopularProduct, deletePopularProduct } =
    bindActionCreators(actionPopularProducts, useDispatch());

  // Validation
  const [invalidProductName, setInvalidProductName] = useState(false);
  const [invalidPrice, setInvalidPrice] = useState(false);

  useEffect(() => {
    getAllPopularProducts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (checkIfValid()) {
      const body = {
        productName: productName,
        price: price,
      };

      addPopularProduct(body);
    }
  };

  const checkIfValid = () => {
    let isValid = true;

    // Check if productName is valid
    if (productName.match("^$|^.*@.*..*$")) {
      setInvalidProductName(true);
      isValid = false;
    } else {
      setInvalidProductName(false);
    }

    // Check if price has value
    if (price.match("^$|^.*@.*..*$") || isNaN(price) || price <= 0) {
      setInvalidPrice(true);
      isValid = false;
    } else {
      setInvalidPrice(false);
    }

    return isValid;
  };

  function MyDropzone(popular) {
    // Callback function
    const onDrop = useCallback((acceptedFiles) => {
      const file = acceptedFiles[0];

      const formData = new FormData();
      formData.append("file", file);
    }, []);

    // React Dropzone
    const { getRootProps } = useDropzone({ onDrop });

    // Return statement
    return (
      <div className="card h-100 text-center p-4">
        <img
          src={popular.imageLink ? popular.imageLink : "/images/empty-img.png"}
          alt={popular.productName}
          {...getRootProps()}
        />
        <div className="card-body">
          <h5 className="card-title mb-0">
            {popular?.productName.substring(0, 12)}...
          </h5>
          <p className="card-text lead fw-bold">$ {popular.price}</p>
          <button onClick={() => deletePopularProduct(popular.productId)}>
            DELETE
          </button>
        </div>
      </div>
    );
  }

  const renderPopulars = () => {
    return (
      <>
        {popularProductList.map((popular) => (
          <React.Fragment key={popular.productId}>
            <div
              className="col-md-3 mb-4"
              style={{ height: "300px", width: "250px" }}
            >
              <MyDropzone {...popular} />
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
        {/* PRODUCT NAME */}
        <Form.Group controlId="formProductName" className="w-50">
          <Form.Control
            type="text"
            size="sm"
            placeholder="Enter Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            isInvalid={invalidProductName}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Please input a product name
          </Form.Control.Feedback>
        </Form.Group>

        {/* PRODUCT PRICE */}
        <Form.Group controlId="formPrice" className="w-50">
          <Form.Control
            type="text"
            size="sm"
            placeholder="Enter Product Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            isInvalid={invalidPrice}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Price must be a number
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
      <div className="row justify-content-center">{renderPopulars()}</div>
    </>
  );
}