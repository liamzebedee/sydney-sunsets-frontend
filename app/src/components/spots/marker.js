import { h, Component } from 'preact';
import style from './style.less';
import ReactMapboxGl, { Layer, Feature, Cluster, Marker } from "react-mapbox-gl";


export class SpotClusterMarker {
    onClick = () => {
        this.props.onClick(this.props)
    }

	render(props, state) {
        let size = props.clusterSize;
        const factor = 10;
        let sizeRounded = Math.round(size / factor, 1) * factor;

        let $clusterSize = null;
        if(sizeRounded < 10) {
            $clusterSize = [(<text id="5">
                        <tspan x="0.494628906" y="19.5">{size}</tspan>
                    </text>),
                    <text id="+">
                        <tspan x="11.2441406" y="18.5">+</tspan>
                    </text>];
        } else {
            $clusterSize = [(<text id="10">
                        <tspan x="0.489257812" y="19.5">{sizeRounded}</tspan>
                    </text>),
                    <text id="+">
                        <tspan x="19.2441406" y="18.5">+</tspan>
                    </text>];
        }

		return <Marker coordinates={props.coordinates} className={style.clusterMarker} onClick={this.onClick}>



<svg width="60px" height="60px" viewBox="0 0 60 60" version="1.1" >
    
    <desc>Created with Sketch.</desc>
    <defs>
        <circle id="path-1" cx="24" cy="24" r="24"></circle>
        <filter x="-20.8%" y="-16.7%" width="141.7%" height="141.7%" filterUnits="objectBoundingBox" id="filter-2">
            <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
            <feGaussianBlur stdDeviation="3" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
            <feColorMatrix values="0 0 0 0 0.285740859   0 0 0 0 0.285740859   0 0 0 0 0.285740859  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
        </filter>
    </defs>
    <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="sunset-spot-cluster/circle" transform="translate(6.000000, 4.000000)">
            <g id="Cluster">
                <g id="Oval">
                    <use fill="black" fill-opacity="1" filter="url(#filter-2)" xlinkHref="#path-1"></use>
                    <use fill="#9A7AC7" fill-rule="evenodd" xlinkHref="#path-1"></use>
                </g>
                <g id="Group-2" transform="translate(10.000000, 10.500000)" font-size="18" font-family="Helvetica-Bold, Helvetica" letter-spacing="-2" fill="#FFFFFF" font-weight="bold">
                    {$clusterSize}
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
		this.props.onClick(this.props)
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



