import { h, Component } from 'preact';

import mapbox from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

import SunCalc from 'suncalc';
import moment from 'moment';


import style from './style.less';

const SYDNEY_LNGLAT = [151.2093, -33.8688];

class UIOverlay extends Component {
	render(props) {
		return <div class={style.uiOverlay}>{props.children}</div>;
	}
}

// https://www.npmjs.com/package/suncalc#sun-position
// https://en.wikipedia.org/wiki/Azimuth
let times = SunCalc.getTimes(new Date, SYDNEY_LNGLAT[1], SYDNEY_LNGLAT[0]);
let sunsetTime_date = times.sunsetStart;
let sunsetTime = moment(sunsetTime_date).format('h:mm a')

class Header extends Component {
	state = {
		sunsetTime: sunsetTime
	}

	render(props, state) {
		return <div class={style.header}>
			<div class={style.headerLeft}>
				<div class={style.appInfo}>
					<span class={style.appInfo_title}>Sydney Sunsets</span>
					<span class={style.appInfo_beta}>Beta</span>
				</div>
			</div>

			<div class={style.headerRight}>
				<img class={style.sunsetAt_icon} src='/assets/sunset-icon.png'/>
				<div class={style.sunsetAt}>
					<span class={style.sunsetAt_label}>Sunset at</span><br/>
					<span class={style.sunsetAt_time}>{state.sunsetTime}</span>
				</div>
			</div>
		</div>;
	}
}



export default class SearchSpots extends Component {
	state = {
		spots: [
			{lng: 151.21468936436338, lat: -33.85667594669833},
			{lng: 151.21023865813532, lat: -33.855094719359485},
			{lng: 151.21774482209128, lat: -33.8519681430416},
			{lng: 151.20358974060105, lat: -33.84992948155219},
			{lng: 151.2232737923265, lat: -33.84579485048061},
			{lng: 151.1951994855155, lat: -33.86305317723418}
		]
	}

	finishSetupMapbox = (map, event) => {
		map.addControl(new mapbox.NavigationControl(), 'bottom-right');
		map.addControl(new mapbox.GeolocateControl(), 'bottom-right');
	}

	render(props, state) {
		return (
			<div>
				<UIOverlay>
					<Header/>
				</UIOverlay>

				<ReactMapboxGl
				  style="mapbox://styles/mapbox/streets-v9"
				  accessToken='pk.eyJ1IjoibGlhbXplYmVkZWUiLCJhIjoiY2oyaWFmdXpxMDFlMTJwcjd4cTdieDdyMiJ9.K8da3SqjRr8_XDRxbrT1zQ'
				  containerStyle={{
				    height: "100vh",
				    // width: "100%",
				  }}
				  center={SYDNEY_LNGLAT}
				  zoom={[13]}
				  onStyleLoad={this.finishSetupMapbox}
				  >

				  <Layer
		            type="symbol"
		            id="spots"
		            layout={{ "icon-image": "marker" }}>
		            {
		              state.spots
		                .map((spot, index) => (
		                  <Feature
		                    key={spot.id}
		                    coordinates={[spot.lat, spot.lng]}/>
		                ))
		            }
		          </Layer>

				</ReactMapboxGl>
			</div>
		);
	}
}







/*onMouseEnter={this._onToggleHover.bind(this, "pointer")}
		                    onMouseLeave={this._onToggleHover.bind(this, "")}
		                    onClick={this._markerClick.bind(this, spot)}*/

// map.addSource('clouds', {
		    //     type: 'raster',
		    //     tiles: ['http://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=01458f9ac1bb039bc50511ad57522f92'],
		    //     tileSize: 256
		    // });
		    
		    // map.addLayer({
		    //     'id': 'cloud-layer',
		    //     'type': 'raster',
		    //     // 'type': 'fill',
		    //     'source': 'clouds',
		    //     "paint": {
		    //     	"raster-opacity": 0.5,
		    //     	// "raster-contrast": 1,
		    //     	// "raster-saturation": 1,
		    //     	// "raster-brightness-min": 0.5,
		    //     	// "raster-brightness-max": 0.5

			   //      // "property": "cloudCover",
			   //      // "type": "interval",
		    //     	// "fill-color": {
		    //     	// 	"stops": [
		    //     	// 	]
		    //     	// }
		    //     }
		    // });



	// var sunsetSpotsLayer = {
	// 			id: 'sunsetSpots',
	// 			type: 'symbol',
	// 			source: "sunsetSpots",
	// 		};
	// 		var sunsetSpotsSource = {
	// 	       type: "FeatureCollection",
	// 	       features: []
	// 		}

	// 		function addSpot(lngLat) {
	// 			let spot = {
	// 		      "type": "Feature",
	// 		      "properties": {
	// 		      	"name": "Null Island"
	// 		      },
	// 		      "geometry": {
	// 		          "type": "Point",
	// 		          "coordinates": lngLat
	// 		      }
	// 		  	};

	// 		  	sunsetSpotsSource.features.push(spot);

	// 		  	map.getSource('sunsetSpots').setData(sunsetSpotsSource);

	// 		  	var el = document.createElement('div');
	// 		    el.className = 'sunset-spot';
	// 		    el.style.backgroundImage = 'url(/assets/Sunset/v3.svg)';
	// 		    el.style.backgroundSize = 'cover';
	// 		    var heightWidth = 32;
	// 		    el.style.height = heightWidth+'px';
	// 		    el.style.width = heightWidth+'px';

	// 		    el.addEventListener('click', function(e) {
	// 				map.flyTo({center: lngLat});
	// 		    });

	// 	        let marker = new mapboxgl.Marker(el, {offset: [-heightWidth / 2, -heightWidth / 2]}).setLngLat(lngLat);
	// 		    marker.addTo(map);
	// 		}



	// 		map.addSource('sunsetSpots', {
	// 			type: 'geojson',
	// 			data: sunsetSpotsSource
	// 		});
	// 		map.addLayer(sunsetSpotsLayer)

	// 		var testingSpots = API.getSpots();
	// 		testingSpots.map(addSpot);

	// 		// console.log(JSON.stringify(map.getBounds(), null, 1))

	// 		map.on('click', function (e) {
	// 			// console.log(e.lngLat)
	// 		    // addSpot(e.lngLat)
	// 	    });