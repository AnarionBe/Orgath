import Axios from "axios"

export const useApi = (target) => {
  const endpoint = `${process.env.SERVER_ENDPOINT || 'https://orgath.herokuapp.com/'}/${target}`;
  
  const get = (id, body) => {
    return new Promise(async (resolve, reject) => {
      try {
        const {data} = await Axios.get(`${endpoint}/${id ? id : ''}`, {params: body});
        resolve(data);
      } catch(err) {
        reject(err);
      }
    });
  }

  const put = (id, body) => {
    return new Promise(async (resolve, reject) => {
      try {
        const {data} = await Axios.put(`${endpoint}/${id ? id : ''}`, body);
        resolve(data);
      } catch(err) {
        reject(err);
      }
    });
  }

  const post = body => {
    return new Promise(async (resolve, reject) => {
      try {
        const {data} = await Axios.post(endpoint, body);
        resolve(data);
      } catch(err) {
        reject(err);
      }
    })
  }

  const del = id => {
    return new Promise(async (resolve, reject) => {
      try {
        const {data} = await Axios.delete(`${endpoint}/${id}`);
        resolve(data);
      } catch(err) {
        reject(err);
      }
    });
  }

  return {
    get,
    put,
    post,
    delete: del,
  }
}