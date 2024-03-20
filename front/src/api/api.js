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

  static async getReadVista() {
    const response = await axios.get(`${url}/vista/readVista`);
    return response.data.data;
  }

  static async createArticulo(articuloData) {
    const response = await axios.post(
      `${url}/articulo/income_art`,
      articuloData
    );
    return response.data;
  }

  static async darBajaArticulo(data) {
    const response = await axios.post(`${url}/articulo/baja_art`, data);
    return response.data;
  }

  static async postReporteCustom(data) {
    const response = await axios.post(`${url}/informe/generator_inf`, data);
    return response.data;
  }
  //ADICIONAL MANTENEDORES
  //manteneddor de categoria
  static async createCategoria(nombreCategoria) {
<<<<<<< HEAD
    const response = await axios.post(`${url}/categoria/CreateCategories`,nombreCategoria);
    return response.data.data;
  };
  

  
  static async updateCategoria(UpdateCategoria) {
    const response = await axios.put(`${url}/categoria/updateCategories`,UpdateCategoria );
    
      return response.data.data;
    };
  
   
  
  
  static async deleteCategoria(categoriasEliminar) {
    const response = await axios.delete(`${url}/categoria/deleteCategories`, { data: categoriasEliminar });
    return response.data;
  }
  

  
      //mantenedor de oficina
      static async createOficina(ID_Departamento,nombreOficina) {
        const response = await axios.post(`${url}/oficina/createOficinas`, {
          office: nombreOficina,
          departament_id:ID_Departamento
        });
      
        return response.data;
      }
      static async deleteOficina(ID_Oficina) {
        const response = await axios.delete(`${url}/oficina/deleteOficinas`, {
          office_id: ID_Oficina
         
        });
        return response.data;
     } 

     static async updateOficina(ID_Oficina,ID_Departamento,nombreOficina) {
      const response = await axios.put(`${url}/oficina/updateOficinas`, {
        office_id: ID_Oficina,
        departament_id:ID_Departamento,
        office:nombreOficina
       
      });
      return response.data;
   } 
      //mantenedor de departamento
     
      static async createDepartamento(ID_Campus,nombreDepartamento) {
        const response = await axios.post(`${url}/departamento/createDepartament`, {

          campus_id:ID_Campus,
          departament:nombreDepartamento
         
        });
        return response.data;
     } 

     static async updateDepartamento(ID_Campus,nombreDepartamento) {
      const response = await axios.put(`${url}/departamento/updateDepartament`, {

        campus_id:ID_Campus,
        departament:nombreDepartamento
       
      });
      return response.data;
   } 


   static async deleteDepartamento(ID_Departamento) {
    const response = await axios.delete(`${url}/departamento/deleteDepartament`, {

      departament_id:ID_Departamento
=======
    const response = await axios.post(`${url}/categoria/CreateCategories`, {
      categoria: nombreCategoria,
    });

    return response.data;
  }
  static async updateCategoria(ID_Categoria, nombreCategoria) {
    const response = await axios.put(`${url}/categoria/updateCategories`, {
      categoria_id: ID_Categoria,
      categoria: nombreCategoria,
    });

    return response.data;
  }

  static async deleteCategoria(ID_Categoria) {
    const response = await axios.put(`${url}/categoria/deleteCategories`, {
      categoria_id: ID_Categoria,
    });

    return response.data;
  }
  //mantenedor de oficina
  static async createOficina(ID_Departamento, nombreOficina) {
    const response = await axios.post(`${url}/oficina/createOficinas`, {
      office: nombreOficina,
      departament_id: ID_Departamento,
    });
>>>>>>> origin2/develop

    return response.data;
  }
  static async deleteOficina(ID_Oficina) {
    const response = await axios.delete(`${url}/oficina/deleteOficinas`, {
      office_id: ID_Oficina,
    });
    return response.data;
  }

  static async updateOficina(ID_Oficina, ID_Departamento, nombreOficina) {
    const response = await axios.put(`${url}/oficina/updateOficinas`, {
      office_id: ID_Oficina,
      departament_id: ID_Departamento,
      office: nombreOficina,
    });
    return response.data;
  }
  //mantenedor de departamento

  static async createDepartamento(ID_Campus, nombreDepartamento) {
    const response = await axios.post(`${url}/departamento/createDepartament`, {
      campus_id: ID_Campus,
      departament: nombreDepartamento,
    });
    return response.data;
  }

  static async updateDepartamento(departament_id, nombreDepartamento) {
    const response = await axios.put(`${url}/departamento/updateDepartament`, {
      departament_id: departament_id,
      departament: nombreDepartamento,
    });
    return response.data;
  }

  static async deleteDepartamento(departament_id) {
    const response = await axios.delete(
      `${url}/departamento/deleteDepartament/${departament_id}`,
      {
        departament_id,
      }
    );
    return response.data;
  }

  //mantenedor de campus

  static async createSede(nombreCampus) {
    const response = await axios.post(`${url}/sede/createSede`, {
      campus: nombreCampus,
    });
    return response.data;
  }

  static async updateSede(nombreCampus, ID_Campus) {
    const response = await axios.put(`${url}/sede/updateSede`, {
      campus_id: ID_Campus,
      campus: nombreCampus,
    });
    return response.data;
  }

  static async deleteSede(campus_id) {
    const response = await axios.delete(`${url}/sede/deleteSede/${campus_id}`, {
      campus_id: campus_id,
    });
    return response.data;
  }

  //editar password usuario
  static async editarPasswordUsuario(userData) {
    const response = await axios.put(`${url}/usuario/edit_Password`, userData);
    return response.data.data;
  }
}
