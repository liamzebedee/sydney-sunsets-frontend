// localhost:8000/spec/ui/?format=openapi
import spec from './swagger.json';

import Swagger from 'swagger-client';

var _api = null;

function API() {
	if(_api !== null) {
		return new Promise((resolve, reject) => {
			resolve(_api);
		})
	} else {
		return new Promise((resolve, reject) => {
			Swagger({ spec }).then(swagger => {
				_api = swagger.apis;
				resolve(_api)
			})
		})
	}
}


export default API;