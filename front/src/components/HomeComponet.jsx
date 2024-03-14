import React, { useEffect, useState } from "react";
import axios from "axios";

export function HomeComponent() {
  const [datos, setDatos] = useState([]);
 







  useEffect(() => {
    const getFakeApi = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setDatos(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getFakeApi();
  }, []);

  return ;

}
