import api from "@/app/context/api";

export async function addNewBook(bookPayLoad: any) {
  try {
    const res = await api.post("/admin/add_new_book", bookPayLoad);
    return { ok: true, data: res.data() };
  } catch (err: any) {
    return {
      ok: false,
      status: 500,
      error: err?.message || err?.respone?.data || "Unknow error ocuccred",
    };
  }
}
