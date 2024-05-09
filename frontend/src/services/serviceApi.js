/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const API_URL = "http://localhost:8080/api/";

// API leitos 
export const createLeito = async (param) => {
  console.log(param)
  // return axios.post(API_URL + "leito", {
  //   idAirPure,
  //   nome,
  //   limitCo2,
  //   limitRuidoSonoro,
  //   limitLuminosidade,
  //   limitTemperatura,
  //   limitCOVT,
  //   limitUmidade,
  // });
};

export const getLeitosId = (id) => {
  return axios.get(API_URL + `leito/${id}`);
};

export const getLeitos = () => {
  return axios.get(API_URL + "leitos");
};

export const updateLeitos = (idLeito ,idAirPure, nome, limitCo2, limitRuidoSonoro, limitLuminosidade, limitTemperatura, limitCOVT, limitUmidade) => {
  return axios.put(API_URL + `leito/${idLeito}`,{
    idAirPure,
    nome,
    limitCo2,
    limitRuidoSonoro,
    limitLuminosidade,
    limitTemperatura,
    limitCOVT,
    limitUmidade,

  });
};

export const deleteLeitos = (id) => {
  return axios.delete(API_URL + `leito/${id}`);
};


// API RELATÓRIOS
export const getRelatorioId = (id) => {
  return axios.get(API_URL + `relatorio/${id}`);
};

export const getRelatorios = () => {
  return axios.get(API_URL + "relatorios");
};

export const createRelatorios = (idLeito ,idAirPure, nome, limitCo2, limitRuidoSonoro, limitLuminosidade, limitTemperatura, limitCOVT, limitUmidade) => {
  return axios.post(API_URL + "relatorios",{
    idLeito ,idAirPure, nome, limitCo2, limitRuidoSonoro, limitLuminosidade, limitTemperatura, limitCOVT, limitUmidade
  });
};
export const updateRalatorio = () => {
  return axios.put(API_URL + "relatorio");
};

export const deleteRelatorio = (id) => {
  return axios.delete(API_URL + `relatorio/${id}`);
};



