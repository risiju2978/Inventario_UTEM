import axios from "axios";
import { variables } from "../config/const";

const url = variables.urlBaseBack;

export class Api {
  static async getAllDeparments() {
    const response = await axios.get(`${url}/departamento/getAllDepartaments`);
    return response.data.data;
  }

  static async getAllOficinas() {
    const response = await axios.get(`${url}/oficina/getAllOficinas`);
    return response.data.data;
  }

  static async getAllCampus() {
    const response = await axios.get(`${url}/sede/getAllSedes`);
    return response.data.data;
  }

  static async login(username, password) {
    const response = await axios.post(`${url}/usuario/login`, {
      username,
      password,
    });
    return response.data.data;
  }

  static async createUser(userData) {
    const response = await axios.post(`${url}/usuario/crear_usuario`, userData);
    return response.data.data;
  }

  static async banearUser(id, user_state) {
    const response = await axios.put(`${url}/usuario/editar_rol`, {
      user_id: id,
      user_state: user_state,
    });
    return response.data.data;
  }

  static async changeRolUser(id, rol_id) {
    const response = await axios.put(`${url}/usuario/editar_rol`, {
      user_id: id,
      rol_id: rol_id,
    });
    return response.data.data;
  }

  static async editUser(userData) {
    const response = await axios.put(`${url}/usuario/editar_usuario`, userData);
    return response.data.data;
  }

  static async donwloadReport(data) {
    const response = await axios.get(`${url}/informe/generator_inf`, data);
    return response.data.data;
  }

  static async getAllCategories() {
    const response = await axios.get(`${url}/categoria/getAllCategories`);
    return response.data.data;
  }
}
