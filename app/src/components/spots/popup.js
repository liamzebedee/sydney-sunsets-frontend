import { h, Component } from 'preact';
import style from './style-popup.less';
import ReactMapboxGl, { Layer, Feature, Cluster, Marker, Popup } from "react-mapbox-gl";


export class SpotPopup extends Component {
    getDirections = () => {
        let [ lng, lat ] = this.props.spot.coordinates;
        let url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        let win = window.open(url, '_blank');
        win.focus()
    }

    shareSpot = () => {
        let url = `http://sunsetspots.com/spots/${this.props.spot.id}`;
        window.prompt("Link to share: ", url);
    }

  render(props) {
    let opacity = (props.zoom - 12) / 1;
    let scale = Math.min(opacity, 1);

    return <Popup coordinates={props.spot.coordinates}>
              <div class={style.popupCtn} style={{ opacity: opacity, transform: `scale(${scale})` }}>
              
<svg width="332px" height="367px" viewBox="0 0 332 367" version="1.1">
    
    <desc>Created with Sketch.</desc>
    <defs>
        <path d="M176.728335,344.491333 L176.849734,344.612732 L162.244383,359.218083 L147.517633,344.491333 L19.9926683,344.491333 C8.9510225,344.491333 0,335.54204 0,324.496777 L0,19.9945563 C0,8.95186776 8.96125489,0 19.9926683,0 L304.007332,0 C315.048977,0 324,8.94929327 324,19.9945563 L324,324.496777 C324,335.539465 315.038745,344.491333 304.007332,344.491333 L176.728335,344.491333 Z" id="path-1"></path>
        <filter x="-2.2%" y="-1.4%" width="104.3%" height="103.9%" filterUnits="objectBoundingBox" id="filter-3">
            <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
            <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
            <feColorMatrix values="0 0 0 0 0.523782951   0 0 0 0 0.523782951   0 0 0 0 0.523782951  0 0 0 0.471863678 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
        </filter>
        <rect id="path-4" x="0" y="0" width="324" height="186.853147"></rect>
        <pattern id="pattern-5" patternUnits="objectBoundingBox" y="-15.4155678%" height="115.415568%" width="100%">
            <use xlinkHref="#image-6" transform="scale(1.16967509,1.16967509)"></use>
        </pattern>
        <rect x="172" y="14" width="20" height="20" id="rect-8"></rect>
        <image id="image-6" width="277" height="209" xlinkHref="/assets/spot-placeholder-bg.png"></image>
    </defs>
    <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Info-Box/7" transform="translate(4.000000, 1.000000)">
            <g id="Group-4" transform="translate(0.000000, 1.000000)">
                <g id="Rectangle-8">
                    <g>
                        <mask id="mask-2" fill="white">
                            <use xlinkHref="#path-1"></use>
                        </mask>
                        <g id="Mask">
                            <use fill="black" fill-opacity="1" filter="url(#filter-3)" xlinkHref="#path-1"></use>
                            <use fill="#FFFFFF" fill-rule="evenodd" xlinkHref="#path-1"></use>
                        </g>
                        <g id="Mask" mask="url(#mask-2)">
                            <g transform="translate(0.000000, -11.518982)">
                                <mask id="mask-7" fill="white">
                                    <use xlinkHref="#path-4"></use>
                                </mask>
                                <use id="Mask" stroke="none" fill="url(#pattern-5)" fill-rule="evenodd" xlinkHref="#path-4"></use>
                            </g>
                        </g>
                    </g>
                </g>
                <g id="Group-3" transform="translate(0.000000, 297.000000)">
                    <rect id="Rectangle-2" x="0" y="0" width="324" height="47"></rect>
                    <text class={style.button} onClick={this.shareSpot} id="SHARE" font-family="HelveticaNeue-Bold, Helvetica Neue" font-size="16" font-weight="bold" letter-spacing="0.0802197829" fill="#F07E81">
                        <tspan x="72" y="30">SHARE</tspan>
                    </text>
                    <path d="M62.5953685,21.7648397 L53.6934762,14.25071 C53.0190904,13.6245325 52.2098275,14.25071 52.2098275,15.2525939 L52.2098275,19.0096588 C45.8706011,19.0096588 40.4755148,22.6414881 37.9128488,27.5256724 C36.9687087,29.1537339 36.4292001,30.9070308 36.0245686,32.6603277 C35.7548143,33.9126827 37.7779717,34.5388602 38.5872346,33.4117407 C41.5545321,29.0284984 46.5449869,26.148082 52.2098275,26.148082 L52.2098275,30.2808533 C52.2098275,31.2827373 53.0190904,31.9089148 53.6934762,31.2827373 L62.5953685,23.7686076 C63.1348772,23.2676656 63.1348772,22.2657817 62.5953685,21.7648397 Z" id="share" fill="#F07E81" fill-rule="nonzero"></path>
                    <g id="Bitmap">
                        <image x="172" y="14" width="20" height="20" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAABGdBTUEAA1teXP8meAAABJ5JREFUaAXVmN1vFFUYh4ulCqJVUKKgSCMIBIgCAqJWa0y4Ilx7Z7z3xr/Gf6DGC6+5bfgUo5gWCCiVtAK1VlsBq+VTpT5P7anbZWc7Z2f37O4vebrT+Tjz/ua857xnprOjvbWM8FfBkzDrP+2oLoJeC6/AFvgVvlzOn3aRD/5xMPgdsBtegxXQD/fawYy98BxshlehD7bBBtDcCfgBbrWqmUcI7ml4GbbDHrAXNsE6CHHPsH0eLsNs2Ml202UamTIvgk9+F+wD0+oFeALKNc6OIZj0QCuYMYaQRo6F12En2CtrwF6qpH/YOQwX4b4nNMuMvfAsGPRB2AvOTKvBHuiEpTTFCafA8TKn1GasCZvhTegFzZhC3fAoxGiEk8+B42ZOKcz4lJ159sNbYBptBHtBc7XUujtc58C3Vx7AnBplxgCfAZ/822BPbAVTyzQqet8J2hiEX2BBRRtdaGh+YyW/5r7Bi9PpOnCafQzqoVkaGYYLcK+0wXqYsRd6wDR6FyxsIY0salmzEYdq0jRX2SujoLEFFTHjtOmT7wN7wYLmekkDRdrl8qq6ytGzcL38rNibWtTMfWeiMBtZI56C2NmIS6LlYDe9vgPrzCLlMWMavQRvgGnkbGSVDrMRm8l0mzvZK2OV7ljNjMGa/6aRRkpnozxFjUvqrpu0eA5uVWq53IxBmvvvwHugmefB2ShFGnGbTP3NkR9hUW0pPTuYMVgLmiYczD1gnbAmtIr+JJBvYVFtKQ+uhx1H4DcwJx1kTnmthDE56A9DpuyZj8HFXrPTKDNIDlgcL4H1JVMWNCtzKxsxeAf+V1A1xTzRN7kz0EppVRqL9cSx4piuKmevG3Aa7CXrRysNesLpcOAPwOdwFzKlGZ+Cg/8UHAWnPg3eh79AWTg1629qTXDDfvh6qRuHqdnZwrz0AouS46gbnJ5dtrve8kOb+yRsW1jXg7XIdZn/11M+zFFwvPjQqyqYCSdZmGbmsXeugT0SCD1kj7rtbxdo2jfGPfA+HAANF9UfNOADvlK0oZjrNaspx9sG+Ai+gdKBHLtttvix4hA0Vb4OO/uE9Ig14vkW8C/AFG66HGcfgOlai5lxrvsETOVcMj0aJZ/sSThWww1MMc1YMqwzudRIMwbwO1gjcgfkRcgH4UvY9/6TV402Y606C1N5A5o/7zq/J8CCmVuNNmOP/AwTuSPq6AjvLaZYlBptxoFv3dJQXk1zorXFYhmlRpsxGHtnMiIqU9KJwx6KUiozLpXy6A4nWSgtuNFKYcZp1lTLI0274HXhG60UZhw3eWYlTY+BKeY10UphxiBNn6Wk4UHwXb8mpTATZrSlnrapdRzyGK9oNoUZe8aKbgHNkseGIbq2lDaYwkwYM35hyZLLHo3E1KOH2kphxp6xEGZNApp1UWmKxa7huOR/pTBjgL4GaKiS/G48BK7hCimFGZ+8ZkYyInV1MAB5a1FGM/+922cerOMBPxE57ZbLFLwMFsrCStEzBqkZA3agl8pp2P0/le5sh20/RX0Gpl3AFOuFtlMnEe8F000zDvxPYSXURX77SikNbYIPwdSypwoPfNqY07/EXlvxjmUeGQAAAABJRU5ErkJggg=="></image>
                        
                    </g>
                    <text class={style.button} onClick={this.getDirections} id="DIRECTIONS" font-family="HelveticaNeue-Bold, Helvetica Neue" font-size="16" font-weight="bold" letter-spacing="0.0802197829" fill="#F07E81">
                        <tspan x="199" y="30">DIRECTIONS</tspan>
                    </text>
                </g>
                <g id="Group-2" transform="translate(30.000000, 183.000000)">
                    <text id="4.3km-away" font-family="HelveticaNeue, Helvetica Neue" font-size="13" font-weight="normal" letter-spacing="0.0651785731" fill-opacity="0.6" fill="#000000">
                        <tspan x="171" y="66">4.3km away</tspan>
                    </text>
                    <text id="Cloudy" font-family="HelveticaNeue, Helvetica Neue" font-size="13" font-weight="normal" letter-spacing="0.0651785731" fill-opacity="0.6" fill="#000000">
                        <tspan x="20" y="66">Cloudy</tspan>
                    </text>
                    <text id="20°C" font-family="HelveticaNeue, Helvetica Neue" font-size="13" font-weight="normal" letter-spacing="0.0651785731" fill-opacity="0.6" fill="#000000">
                        <tspan x="171" y="84">20°C</tspan>
                    </text>
                    <text id="Restaurants-nearby" font-family="HelveticaNeue, Helvetica Neue" font-size="13" font-weight="normal" letter-spacing="0.0651785731" fill-opacity="0.6" fill="#000000">
                        <tspan x="20" y="85">Restaurants </tspan>
                        <tspan x="20" y="100">nearby</tspan>
                    </text>
                    <text id="Chill-Ridge" font-family="AdobeGothicStd-Bold, Adobe Gothic Std" font-size="20" font-weight="bold" letter-spacing="0.100274712" fill="#000000">
                        <tspan x="2" y="18">Chill Ridge</tspan>
                    </text>
                    <text id="Circular-Quay" font-family="Helvetica-Light, Helvetica" font-size="18" font-weight="300" letter-spacing="0.126346126" fill="#000000">
                        <tspan x="2.32875018" y="41">Circular Quay</tspan>
                    </text>
                    <g id="icons/cloudsun" transform="translate(0.000000, 55.000000)">
                        <g id="Cloudy">
                            <path d="M6.76238489,9.56 L5.58591859,9.56 L6.14650756,13.3398557 L6.76238489,9.56 Z M12.152733,5.72717718 C13.220741,6.13721807 13.9555649,7.27207529 13.9555649,8.56216216 C13.9555649,10.1837011 12.7946507,11.56 11.2703797,11.56 L3.32593529,11.56 C1.80166436,11.56 0.640750105,10.1837011 0.640750105,8.56216216 C0.640750105,7.15957553 1.50931995,5.94047203 2.73031792,5.63681959 C3.13608299,4.9549903 3.81169033,4.49019418 4.59506022,4.42946968 C5.32295951,3.0400644 6.64689558,2.13945946 8.14075011,2.13945946 C10.0964818,2.13945946 11.7136918,3.6711301 12.152733,5.72717718 Z" id="Cloud" stroke-opacity="0.8" stroke="#000000" stroke-width="2"></path>
                            <g id="Sun" transform="translate(0.198132, 0.142703)" fill-opacity="0.8" fill="#000000">
                                <path d="M2.24432909,6.17121207 C2.19243773,5.93196098 2.16484057,5.68115261 2.16484057,5.4227027 C2.16484057,3.76763957 3.29656516,2.42594595 4.69261835,2.42594595 C5.28783789,2.42594595 5.83500731,2.66984145 6.26689969,3.07793295 L5.84075754,3.4143106 C5.51337653,3.15075604 5.11816723,2.99675676 4.69261835,2.99675676 C3.56248005,2.99675676 2.64632205,4.08288969 2.64632205,5.4227027 C2.64632205,5.6396139 2.67033502,5.84987601 2.71538135,6.04995661 L2.63353935,6.06486486 L2.24432909,6.17121207 Z" id="Oval-16"></path>
                                <path d="M4.81298872,0.142702703 C4.94205773,0.142702703 5.05372946,0.253990897 5.05372946,0.391271841 L5.05372946,1.32116059 C5.05372946,1.45775331 4.94594616,1.56972973 4.81298872,1.56972973 C4.68391971,1.56972973 4.57224797,1.45844154 4.57224797,1.32116059 L4.57224797,0.391271841 C4.57224797,0.25467912 4.68003128,0.142702703 4.81298872,0.142702703 Z M7.15828922,0.869979862 C7.27006626,0.934514368 7.31113272,1.08672864 7.24249224,1.20561742 L6.77754787,2.0109247 C6.70925151,2.12921747 6.55992022,2.17230024 6.4447757,2.10582152 C6.33299866,2.04128701 6.2919322,1.88907275 6.36057267,1.77018396 L6.82551705,0.96487668 C6.89381341,0.846583914 7.0431447,0.803501143 7.15828922,0.869979862 Z M0.122387714,5.57117333 C0.122387714,5.44210431 0.233675908,5.33043258 0.370956852,5.33043258 L1.3008456,5.33043258 C1.43743832,5.33043258 1.54941474,5.43821589 1.54941474,5.57117333 C1.54941474,5.70024234 1.43812655,5.81191407 1.3008456,5.81191407 L0.370956852,5.81191407 C0.234364131,5.81191407 0.122387714,5.70413076 0.122387714,5.57117333 Z M0.750809089,2.85693801 C0.815343594,2.74516097 0.967557862,2.70409451 1.08644665,2.77273499 L1.89175393,3.23767936 C2.01004669,3.30597572 2.05312947,3.45530701 1.98665075,3.57045153 C1.92211624,3.68222857 1.76990197,3.72329503 1.65101319,3.65465456 L0.845705907,3.18971018 C0.727413141,3.12141382 0.684330369,2.97208253 0.750809089,2.85693801 Z M2.46768821,0.869979862 C2.57946526,0.805445357 2.73181991,0.845987895 2.80046038,0.96487668 L3.26540476,1.77018396 C3.33370112,1.88847673 3.29634625,2.0393428 3.18120173,2.10582152 C3.06942469,2.17035602 2.91707003,2.12981349 2.84842956,2.0109247 L2.38348519,1.20561742 C2.31518883,1.08732465 2.35254369,0.936458582 2.46768821,0.869979862 Z" id="Rectangle-69"></path>
                            </g>
                        </g>
                    </g>
                    <image id="Bitmap" x="1" y="74" width="12" height="12" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAA1teXP8meAAAAidJREFUWAntmMlKxEAQhsflJHgRLwqKDnhS8CIobifvPoPgS3j0PQQRxwW8KwM+ggcFFxBRcTmJICgKouj/yxTETlfSmfQkOaTgn06qq6u+VFamUvFnQ0i1Dx1A3C6UzYDmCvppiNvTUCFsFhQPkMDJSB/nTGuHYwQabYjbbVBLjACPkECZI+eCkL3Y34OeoJeGuL0N9UBebQ7ZouAENgi5ijXiN8cVn3SucALB0z0FbUUAsoteLCmcQN6i+hkk++ZY80E3jyQup9Us7rJvBeQd5Wrs3A7U77rAR5wrIDu3mzUcD7CTPzEmcH0xcS2Zjusg4Xhac4HjEUcBClym1xyhgqYB5gHn/LojXKseJVGPGz7MWTvS8oITcDZGhWz2DSHJfY2EJMs/4/dcHqdVOyiykOnPhvF7A2nBefmvwUS2Sr2AcNKUOh8zzrc3jyYPq6LoBSTURRnPwVSV7g1gZwHqhr6gJWgCytKOUGwd4vfBK3QI3UNW24A3606yZsi0r5mOUKTueMfUHfRthDDHINRl+LVda00NUEti+k/hWIZOIHZcLhnZHodvDRqDvFoN2eJOMTu26FCVMYyNy8eaIdO+ZkKBFscnfJcWv+liDGObsjSALOiy3iVGhU+1WM3qcaIETNvMsoNlB9N2IO167RqUV1ba/EnWW2tqgG9JMnuKtdbUADdR9NlTYZc0rMWaiWwS0ceQ9pL/wBz/CI8zxjBWy8MarGW1XwpdwJ7OzcmxAAAAAElFTkSuQmCC"></image>
                    <image id="Bitmap" x="154" y="74" width="12" height="12" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAYAAACMRWrdAAAABGdBTUEAA1teXP8meAAAAq1JREFUaAXtmrur1EAUh9d35QsEsfNVWSgoPq/go1Ar/QcEQf8MUQstFNROrC0ULjZXQa+IlYq1iKAiei0V8YGV4PP72AxklyhiJskE5gffzuTMmeScOZslm2QwaF7LOMQp+FBwklZbr7WD6J/ArzEes+1YL7WKqN+ASd2Bo3AM7oK2GVgJvdMZIjaBSVhQit7+dXDsdMnei+4conwAP2GiIuKdxdh9Wn2ja3b0PQ53OJdmIXyHt0PTyKc2x/TpVWJm4VdNzRo2I5/BFnxGBmNsNFWxGLHV2kdOrNbydTA5V6yDRa91yFyxWsvXweRcsQ4WvdYhc8VqLV8Hk9us2Dzyk1bkVXjT8kLXhK4UBzpC29jFb3GMQVuJLeKA+8Crevv+T2tUbSQWEvD/V/i7EmyNtW2eY40lUbXjnFjVqqRsyxVLuTpVseWKVa1KyrZcsZSrUxVbrljVqqRsyxVLuTpVseWKVa1KyrZcsZSrUxVbUxX7xsH+5b6GPvpGV1OJHSDSNRAew5aTDH3H1sJ+6IU2EOU7MIFLYAIr4H2BfW2O6ePz6PWQtLw5dBNCUga7Fx6Cd6bE/h5Ql0HfG+DcZLWdyDxnXsES2AKfwODLaNsM+rwG52yDaIp9jvkakSs/BZ/hOBj8uLQ5ps8UOCfqK0ixE1tNgOopzAfPtz/JMX30VWHucKvmZ+zEQjh+7TyfvgZDReuYPkHOiabYic0Uka2j9c7v9F8i9cUxffRVYe5wK7HPCeIx2BewGJbDI7AaZbQ55rn2EpzjD0+y8qnKbTCJ80WUS2lPwL0C+9rURdD3FrT2iIlj/Zc2Mcu3SUNyVmVc2i6APvpuhF7oEFF+BAN/BmfhcME52ucQkjpIv1faSrT+QPwAkyijbRr06aU8b3bDNfhScJV2FzR6CfUbGL2COeUqznkAAAAASUVORK5CYII="></image>
                    <g id="location" transform="translate(155.000000, 56.000000)" stroke="#000000" stroke-width="2">
                        <path d="M4.5421875,0.237073171 C3.41135205,0.224587523 2.32207312,0.680130876 1.51401195,1.50347538 C0.70595078,2.32681988 0.245309465,3.45051132 0.2334375,4.62731707 C0.2109375,7.07121951 2.46375,9.81073171 3.673125,11.4146341 C3.85515443,11.6550928 4.1321754,11.7966393 4.42631589,11.799484 C4.72045638,11.8023288 4.99995748,11.6661648 5.18625,11.4292683 C6.4265625,9.85463415 8.74125,7.15902439 8.7665625,4.72390244 C8.77930806,3.5455896 8.34112257,2.41039676 7.54864524,1.56868397 C6.75616791,0.726971181 5.6744966,0.247880728 4.5421875,0.237073171 L4.5421875,0.237073171 Z" id="Shape"></path>
                        <ellipse id="Oval" cx="4.5" cy="4.6097561" rx="2.1571875" ry="2.24487805"></ellipse>
                    </g>
                </g>
                <path d="M0.5,297.5 L324.5,297.5" id="Line" stroke-opacity="0.4" stroke="#D7D7D7" stroke-linecap="square"></path>
            </g>
        </g>
    </g>
</svg>

            </div>
        </Popup>

  }
}