import { h, Component } from 'preact';
import style from './style.less';
import ReactMapboxGl, { Layer, Feature, Cluster, Marker } from "react-mapbox-gl";


export class SpotClusterMarker {
    onClick = () => {
        this.props.onClick({ coordinates: this.props.coordinates })
    }

	render(props, state) {
		return <Marker coordinates={props.coordinates} className={style.clusterMarker} onClick={this.onClick}>



<svg width="43px" height="53px" viewBox="0 0 43 53" version="1.1" >
    
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
            <g id="Group-2" transform="translate(12.000000, 14.000000)">
                <circle id="Oval-Copy-10" stroke="#9A7AC7" stroke-width="0.3" fill="#FFFFFF" cx="9.00326414" cy="9.00326414" r="9.00326414"></circle>
                <text id="12" font-family="Helvetica-Bold, Helvetica" font-size="13.5" font-weight="bold" letter-spacing="-1.62" fill="#6E588F">
                    <tspan x="1.80194336" y="14">{props.clusterSize}</tspan>
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
	        
            

<svg width="44px" height="37px" viewBox="0 0 44 37" version="1.1" >
    
    <desc>Created with Sketch.</desc>
    <defs>
        <linearGradient x1="50%" y1="100%" x2="50%" y2="0%" id="linearGradient-1">
            <stop stop-color="#7C5EA7" offset="0%"></stop>
            <stop stop-color="#CF7EA4" offset="50.3308355%"></stop>
            <stop stop-color="#E17F97" offset="69.8932539%"></stop>
            <stop stop-color="#FD8185" stop-opacity="0.999983003" offset="100%"></stop>
        </linearGradient>
    </defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Desktop" transform="translate(-1187.000000, -162.000000)">
            <g id="Group-4" transform="translate(277.000000, 160.000000)">
                <path d="M910.298075,15.3482055 C909.49159,17.1995852 910.336965,19.7263277 912.648202,22.3725036 C917.454539,27.8678842 929.745453,34.0279756 936.609353,37.6345249 C937.640574,38.1752224 938.762365,38.4935049 939.659384,38.4999017 C940.556403,38.5062985 941.131798,38.2001188 941.223822,37.6674313 C941.841681,34.126695 943.479401,28.0653231 938.699101,22.5896863 C936.387505,19.9401216 932.79544,17.3875169 928.715116,15.4948341 C924.634793,13.6021513 920.401387,12.5248642 916.948551,12.5005623 C913.496834,12.4724869 911.104561,13.4968257 910.298075,15.3482055 Z" id="Shape" fill-opacity="0.3" fill="#000000"></path>
                <g id="sunset-spot" transform="translate(924.000000, 0.000000)">
                    <path d="M5.93228701,6.02793694 C3.26272833,8.64173461 1.74092643,12.2090167 1.7017055,15.944916 C1.62737317,23.703353 9.06989783,32.4002358 13.0652606,37.4920005 C13.6666238,38.255363 14.5818067,38.7047177 15.5535466,38.7137488 C16.5252865,38.7227798 17.4486629,38.2905121 18.0641099,37.5384582 C22.1616797,32.5396089 29.8086182,23.9820993 29.8922421,16.2515368 C29.9343491,12.5108531 28.4867336,8.90705862 25.8686586,6.23494879 C23.2505836,3.56283897 19.6771103,2.04191364 15.9363469,2.00760386 C12.200452,1.9679668 8.6018457,3.41413927 5.93228701,6.02793694 Z" id="Shape-Copy-9" fill="url(#linearGradient-1)"></path>
                    <circle id="Oval-Copy-10" stroke="#9A7AC7" stroke-width="0.3" fill="#FFFFFF" cx="15.7228529" cy="17.2233748" r="6.57175592"></circle>
                </g>
            </g>
        </g>
    </g>
</svg>

	      </Marker>
	}
}



