// import API from "@/utils/api";
// import { useQuery } from "@tanstack/react-query";
// // import API from "../utils/api";

// const fetchProducts = async ({ queryKey }) => {
//   const [, params] = queryKey;
//   const { data } = await API.get("/", { params });
//   return data;
// };

// export const useProducts = (filters) => {
//   return useQuery(["product", filters], fetchProducts, {
//     keepPreviousData: true,
//   });
// };


import API from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

// Fetch products with the given filters
const fetchProducts = async ({ queryKey }) => {
  const [, params] = queryKey;
  const { data } = await API.get("/", { params: params || {} }); // Ensure params is an object
  return data;
};

// Custom hook for fetching products
export const useProducts = (filters) => {
  return useQuery({
    queryKey: ["product", filters],
    queryFn: fetchProducts,
    keepPreviousData: true,
  });
};
