import axios from "axios";

const API_URL = "http://localhost:8080/";

const registerUser = (cpf, telefone, name, email, password, confPassword) => {
  return axios.post(API_URL + "register", {
    cpf,
    telefone,
    name,
    email,
    password,
    confPassword
  });
};

const login = async (email, password) => {

  
 
  const response = await axios
    .post(API_URL + "login", {
      email,
      password,
    });
  if (response.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data));
    
    
  }
  return response.data;
};

const logout =  async (user) => {
  // console.log(JSON.parse(user))
    await axios
    .post(API_URL + "logout", JSON.parse(user)).then(() => {
      localStorage.removeItem("user");
    }, (error) => {
      console.log(error);
    });
    
  
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthserveceApi = {
  registerUser,
  login,
  logout,
  getCurrentUser
};

export default AuthserveceApi