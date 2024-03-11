import axios from "axios";

const url = "http://localhost:8080/api";

export class Api {
  static async getAllDeparments() {
    const response = await axios.get(`${url}/departamento/getAllDepartaments`);
    return response.data.data
  }

  static async getAllOficinas() {
    const response = await axios.get(`${url}/oficina/getAllOficinas`);
    return response.data.data
  }

  static async getAllCampus() {
    const response = await axios.get(`${url}/sedes/getAllSedes`);
    return response.data.data
  }

  static async login(username, password) {
    const response = await axios.post(`${url}/usuario/login`, { username, password });
    return response.data.data;
  }

  static async createUser(userData) {
    const response = await axios.post(`${url}/usuario/crear_usuario`, userData);
    return response.data.data;
  }
}