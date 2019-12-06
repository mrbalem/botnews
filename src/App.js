/** @format */

import React from 'react';
import './App.css';
import useRealtime from './services/Realtime';
import { CSSTransitionGroup } from 'react-transition-group'; // ES6
import useServices from './services/index';

const App = props => {
	const [datas, loading, setData, keys] = useRealtime('cars/User', 'value');
	const [datos, setconfig] = useServices();

	const getKeys = i => {
		return keys[i];
	};

	console.log(getKeys(4));

	const handleAdd = () => {
		// const newItems = datas.concat([{name: prompt('Enter some text')}])
		const name = prompt('Enter some text');

		setconfig({
			type: 'post',
			urls: 'https://us-central1-botnews-97552.cloudfunctions.net/setUser',
			parameters: {
				name: name,
				apellido: 'benito',
				mail: 'altarp@gmail.com',
				passUser: 'ajajajjajajajajaj'
			},
			isrequest: true
		});
	};

	const deleteIten = i => {
		//let newintenst = datas.slice();
		//newintenst.splice(i, 1);
		//setData(newintenst);
		alert(getKeys(i));
		//console.log(i);
		//alert(i);
	};

	if (loading) {
		return <div>cargando..</div>;
	}

	return (
		<div className='App'>
			<header className='App-header'>
				<button onClick={handleAdd}>Add Item</button>
				<CSSTransitionGroup
					transitionName='example'
					transitionEnterTimeout={500}
					transitionLeaveTimeout={300}>
					{datas.map((data, key) => (
						<div key={`${key}`} onClick={() => deleteIten(key)}>
							{key}
							{data.name}
						</div>
					))}
				</CSSTransitionGroup>
			</header>
		</div>
	);
};

export default App;
