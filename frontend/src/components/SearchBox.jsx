import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  const [keyword, setKeyword] = useState(urlKeyword || "");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      // If there's a valid search term, navigate to the search results page.
      navigate(`/search/${keyword}`);
    } else {
      // If no keyword, navigate to the homepage or show all products.
      navigate("/"); // Redirect to homepage or show all products.
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder="Search Product..."
        className="mr-sm-2 ml-sm-5"
        size="sm"
      ></Form.Control>
      <Button
        type="submit"
        variant="outline-light"
        className="p-2 mx-2"
        size="sm"
      >
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
