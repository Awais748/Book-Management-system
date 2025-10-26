import React, { useState, useEffect } from "react";
import { bookBaseUrl } from "../axiosInstance";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Home = () => {
  const [bookForm, setBookForm] = useState({
    BookName: "",
    BookTitle: "",
    BookAuthor: "",
    SellingPrice: "",
    PublishDate: "",
  });

  const [bookList, setBookList] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const getAllBookList = async () => {
    try {
      const res = await bookBaseUrl.get("/booklists");
      setBookList(res.data.books);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBookList();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setBookForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await bookBaseUrl.delete(`deletebook/${id}`);
      if (data?.success) {
        alert(data?.message);
        getAllBookList();
      }
    } catch (error) {
      console.log(error);
      alert("Error deleting book");
    }
  };

  const handleUpdate = (data) => {
    setBookForm({
      _id: data?._id,
      BookName: data?.BookName,
      BookTitle: data?.BookTitle,
      BookAuthor: data?.BookAuthor,
      SellingPrice: data?.SellingPrice,
      PublishDate: data?.PublishDate,
    });
    setIsUpdating(true);
  };

  const handleSubmit = async () => {
    if (
      !bookForm.BookName ||
      !bookForm.BookTitle ||
      !bookForm.BookAuthor ||
      !bookForm.SellingPrice
    ) {
      alert("All fields are required");
      return;
    }

    try {
      if (isUpdating) {
        const { data } = await bookBaseUrl.put(
          `/updatebook/${bookForm._id}`,
          bookForm
        );
        if (data?.success) {
          alert(data.message);
          setIsUpdating(false);
        }
      } else {
        const { data } = await bookBaseUrl.post("/addBook", bookForm);
        if (data?.success) {
          alert("Book added successfully");
        }
      }

      setBookForm({
        BookName: "",
        BookTitle: "",
        BookAuthor: "",
        SellingPrice: "",
        PublishDate: "",
      });

      getAllBookList();
    } catch (error) {
      alert("Error: " + error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] px-6 py-10 text-gray-100">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-[#22c55e] drop-shadow-lg tracking-wide">
          📚 Book Management Dashboard
        </h1>

        {/* Form Section */}
        <div className="backdrop-blur-lg bg-white/5 border border-[#22c55e]/20 shadow-xl rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-[#22c55e] mb-6 border-b border-[#22c55e]/30 pb-3">
            {isUpdating ? "✏️ Update Book" : "➕ Add New Book"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              { label: "Book Name", name: "BookName", type: "text" },
              { label: "Book Title", name: "BookTitle", type: "text" },
              { label: "Author", name: "BookAuthor", type: "text" },
              { label: "Selling Price", name: "SellingPrice", type: "text" },
              { label: "Publish Date", name: "PublishDate", type: "date" },
            ].map((field) => (
              <div key={field.name} className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#a7f3d0] tracking-wide">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={`Enter ${field.label}`}
                  className="bg-[#0f172a]/70 border border-[#22c55e]/30 rounded-lg px-3 py-2 text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#22c55e] focus:border-[#22c55e] transition-all duration-200"
                  name={field.name}
                  value={bookForm[field.name]}
                  onChange={handleFormChange}
                />
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-[#22c55e] hover:bg-[#16a34a] text-[#0f172a] px-8 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-[#22c55e]/40 transition-transform duration-300 hover:-translate-y-1"
            >
              {isUpdating ? "Update Book" : "Add Book"}
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="backdrop-blur-lg bg-white/5 border border-[#22c55e]/20 shadow-xl rounded-2xl overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-[#22c55e]/90 text-[#0f172a]">
              <tr>
                {["Book Name", "Book Title", "Author", "Price", "Publish Date", "Action"].map(
                  (header) => (
                    <th
                      key={header}
                      className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-[#22c55e]/10">
              {bookList?.length > 0 ? (
                bookList.map((book, index) => (
                  <tr
                    key={index}
                    className="hover:bg-[#22c55e]/10 transition duration-300"
                  >
                    <td className="px-6 py-4">{book?.BookName}</td>
                    <td className="px-6 py-4">{book?.BookTitle}</td>
                    <td className="px-6 py-4">{book?.BookAuthor}</td>
                    <td className="px-6 py-4">₨ {book?.SellingPrice}</td>
                    <td className="px-6 py-4">
                      {book?.PublishDate?.split("T")[0]}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleDelete(book._id)}
                          className="p-2 rounded-md bg-red-500/20 text-red-400 hover:bg-red-500/40 transition duration-200"
                        >
                          <MdDelete size={18} />
                        </button>
                        <button
                          onClick={() => handleUpdate(book)}
                          className="p-2 rounded-md bg-[#22c55e]/20 text-[#22c55e] hover:bg-[#22c55e]/40 transition duration-200"
                        >
                          <FaEdit size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-8 text-gray-400 italic"
                  >
                    No books found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Home;
