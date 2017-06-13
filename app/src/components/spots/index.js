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

import { onlyTruthyStyles } from '../util';


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

class ActionMenu extends Component {
	addSpot() {

	}

	render(props, state) {
		let styles = {
			[style.actionMenu]: true,
			[style.actionMenuHidden]: props.hidden
		};

		return <div>
			<div class={onlyTruthyStyles(styles)}>
				<div onClick={this.addSpot}>Add spot</div>
			</div>
		</div>;
	}
}

class Header extends Component {
	state = {
		sunsetTime: sunsetTime,
		actionMenuShown: false
	}

	toggleActionMenu = () => {
		this.setState({ actionMenuShown: !this.state.actionMenuShown })
	}

	render(props, state) {
		return <div>
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
						<div onClick={this.toggleActionMenu} class={style.actionMenuDotsCtn + (state.actionMenuShown ? ' '+style.actionMenuActive : '' )}><img class={style.actionMenuDots} src='/assets/action-menu.svg'/></div>
					</div>
				</div>
			</div>

			<ActionMenu hidden={!state.actionMenuShown}/>
		</div>;
	}
}



class Map extends Component {
	map = null;

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

		map.addControl(new mapbox.NavigationControl(), 'bottom-right');
		map.addControl(new mapbox.GeolocateControl(), 'bottom-right');
		
		var directions = new MapboxDirections({
		  accessToken: 'pk.eyJ1IjoibGlhbXplYmVkZWUiLCJhIjoiY2oyaWFmdXpxMDFlMTJwcjd4cTdieDdyMiJ9.K8da3SqjRr8_XDRxbrT1zQ',
		});
		directions.setOrigin([151.2093, -33.8688])
		directions.setDestination([151.28498,-33.88040]);
		// map.addControl(directions, 'bottom-left')
		// map.addControl(new MapboxDirections({
		//     accessToken: 'pk.eyJ1IjoibGlhbXplYmVkZWUiLCJhIjoiY2oyaWFmdXpxMDFlMTJwcjd4cTdieDdyMiJ9.K8da3SqjRr8_XDRxbrT1zQ',
		// }), 'bottom-left');
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

					{/*
					<Source id="cloud-layer-src" tileJsonSource={CLOUD_RASTER_SOURCE_OPTIONS} />
					<Layer type="raster" id="cloud-layer" sourceId="cloud-layer-src" />
					*/}

					<Cluster ClusterMarkerFactory={this.clusterMarker} clusterThreshold={5} radius={60} extent={256} minZoom={10} maxZoom={16} nodeSize={128}>
					  {
					    props.spots.map((spot, key) => <SpotMarker key={key} id={spot.id} coordinates={[spot.lng, spot.lat]} onClick={this.goToSpot}/> )
					  }
					</Cluster>


					{state.selectedSpot && <SpotPopup directionsToSpot={this.directionsToSpot} zoom={state.zoom} spot={state.selectedSpot}/> }

			</ReactMapboxGl>;
	}
}

let genId_id = 0
function genId() {
	genId_id++;
	return genId_id;
}

let spots = [];

