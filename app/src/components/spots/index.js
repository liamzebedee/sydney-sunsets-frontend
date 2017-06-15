import { h, Component } from 'preact';

import mapbox from 'mapbox-gl/dist/mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import ReactMapboxGl, { Source, Layer, Cluster, ZoomControl } from "react-mapbox-gl";

import SunCalc from 'suncalc';
// import moment from 'moment';


import style from './style.less';
import stylePopup from './style-popup.less';

import { SpotMarker, SpotClusterMarker } from './marker';
import { SpotPopup } from './popup';

import { onlyTruthyStyles } from '../util';
import API from '../api';


import MapboxDirections from 'mapbox-gl-directions/dist/mapbox-gl-directions';
import 'mapbox-gl-directions/dist/mapbox-gl-directions.css';


// API design.
// NFRs:
// - first-party JSON
// - simple auto-gen'd JS interface
// - security
// - 3rd party consumers
// FRs:
// - list of spots
// - get the weather info
// 
// Later:
// - API keys
// - authentication


const SYDNEY_LNGLAT = [151.2093, -33.8688];
const SYDNEY_MAP_BOUNDS = [
    [151.56628473073772, -34.10088328968252],
    [150.87186147761867, -33.70941832265211]
];

const WaitingForDrop = (props, state) => {
	return <div class={style.waitingForDrop}>
		<img src='/assets/sunset-spot.svg' width='19' height='24.18'/>
		<span>I'm waiting for the drop</span>
	</div>;
}

class UIAlert extends Component {
	render(props, state) {
		let styles = {
			[style.uiAlertCtn]: true,
			[style.uiAlertShown]: props.shown,
			[style.uiAlertHidden]: !props.shown
		}

		return <div class={onlyTruthyStyles(styles)}>
			<div class={style.uiAlert}>{props.children}</div>
		</div>
	}
}

// https://www.npmjs.com/package/suncalc#sun-position
// https://en.wikipedia.org/wiki/Azimuth
let times = SunCalc.getTimes(new Date, SYDNEY_LNGLAT[1], SYDNEY_LNGLAT[0]);
let sunsetTime_date = times.sunsetStart;
let sunsetTime = `${(sunsetTime_date.getHours() % 12)}:${sunsetTime_date.getMinutes()} pm`;
// let sunsetTime = moment(sunsetTime_date).format('h:mm a')

class ActionMenu extends Component {
	addSpot() {

	}

	render(props, state) {
		let actionMenuStyles = {
			[style.actionMenu]: true,
			[style.actionMenuHidden]: props.hidden
		};

		return <div>
			<div class={onlyTruthyStyles(actionMenuStyles)}>
				{props.children}
			</div>
		</div>;
	}
}

class UIOverlay extends Component {
	state = {
		sunsetTime: sunsetTime,
		actionMenuShown: false,
		addingSpot: false
	}

	componentDidMount() {
	}

	toggleActionMenu = () => {
		this.setState({ actionMenuShown: !this.state.actionMenuShown })
	}

	addSpot = () => {
		this.setState({ actionMenuShown: false, addingSpot: true })
	}

	sayHi = () => {
		this.setState({ actionMenuShown: false })
	}

	render(props, state) {
		return <div class={style.uiOverlay}>
			<div class={style.headerCtn}>
				<div class={style.header}>
					<div class={style.headerLeft}>
						<div class={style.appInfo}>
							<span class={style.appInfo_title}>Sydney Sunsets</span>
							<span class={style.appInfo_beta}>Beta</span>
						</div>
					</div>

					<div class={style.headerCenter}>
						<span class={style.sunsetAt_label}>Sunset at {state.sunsetTime}</span>
					</div>

					<div class={style.headerRight}>
						<img class={style.personProfile} src='/assets/person-profile.png'/>
						<div onMouseEnter={this.toggleActionMenu} class={style.actionMenuDotsCtn + (state.actionMenuShown ? ' '+style.actionMenuActive : '' )}><img class={style.actionMenuDots} src='/assets/action-menu.svg'/></div>
					</div>
				</div>
			</div>

			<ActionMenu hidden={!state.actionMenuShown}>
				<div class={style.actionMenuItem} onClick={this.addSpot}>
					<img src='/assets/plus.svg'/> Add spot
				</div>
				<div class={style.actionMenuItem} onClick={this.sayHi}>
					<img src='/assets/chat.png'/> Say hi
				</div>
			</ActionMenu>

			<UIAlert shown={state.addingSpot}>
				<WaitingForDrop/>
			</UIAlert>
		</div>;
	}
}



class Map extends Component {
	map = null;
	directions = null;

	state = {
		selectedSpots: {},
		center: SYDNEY_LNGLAT,
		spotSelected: false
	};

	clusterMarker = (coordinates, clusterSize) => {
		// if(clusterSize == 1) {
			// return <SpotMarker coordinates={coordinates} onClick={this.goToSpotFromCoords}/>;
		// }

		return <SpotClusterMarker coordinates={coordinates} clusterSize={clusterSize} onClick={this.goToSpotCluster}/>;
	}


