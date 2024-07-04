import api from "@/app/context/api";
import { Books } from "@/app/dashboard/discover/sidebar";
import { AxiosError } from "axios";

export async function addNewBook(bookPayLoad: any) {
  try {
    const res = await api.post("/admin/login", bookPayLoad);
    return { ok: true, data: res.data() };
  } catch (err: any) {
    return {
      ok: false,
      status: 500,
      error: err?.message || err?.respone?.data || "Unknow rrror ocuccred",
    };
  }
}
