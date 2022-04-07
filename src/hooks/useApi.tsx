import { create, ApisauceInstance } from "apisauce";
const useAPI = (): ApisauceInstance => {
  const axios = create({
    baseURL: "https://fakestoreapi.com/",
    headers: {
      Accept: "application/json",
    },
  });
  return axios;
};

export default useAPI;
