import { h, Component } from 'preact';
import style from './style.less';
import ReactMapboxGl, { Layer, Feature, Cluster, Marker } from "react-mapbox-gl";


export class SpotClusterMarker {
	render(props, state) {
		return <Marker coordinates={props.coordinates} className={style.clusterMarker}>

			<svg width="43px" height="53px" viewBox="0 0 43 53" version="1.1">
			    <title>sunset spot cluster</title>
			    <desc>Created with Sketch.</desc>
			    <defs>
			        <linearGradient x1="50%" y1="100%" x2="50%" y2="0%" id="linearGradient-1">
			            <stop stop-color="#7C5EA7" offset="0%"></stop>
			            <stop stop-color="#CF7EA4" offset="50.3308355%"></stop>
			            <stop stop-color="#E17F97" offset="69.8932539%"></stop>
			            <stop stop-color="#FD8185" stop-opacity="0.999983003" offset="100%"></stop>
			        </linearGradient>
			    </defs>
			    <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
			        <g id="sunset-spot-cluster">
			            <path d="M7.49735378,7.51572851 C3.84034411,11.0966148 1.75563838,15.9837687 1.70190991,21.1019272 C1.60008257,31.730937 11.7955448,43.6456115 17.2687642,50.621297 C18.0925674,51.6670989 19.34627,52.282712 20.6774497,52.2950845 C22.0086293,52.307457 23.2735561,51.7152528 24.1166527,50.6849438 C29.7298847,43.8365518 40.205372,32.1128176 40.3199278,21.5219959 C40.3776098,16.3972828 38.3945315,11.460107 34.808049,7.79933345 C31.2215665,4.13855985 26.3262905,2.05490175 21.2018451,2.00789756 C16.084069,1.95359504 11.1543634,3.9348422 7.49735378,7.51572851 Z" id="Shape-Copy-9" fill="url(#linearGradient-1)"></path>
			            <g id="Group-2" transform="translate(11.000000, 13.000000)">
			                <circle id="Oval-Copy-10" stroke="#9A7AC7" stroke-width="0.3" fill="#FFFFFF" cx="9.91079348" cy="9.85340778" r="9.00326414"></circle>
			                <text id="12" font-family="Helvetica" font-size="11" font-weight="normal" letter-spacing="-1.15999997" fill-opacity="0.889351223" fill="#F07E7E">
			                    <tspan x="3.4623242" y="14">{props.clusterSize}</tspan>
			                </text>
			            </g>
			        </g>
			    </g>
			</svg>

		</Marker>;
	}
}

export class SpotMarker extends Component {
	onClick = () => {
		this.props.onClick({ coordinates: this.props.coordinates })
	}

	render(props, state) {
		return <Marker
	        coordinates={props.coordinates}
	        className={style.marker}
	        onClick={this.onClick}>
	        <img src='/assets/sunset-spot.svg'/>
	      </Marker>
	}
}



