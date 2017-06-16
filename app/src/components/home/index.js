import { h, Component } from 'preact';
import { Router } from 'preact-router';

import API from '../api';

import Button from '../button';
import style from './style.less';

// http://chenglou.github.io/react-motion/demos/demo7-water-ripples/
export default class Home extends Component {
	letsChill = () => {
		Router.route('/spots')
	}

	render() {
		return (
			<div class={style.home}>
				<div class={style.container}>
					<div class={style.title}>Sydney Sunsets (beta)</div>
					<Button onClick={this.letsChill}>{"Let’s chill"}</Button>
				</div>
			</div>
		);
	}
}
