import { h, Component } from 'preact';

import mapbox from 'mapbox-gl/dist/mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import ReactMapboxGl, { Source, Layer, Feature, Cluster, Marker, Popup } from "react-mapbox-gl";

import SunCalc from 'suncalc';
import moment from 'moment';


import style from './style.less';
import stylePopup from './style-popup.less';

import { SpotMarker, SpotClusterMarker } from './marker';
import { SpotPopup } from './popup';

const SYDNEY_LNGLAT = [151.2093, -33.8688];
const SYDNEY_MAP_BOUNDS = [
    [151.56628473073772, -34.10088328968252],
    [150.87186147761867, -33.70941832265211]
];

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



class Map extends Component {
	map = null;

	state = {
		selectedSpot: null,
		center: SYDNEY_LNGLAT
	};

	clusterMarker = (coordinates, clusterSize) => {
		if(clusterSize == 1) {
			return <SpotMarker coordinates={coordinates}  onClick={this.goToSpot}/>;
		}

		return <SpotClusterMarker coordinates={coordinates} clusterSize={clusterSize} onClick={this.goToSpotCluster}/>;
	}


	finishSetupMapbox = (map, event) => {
		this.map = map;

		// Only set initial zoom.
		map.setZoom(13)
		
		map.dragRotate.disable();
		map.touchZoomRotate.disableRotation();

		map.addControl(new mapbox.NavigationControl(), 'bottom-right');
		map.addControl(new mapbox.GeolocateControl(), 'bottom-right');
	}

	goToSpotCluster = (spotCluster) => {
		this.setState({
			center: spotCluster.coordinates,
		})
	}

	goToSpot = (spot) => {
		let { x, y } = this.map.project(spot.coordinates);
		y -= 200;
		let centerOffsetForPopup = this.map.unproject({ x, y })

		this.setState({
			center: centerOffsetForPopup,
			selectedSpot: spot,
		});
	}

	onZoom = (map, event) => {
		this.setState({ zoom: map.getZoom() })
	}

	render(props, state) {
		const CLOUD_RASTER_SOURCE_OPTIONS = {
			type: 'raster',
	        tiles: ['http://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=01458f9ac1bb039bc50511ad57522f92'],
	        tileSize: 256
		};

		return <ReactMapboxGl
				style="mapbox://styles/mapbox/streets-v9"
				accessToken='pk.eyJ1IjoibGlhbXplYmVkZWUiLCJhIjoiY2oyaWFmdXpxMDFlMTJwcjd4cTdieDdyMiJ9.K8da3SqjRr8_XDRxbrT1zQ'
				containerStyle={{
					height: "100vh",
				}}
				center={state.center}
				onStyleLoad={this.finishSetupMapbox}
				onClick={(map, ev) => console.log(ev.lngLat)}
				onZoom={this.onZoom}
				hash={true}
				>

					{/*
					<Source id="cloud-layer-src" tileJsonSource={CLOUD_RASTER_SOURCE_OPTIONS} />
					<Layer type="raster" id="cloud-layer" sourceId="cloud-layer-src" />
					*/}

					<Cluster ClusterMarkerFactory={this.clusterMarker} clusterThreshold={1} radius={60} extent={256} minZoom={-1} maxZoom={16} nodeSize={128}>
					  {
					    props.spots.map((spot, key) => <SpotMarker key={key} coordinates={[spot.lng, spot.lat]} onClick={this.goToSpot}/> )
					  }
					</Cluster>


					{ state.selectedSpot && <SpotPopup zoom={state.zoom} spot={state.selectedSpot}/> }

			</ReactMapboxGl>;
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
			{lng: 151.1951994855155, lat: -33.86305317723418},

			{lng: 151.22200294190964, lat: -33.86113849852298},
			{lng: 151.2170247619879, lat: -33.86270648966041},
			{lng: 151.20912833864173, lat: -33.86142358996236},
			{lng: 151.20603843386277, lat: -33.85857263273653},
			{lng: 151.21032996827807, lat: -33.86249267438258},
			{lng: 151.20827003175867, lat: -33.86377555801812},
			{lng: 151.20406432800985, lat: -33.86520096167287},
			{lng: 151.2041501586981, lat: -33.86798043037041},
			{lng: 151.20792670900545, lat: -33.86847929978546},
			{lng: 151.2135057037454, lat: -33.87361035884434},
			{lng: 151.2151364868232, lat: -33.870546013447864},
			{lng: 151.2106732910313, lat: -33.86940576382178},
			{lng: 151.2272386138963, lat: -33.87118739716909}

		]
	}

	render(props, state) {
		return (
			<div>
				<UIOverlay>
					<Header/>
					
				</UIOverlay>

				<Map spots={state.spots}/>
			</div>
		);
	}
}





		    
		 //    map.addLayer({
		 //        'id': 'cloud-layer',
		 //        'type': 'raster',
		 //        // 'type': 'fill',
		 //        'source': 'clouds',
		 //        "paint": {
		 //        	"raster-opacity": 0.5,
		 //        	// "raster-contrast": 1,
		 //        	// "raster-saturation": 1,
		 //        	// "raster-brightness-min": 0.5,
		 //        	// "raster-brightness-max": 0.5

			//         // "property": "cloudCover",
			//         // "type": "interval",
		 //        	// "fill-color": {
		 //        	// 	"stops": [
		 //        	// 	]
		 //        	// }
		 //        }
		 //    });

