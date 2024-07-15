import api, { baseURL } from "@/app/context/api";
import { Books } from "@/app/context/type";
import { RunCircle } from "@mui/icons-material";
import { Button } from "@nextui-org/button";
import { Image, ScrollShadow } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

function EditBookPage({ bookId }: { bookId: string }) {
  const [bookData, setBookData] = useState<Books | null>(null);
  const [set, setSet] = useState<boolean>(false);
  const router = useRouter();
  const [src, setSrc] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    image: "",
    pages: "",
    category: "",
    description: "",
    year: "",
    isbn: "",
    publication_date: "",
    series: "",
    subtitle: "",
    summary: "",
    edition: "",
    publisher: "",
    availableItems: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch book data based on bookId when the component mounts
    const fetchBookData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`user/book/${bookId}/`);
        if (response.status !== 200) {
          throw new Error("Failed to fetch book data.");
        }
        const data = await response.data.books;
        console.log(data);
        setBookData(data);
        setSrc(baseURL + data.image);
        setFormData({
          title: data.title,
          author: data.author,
          image: data.image,
          pages: data.total_pages,
          category: data.category,
          description: data.description,
          year: data.year,
          subtitle: data.subtitle,
          publication_date: data.publication_date,
          publisher: data.publisher,
          series: data.series,
          edition: data.edition,
          summary: data.summary,
          isbn: data.isbn,
          availableItems: data.quantity,
        });
      } catch (error) {
        setError("Failed to fetch book data. Please try again later. " + error);
      }
      setLoading(false);
    };

    fetchBookData();
  }, [bookId]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: any) => {
    setLoading(true);
    const imageFile = e.target.files[0];
    if (imageFile) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setSrc(e.target?.result as string);
      };
      fileReader.readAsDataURL(imageFile);
      // setSrc(imageFile as string);
      setFormData({ ...formData, image: imageFile });
      setSet(true);
    }
    setLoading(false);
    // setFormData({ ...formData, image: "" });
  };

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    // Here you would perform validation
    if (!formData.title || !formData.author || !formData.availableItems) {
      setError("Please fill in all required fields.");
      return;
    }

    const image = await fetch(src);
    const image_blob = await image.blob();
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("author", formData.author);
    formDataToSend.append("image", image_blob);
    formDataToSend.append("total_pages", formData.pages);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("subtitle", formData.subtitle);
    formDataToSend.append("edition", formData.description);
    formDataToSend.append("publication_date", formData.year);
    formDataToSend.append("total_pages", formData.pages);
    formDataToSend.append("series", formData.series);
    formDataToSend.append("edition", formData.edition);
    formDataToSend.append("publisher", formData.publisher);
    formDataToSend.append("summary", formData.summary);
    formDataToSend.append("ISBN", formData.isbn);
    formDataToSend.append("quantity", formData.availableItems);

    // Submit form data to backend
    try {
      const response = await api.post(
        `user/book/update/${bookId}/`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status !== 200) {
        throw new Error("Failed to update book.");
      } else {
        setError("");
        router.refresh();

        alert("Book updated successfully!");
      }
    } catch (error) {
      setError("Failed to update book. Please try again later.");
    }
    setLoading(false);
  };

  // if (!bookData) {
  //   return (
  //     <div className="w-full  flex justify-center animate-pulse items-center   text-center h-screen">
  //       Loading....
  //     </div>
  //   );
  // }

  return (
    <ScrollShadow
      orientation="vertical"
      className="bg-white  justify-center  w-full flex  items-center mt-60"
    >
      <div className="bg-white rounded-lg border border-amber-500 p-6 w-full max-w-full lg:max-w-xl xl:max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4">Edit Book</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col justify-center w-full items-start">
            <Image
              src={src}
              alt="Book Image"
              className="w-[200px] h-[200px]  rounded-[100%]"
            />
            <input
              type="file"
              // value={baseURL + src}
              name="image"
              onChange={handleImageChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
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
                Publisher *
              </label>
              <input
                type="text"
                name="publisher"
                value={formData.publisher}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Publication Date *
              </label>
              <input
                type="number"
                name="publication_date"
                value={formData.publication_date}
                onChange={handleChange}
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
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Series *
              </label>
              <input
                type="number"
                name="series"
                value={formData.series}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Edition *
              </label>
              <input
                type="number"
                name="edition"
                value={formData.edition}
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
              Suntitle *
            </label>
            <textarea
              id="description"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Summary *
            </label>
            <textarea
              id="description"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 w-full h-[150px]"
            />
          </div>

          <button
            type="submit"
            className="bg-amber-500 text-white px-4 py-2 rounded-md mt-4 w-full"
          >
            {" "}
            {loading ? <RunCircle className="animate-spin" /> : "Update"}
          </button>
        </form>
      </div>
    </ScrollShadow>
  );
}

export default EditBookPage;
