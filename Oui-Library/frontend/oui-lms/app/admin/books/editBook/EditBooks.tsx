import { ScrollShadow } from "@nextui-org/react";
import React, { useState, useEffect } from "react";

function EditBookPage({ bookId }: { bookId: string }) {
  const [bookData, setBookData] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
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

  useEffect(() => {
    // Fetch book data based on bookId when the component mounts
    const fetchBookData = async () => {
      try {
        const response = await fetch(`your-backend-api-url/books/${bookId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch book data.");
        }
        const data = await response.json();
        setBookData(data);
        setFormData({
          title: data.title,
          author: data.author,
          image: data.image,
          pages: data.pages,
          category: data.category,
          description: data.description,
          year: data.year,
          isbn: data.isbn,
          availableItems: data.availableItems,
        });
      } catch (error) {
        setError("Failed to fetch book data. Please try again later.");
      }
    };

    fetchBookData();
  }, [bookId]);

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
    if (!formData.title || !formData.author || !formData.availableItems) {
      setError("Please fill in all required fields.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("author", formData.author);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("pages", formData.pages);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("year", formData.year);
    formDataToSend.append("isbn", formData.isbn);
    formDataToSend.append("availableItems", formData.availableItems);

    // Submit form data to backend
    try {
      const response = await fetch(`your-backend-api-url/books/${bookId}`, {
        method: "PUT",
        body: formDataToSend,
      });
      if (!response.ok) {
        throw new Error("Failed to update book.");
      }
      setError("");
      alert("Book updated successfully!");
    } catch (error) {
      setError("Failed to update book. Please try again later.");
    }
  };

  // if (!bookData) {
  //   return (
  //     <div className="w-full  flex justify-center animate-pulse items-center   text-center h-screen">
  //       Loading....
  //     </div>
  //   );
  // }

  return (
    <ScrollShadow className="bg-white    w-full flex justify-center items-center">
      <div className="bg-white rounded-lg border border-amber-500 p-6 w-full max-w-full lg:max-w-xl xl:max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4">Edit Book</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>
            {/* Add more input fields for other attributes */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Available Items
              </label>
              <input
                type="number"
                name="availableItems"
                value={formData.availableItems}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>
            {/* <div className="lg:flex block lg:space-x-3 w-full"> */}
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
            {/* </div> */}
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
          <button
            type="submit"
            className="bg-amber-500 text-white px-4 py-2 rounded-md mt-4 w-full"
          >
            Update Book
          </button>
        </form>
      </div>
    </ScrollShadow>
  );
}

export default EditBookPage;
