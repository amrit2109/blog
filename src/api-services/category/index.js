import axiosInstance from "../../api-caller";

export const getAllCategories = ( body) => {
    return axiosInstance.post(null, body);
  };


export const getCategorybyId = (query, categoryId) =>{
    return axiosInstance.post(null, {
        query,
        variables: {
          categoryId: categoryId,
        },
      });
}