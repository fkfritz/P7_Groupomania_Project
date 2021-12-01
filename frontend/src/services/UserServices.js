import Api from "@/services/Api";

export default {
  deleteAccount(id) {
    return Api().delete("auth/accounts/" + id);
  },
};
