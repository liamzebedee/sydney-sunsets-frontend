import { h, Component } from 'preact';
import style from './style.less';


export default class Button extends Component {
	render(props) {
		return <div onClick={props.onClick} class={style.button}>
			{props.children}
		</div>;
	}
}