let goodSpots = [{lat: -33.80126, lng:151.17115},
{lat: -33.80306, lng:151.09539},
{lat: -33.80306, lng:151.23609},
{lat: -33.80396, lng:151.23609},
{lat: -33.80486, lng:151.27181},
{lat: -33.80576, lng:151.25449},
{lat: -33.80755, lng:151.13436},
{lat: -33.80755, lng:151.22527},
{lat: -33.80845, lng:151.28805},
{lat: -33.81025, lng:151.08349},
{lat: -33.81025, lng:151.08457},
{lat: -33.81025, lng:151.08674},
{lat: -33.81205, lng:151.27291},
{lat: -33.81295, lng:151.12246},
{lat: -33.81295, lng:151.26100},
{lat: -33.81385, lng:151.23827},
{lat: -33.81385, lng:151.26101},
{lat: -33.81565, lng:151.26209},
{lat: -33.81655, lng:151.09107},
{lat: -33.81655, lng:151.14086},
{lat: -33.81655, lng:151.21122},
{lat: -33.81655, lng:151.26209},
{lat: -33.81745, lng:151.14627},
{lat: -33.81745, lng:151.21122},
{lat: -33.81835, lng:151.21447},
{lat: -33.81925, lng:151.23179},
{lat: -33.81925, lng:151.24153},
{lat: -33.82014, lng:151.22097},
{lat: -33.82104, lng:151.29025},
{lat: -33.82104, lng:151.29241},
{lat: -33.82284, lng:151.17009},
{lat: -33.82464, lng:151.15386},
{lat: -33.82644, lng:151.15494},
{lat: -33.82734, lng:151.18201},
{lat: -33.82734, lng:151.26320},
{lat: -33.82734, lng:151.26428},
{lat: -33.82824, lng:151.14953},
{lat: -33.82914, lng:151.18309},
{lat: -33.83094, lng:151.17768},
{lat: -33.83184, lng:151.18309},
{lat: -33.83274, lng:151.19067},
{lat: -33.83363, lng:151.18310},
{lat: -33.83453, lng:151.19068},
{lat: -33.83453, lng:151.28054},
{lat: -33.83543, lng:151.18526},
{lat: -33.83543, lng:151.28054},
{lat: -33.83633, lng:151.11597},
{lat: -33.83633, lng:151.28379},
{lat: -33.83723, lng:151.23399},
{lat: -33.83813, lng:151.28380},
{lat: -33.83993, lng:151.28488},
{lat: -33.84083, lng:151.16253},
{lat: -33.84083, lng:151.18094},
{lat: -33.84083, lng:151.23291},
{lat: -33.84083, lng:151.28597},
{lat: -33.84173, lng:151.28705},
{lat: -33.84263, lng:151.13438},
{lat: -33.84263, lng:151.18636},
{lat: -33.84263, lng:151.22750},
{lat: -33.84263, lng:151.28705},
{lat: -33.84353, lng:151.16037},
{lat: -33.84353, lng:151.19502},
{lat: -33.84353, lng:151.21776},
{lat: -33.84353, lng:151.22750},
{lat: -33.84353, lng:151.23400},
{lat: -33.84443, lng:151.28706},
{lat: -33.84533, lng:151.20152},
{lat: -33.84533, lng:151.28706},
{lat: -33.84622, lng:151.22426},
{lat: -33.84622, lng:151.28815},
{lat: -33.84712, lng:151.28815},
{lat: -33.84802, lng:151.17445},
{lat: -33.84892, lng:151.24592},
{lat: -33.84982, lng:151.24484},
{lat: -33.84982, lng:151.28924},
{lat: -33.85072, lng:151.24484},
{lat: -33.85072, lng:151.28924},
{lat: -33.85162, lng:151.26542},
{lat: -33.85162, lng:151.28816},
{lat: -33.85162, lng:151.28924},
{lat: -33.85252, lng:151.24593},
{lat: -33.85342, lng:151.28816},
{lat: -33.85432, lng:151.28817},
{lat: -33.85522, lng:151.28817},
{lat: -33.85612, lng:151.20912},
{lat: -33.85702, lng:151.21020},
{lat: -33.85792, lng:151.20804},
{lat: -33.85792, lng:151.21453},
{lat: -33.85882, lng:151.21453},
{lat: -33.85971, lng:151.28710},
{lat: -33.86151, lng:151.20263},
{lat: -33.86151, lng:151.22212},
{lat: -33.86241, lng:151.20263},
{lat: -33.86241, lng:151.20479},
{lat: -33.86421, lng:151.28494},
{lat: -33.86511, lng:151.19180},
{lat: -33.86601, lng:151.25029},
{lat: -33.86691, lng:151.25029},
{lat: -33.86781, lng:151.19289},
{lat: -33.86781, lng:151.25029},
{lat: -33.86871, lng:151.18097},
{lat: -33.86871, lng:151.25029},
{lat: -33.86871, lng:151.28604},
{lat: -33.86961, lng:151.18856},
{lat: -33.86961, lng:151.25138},
{lat: -33.87051, lng:151.22538},
{lat: -33.87051, lng:151.23730},
{lat: -33.87141, lng:151.22322},
{lat: -33.87320, lng:151.11599},
{lat: -33.87320, lng:151.28605},
{lat: -33.87410, lng:151.22864},
{lat: -33.87410, lng:151.23622},
{lat: -33.87410, lng:151.28605},
{lat: -33.87500, lng:151.11599},
{lat: -33.87500, lng:151.28605},
{lat: -33.87950, lng:151.28498},
{lat: -33.88040, lng:151.28498},
{lat: -33.88130, lng:151.28498},
{lat: -33.88310, lng:151.28607},
{lat: -33.88400, lng:151.23732},
{lat: -33.88400, lng:151.28607},
{lat: -33.88490, lng:151.17991},
{lat: -33.88579, lng:151.28716},
{lat: -33.88669, lng:151.28716},
{lat: -33.88759, lng:151.28717},
{lat: -33.88939, lng:151.28717},
{lat: -33.89029, lng:151.28717},
{lat: -33.89119, lng:151.28717},
{lat: -33.89839, lng:151.12467},
{lat: -33.89839, lng:151.26877},
{lat: -33.89928, lng:151.27744},
{lat: -33.90288, lng:151.26662},
{lat: -33.90648, lng:151.27096},
{lat: -33.90738, lng:151.27204},
{lat: -33.91098, lng:151.27205},
{lat: -33.91188, lng:151.27205},
{lat: -33.91367, lng:151.27314},
{lat: -33.91457, lng:151.25255},
{lat: -33.91817, lng:151.26448},
{lat: -33.92537, lng:151.14528},
{lat: -33.92537, lng:151.14636},
{lat: -33.92986, lng:151.13553},
{lat: -33.93256, lng:151.14095},
{lat: -33.93616, lng:151.12578},
{lat: -33.94155, lng:151.26670},
{lat: -33.95324, lng:151.09109},
{lat: -33.95414, lng:151.09109},
{lat: -33.95954, lng:151.26783},
{lat: -33.96044, lng:151.26241},
{lat: -33.96224, lng:151.25374},
{lat: -33.96224, lng:151.25482},
{lat: -33.96314, lng:151.13338},
{lat: -33.96583, lng:151.25266},
{lat: -33.96763, lng:151.25375},
{lat: -33.97033, lng:151.13447},
{lat: -33.97123, lng:151.13230},
{lat: -33.97213, lng:151.12797},
{lat: -33.97213, lng:151.12905},
{lat: -33.97213, lng:151.13013},
{lat: -33.97393, lng:151.22448},
{lat: -33.97483, lng:151.24943},
{lat: -33.97932, lng:151.12038},
{lat: -33.97932, lng:151.12146},
{lat: -33.97932, lng:151.12255},
{lat: -33.98022, lng:151.24835}];



	for (let i = 0; i < goodSpots.length; i += 2) {
		let spot = { id: genId(), lat: goodSpots[i].lat, lng: goodSpots[i].lng };
		spots.push(spot);
	}


export default class SearchSpots extends Component {
	state = {
		spots: spots
	}

	componentDidMount() {
		// navigator.geolocation.getCurrentPosition(showPosition);
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

