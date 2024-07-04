"use client";
import store from "@/app/context/store";
import { addNewBook } from "@/app/utilities/admin/addnewBooks";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const AddBookForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    author: "",
    image: "",
    pages: "",
    category: "",
    description: "",
    year: "",
    isbn: "",
    availableItems: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: any) => {
    const imageFile = e.target.files[0];
    setFormData({ ...formData, image: imageFile });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Here you would perform validation
    if (!formData.name || !formData.author || !formData.availableItems) {
      setError("Please fill in all required fields.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("author", formData.author);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("total_pages", formData.pages);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("year", formData.year);
    formDataToSend.append("ISBN", formData.isbn);
    formDataToSend.append("quantity", formData.availableItems);
    formDataToSend.append("group", formData.category);
    formDataToSend.append("price", "N100/per-day");

    // Submit form data to backend

    const response = await addNewBook(formDataToSend);
    if (!response.ok) {
      setError("Failed to add book. Please try again later.");
    }
    // Reset form after successful submission
    setFormData({
      title: "",
      name: "",
      author: "",
      image: "",
      pages: "",
      category: "",
      description: "",
      year: "",
      isbn: "",
      availableItems: "",
    });
    setError("");
  };

  return (
    <div className="bg-white  flex justify-center items-center">
      <div className="bg-white rounded-lg border border-amber-500 p-6 w-full lg:max-w-lg max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Add New Book</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 p-3">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Book Cover
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>
            <div className="lg:flex block lg:space-x-3 w-full">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                />
              </div>
            </div>
            <div className="lg:flex block lg:space-x-3 w-full">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  ISBN Number
                </label>
                <input
                  type="text"
                  id="isbn"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Number Of Pages
                </label>
                <input
                  type="number"
                  id="pages"
                  name="pages"
                  value={formData.pages}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full"
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                About
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full h-[150px]"
              />
            </div>
            {/* Add more input fields for other attributes */}
            <div className="mb-4">
              <label
                htmlFor="availableItems"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Available Items
              </label>
              <input
                type="number"
                id="availableItems"
                name="availableItems"
                value={formData.availableItems}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>
          </div>
          <div className="flex space-x-2 w-full">
            <button
              type="submit"
              className="bg-amber-500 text-white px-4 py-2 rounded-md mt-4 w-full"
            >
              Submit
            </button>
            <button
              type="submit"
              className="bg-amber-500 text-white px-4 py-2 rounded-md mt-4 w-full"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookForm;
