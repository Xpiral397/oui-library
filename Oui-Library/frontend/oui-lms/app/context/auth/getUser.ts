import api from "../api";

export async function getUser(accessToken: string) {
  try {
    return (
      await api.get("/user/me", {
        headers: {
          Authorization: `JWT ${accessToken}`,
        },
      })
    ).data;
  } catch (e) {
    return { status: 500, error: "Server Internal Error" };
  }
}
