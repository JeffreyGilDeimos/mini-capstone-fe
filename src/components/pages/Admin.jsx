import React from "react";
import AdminBlogs from "../AdminBlogs";
import AdminProducts from "../AdminProducts";

export default function Admin() {
  return (
    <div className="admin">
      <div className="content">
        <h3>Products</h3>
        <AdminProducts />
        <br />
        <br />
        <h3>Blogs</h3>
        <AdminBlogs />
      </div>
    </div>
  );
}
