import axios from "axios";
export default axios.create({
  baseURL: "https://api.spoonacular.com/recipes",
  headers: {
    Authorization: "Bearer ",
  },
});
