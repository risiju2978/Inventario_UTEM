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
}