	finishSetupMapbox = (map, event) => {
		this.map = map;

		// Only set initial zoom.
		map.setZoom(13)

		map.dragRotate.disable();
		map.touchZoomRotate.disableRotation();

		// map.addControl(new mapbox.NavigationControl(), 'bottom-right');
		
		// var directions = new MapboxDirections({
		//   accessToken: 'pk.eyJ1IjoibGlhbXplYmVkZWUiLCJhIjoiY2oyaWFmdXpxMDFlMTJwcjd4cTdieDdyMiJ9.K8da3SqjRr8_XDRxbrT1zQ',
		//   profile: 'walking',
		//   proximity: SYDNEY_LNGLAT
		// });
		// map.addControl(directions, 'bottom-left')
	}

	goToSpotCluster = (spotCluster) => {
		this.map.flyTo({ 
			center: spotCluster.coordinates,
			zoom: this.map.getZoom() + 1
		});
	}

	directionsToSpot = (coordinates) => {
        
	}

	goToSpotFromCoords = ({ coordinates }) => {

	}

	// TODO: rename goToSpot as onSpotClick
	// this is the intention, but this is what it does during the method
	// vs reading the code top-to-bottom and understanding it this way
	goToSpot = (spot) => {
		if(this.state.selectedSpot && 
			this.state.selectedSpot.id == spot.id) 
		{
			this.setState({ selectedSpot: null })
			return;
		}

		const MARKER_HEIGHT = 40;
		const POPUP_HEIGHT = 360;

		let { x, y } = this.map.project(spot.coordinates);
		y -= POPUP_HEIGHT / 2;
		let centerOffsetForPopup = this.map.unproject({ x, y })

		this.map.flyTo({ center: centerOffsetForPopup });

		// let selectedSpots = this.state.selectedSpots;
		// selectedSpots[spot.coordinates.x] = spot;

		this.setState({ selectedSpot: spot });
	}

	onClick = (map, event) => {
		console.log(event.lngLat);
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

		let cluster;
		if(props.spots.length > 2) {
			cluster = <Cluster ClusterMarkerFactory={this.clusterMarker} clusterThreshold={5} radius={60} extent={256} minZoom={10} maxZoom={16} nodeSize={128}>
					  { 
					  	props.spots.map((spot, key) => <SpotMarker key={key} {...spot} coordinates={[spot.lng, spot.lat]} onClick={this.goToSpot}/>)
					  }
					</Cluster>;
		}

		return <ReactMapboxGl
				style="mapbox://styles/mapbox/streets-v9"
				accessToken='pk.eyJ1IjoibGlhbXplYmVkZWUiLCJhIjoiY2oyaWFmdXpxMDFlMTJwcjd4cTdieDdyMiJ9.K8da3SqjRr8_XDRxbrT1zQ'
				containerStyle={{
					height: "100vh",
					width: "100vw"
				}}
				center={state.center}
				onStyleLoad={this.finishSetupMapbox}
				onClick={this.onClick}
				onZoom={this.onZoom}
				hash={true}
				movingMethod='easeTo'
				>

					<ZoomControl position='bottomRight'/>

					{/*
					<Source id="cloud-layer-src" tileJsonSource={CLOUD_RASTER_SOURCE_OPTIONS} />
					<Layer type="raster" id="cloud-layer" sourceId="cloud-layer-src" />
					*/}

					{ cluster }


					{state.selectedSpot && <SpotPopup directionsToSpot={this.directionsToSpot} zoom={state.zoom} spot={state.selectedSpot}/> }

					{props.children}

			</ReactMapboxGl>;
	}
}


export default class SearchSpots extends Component {
	state = {
		spots: []
	}

	addSpots = (more) => {
		this.setState({ spots: this.state.spots.concat(more) })
	}

	componentDidMount() {
		// navigator.geolocation.getCurrentPosition(showPosition);
		API().then(api => {
			api.spots.tagged_read({ tag_name: 'machine-learning-1' }).then(res => {
				this.addSpots(res.obj)
			})
			api.spots.tagged_read({ tag_name: 'manual-basic-spots-1' }).then(res => {
				this.addSpots(res.obj)
			})
		})
	}

	render(props, state) {
		return (
			<div>
				<Map spots={state.spots}>
					<UIOverlay/>
				</Map>
			</div>
		);
	}
}

export class SearchSpotsList extends Component {
	state = {
		spots: []
	}

	addSpots = (more) => {
		this.setState({ spots: this.state.spots.concat(more) })
	}

	componentDidMount() {
		API().then(api => {
			api.spots.tagged_read({ tag_name: this.props.list_id }).then(res => {
				this.addSpots(res.obj)
			})
		})
	}

	render(props, state) {
		return (
			<div>
				<Map spots={state.spots}>
					<UIOverlay/>
				</Map>
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

