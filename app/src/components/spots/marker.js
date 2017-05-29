import { h, Component } from 'preact';
import style from './style.less';
import ReactMapboxGl, { Layer, Feature, Cluster, Marker } from "react-mapbox-gl";


export class SpotClusterMarker {
    onClick = () => {
        this.props.onClick({ coordinates: this.props.coordinates })
    }

	render(props, state) {
        let clusterSize = null;
        let clusterSizeStr = ''+props.clusterSize;

        if(props.clusterSize > 9) {
            clusterSize = [
                <tspan x="3.21888991" y="15">{clusterSizeStr[0]}</tspan>,
                <tspan x="9.10694655" y="15">{clusterSizeStr[1]}</tspan>
            ];
        } else {
            clusterSize = <tspan x="6" y="15">{clusterSizeStr}</tspan>;
        }

		return <Marker coordinates={props.coordinates} className={style.clusterMarker} onClick={this.onClick}>


<svg width="46px" height="55px" viewBox="0 0 46 55" version="1.1" >
    
    <title>sunset spot cluster</title>
    <desc>Created with Sketch.</desc>
    <defs>
        <linearGradient x1="50%" y1="100%" x2="50%" y2="0%" id="linearGradient-1">
            <stop stop-color="#7C5EA7" offset="0%"></stop>
            <stop stop-color="#CF7EA4" offset="50.3308355%"></stop>
            <stop stop-color="#E17F97" offset="69.8932539%"></stop>
            <stop stop-color="#FD8185" stop-opacity="0.999983003" offset="100%"></stop>
        </linearGradient>
        <path d="M5.95345583,5.61730423 C2.19722897,9.26864305 0.0559637324,14.2519498 0.000777573165,19.470806 C-0.103812411,30.3089373 10.3682597,42.4580283 15.9899714,49.5709576 C16.8361249,50.6373351 18.1238413,51.2650603 19.4911368,51.2776761 C20.8584323,51.290292 22.1576775,50.6864365 23.0236478,49.6358566 C28.7891706,42.6527252 39.5488652,30.6983312 39.666529,19.8991393 C39.725776,14.6735995 37.6888954,9.63928684 34.0051091,5.90648898 C30.3213228,2.17369113 25.2932346,0.0490378783 20.0297595,0.00110890769 C14.7731345,-0.0542619972 9.7096827,1.96596541 5.95345583,5.61730423 Z" id="path-2"></path>
        <filter x="-17.6%" y="-9.8%" width="135.3%" height="127.3%" filterUnits="objectBoundingBox" id="filter-3">
            <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
            <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
            <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.584182518 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
        </filter>
    </defs>
    <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="sunset-spot-cluster">
            <g id="Group-2" transform="translate(3.000000, 0.000000)">
                <g id="Shape-Copy-9">
                    <use fill="black" fill-opacity="1" filter="url(#filter-3)" xlinkHref="#path-2"></use>
                    <use fill="url(#linearGradient-1)" fill-rule="evenodd" xlinkHref="#path-2"></use>
                </g>
                <g id="Group-3" transform="translate(10.000000, 12.000000)">
                    <ellipse id="Oval-Copy-10" stroke="#9A7AC7" stroke-width="0.3" fill="#FFFFFF" cx="9.91694655" cy="9.97069694" rx="9.91694655" ry="9.97069694"></ellipse>
                    <text id="12" font-family="Helvetica-Bold, Helvetica" font-size="13.5" font-weight="bold" letter-spacing="-1.62" fill="#6E588F">
                        {clusterSize}
                    </text>
                </g>
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
            
<svg width="28px" height="36px" viewBox="0 0 28 36" version="1.1" >
    
    <title>sunset spot</title>
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
        <g id="sunset-spot">
            <path d="M4.20232081,3.94366912 C1.55094138,6.50711798 0.0395026962,10.0056846 0.000548859685,13.6696203 C-0.0732772806,21.278609 7.31856502,29.8079663 11.2867201,34.8016498 C11.8839881,35.5503079 12.7929387,35.9910069 13.7580612,35.9998639 C14.7231837,36.008721 15.6402721,35.5847799 16.251528,34.8472126 C20.321194,29.9446547 27.9160582,21.5519858 27.9991126,13.9703349 C28.0409328,10.3017068 26.6031753,6.76733114 24.002929,4.14669337 C21.4026827,1.5260556 17.8535441,0.0344273976 14.1382547,0.000778516678 C10.4278007,-0.0380950281 6.85370024,1.38022026 4.20232081,3.94366912 Z" id="Shape-Copy-9" fill="url(#linearGradient-1)"></path>
            <circle id="Oval-Copy-10" stroke="#9A7AC7" stroke-width="0.3" fill="#FFFFFF" cx="14" cy="15" r="7"></circle>
        </g>
    </g>
</svg>

	      </Marker>
	}
}



