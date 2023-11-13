import axios from 'axios';

export const config = () => {
	return {
			authorization: "Bearer " + localStorage?.getItem('jwt'),
	};
};

export const authApiRequest = ({method, endpoint, headers, params, data, setCookie = false}) => {
    return new Promise((resolve, reject) => {
        axios({
          method,
          url: endpoint,
          headers: headers,
          params,
          data,
          withCredentials: true // Include cookies in the request
        })
          .then((resp) => {
            if(resp.data && !resp.data.error){
                resolve(resp.data);          
            }
            else {
                if (resp.status >= 500 && resp.status <= 599) {
                reject("Something went wrong.");
                }
                // if (error.code === 0) {
                //   resolve(data);
                // } else {
                //   reject(error.message || "Request Failed");
                // }
                if(resp.data.error){
                    reject(resp.data.error || "Request Failed");
                }
            }
          })
          .catch((err) => {
            if (err.status >= 500 && err.status <= 599) {
              reject("Something went wrong.");
            }
            const errorResponse = (err && err.response) || {};
            // if (errorResponse.status === 401) {
            //   localStorage.clear();
            //   sessionStorage.clear();
            //   window.location.reload();
            //   reject(errorResponse.statusText || errorResponse || "Failed Request");
            // }
            // if (errorResponse.data && errorResponse.data.message) {
            //   reject(errorResponse.data.message);
            // } else {
            //   reject(errorResponse.statusText);
            // }
            // else {
                reject(/*errorResponse.statusText || errorResponse.data.message || errorResponse ||*/ "Failed Request");
            // }
          });
      });
}

export const apiRequest = ({method, endpoint, headers, params, data, setCookie = false}) => {
    return new Promise((resolve, reject) => {
        axios({
          method,
          url: endpoint,
          headers: headers,
          params,
          data,
          withCredentials: true // Include cookies in the request
        })
          .then((resp) => {
            if(resp.data && !resp.data.error){
                resolve(resp.data);          
            }
            else {
                if (resp.status >= 500 && resp.status <= 599) {
                reject("Something went wrong.");
                }
                // if (error.code === 0) {
                //   resolve(data);
                // } else {
                //   reject(error.message || "Request Failed");
                // }
                if(resp.data.error){
                    reject(resp.data.error || "Request Failed");
                }
            }
          })
          .catch((err) => {
            if (err.status >= 500 && err.status <= 599) {
              reject("Something went wrong.");
            }
            const errorResponse = (err && err.response) || {};
            if (errorResponse.status === 401) {
              localStorage.clear();
              sessionStorage.clear();
              window.location.reload();
              reject(errorResponse.statusText || errorResponse || "Failed Request");
            }
            // if (errorResponse.data && errorResponse.data.message) {
            //   reject(errorResponse.data.message);
            // } else {
            //   reject(errorResponse.statusText);
            // }
            else {
                reject(/*errorResponse.statusText || errorResponse.data.message || errorResponse ||*/ "Failed Request");
            }
          });
      });
}
