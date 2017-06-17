// localhost:8000/spec/ui/?format=openapi
import spec from './swagger.json';
import Swagger from 'swagger-client';

var _api = null;

const ENABLE_PROD_API = true;
if (process.env.NODE_ENV === 'production' || ENABLE_PROD_API) {
	spec.host = 'api.sydneysunsets.com';
	spec.schemes = ['https'];
}


function API() {
	if(_api !== null) {
		return new Promise((resolve, reject) => {
			resolve(_api);
		})
	} else {
		return new Promise((resolve, reject) => {
			Swagger({ spec }).then(swagger => {
				_api = swagger.apis;
				console.log("API created!")
				console.log(_api)
				resolve(_api)
			})
		})
	}
}


export default API;