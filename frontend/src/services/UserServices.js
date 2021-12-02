import Api from "@/services/Api";

export default {
  deleteAccount(id) {
    return Api().delete("auth/accounts/" + id);
  },
  getAllUsers(data){
    return Api().get("auth/accounts/", data);
  }
};
