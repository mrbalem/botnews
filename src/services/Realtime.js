/** @format */

import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
//import 'firebase/auth';
//import 'firebase/storage';
import 'firebase/database';
import config from './config.json';

firebase.initializeApp({
	credential: config,
	databaseURL: 'https://botnews-97552.firebaseio.com'
});

const database = firebase.database();

const useRealtime = (ref, tipo) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	if (!ref || !tipo) {
		throw new Error('ref y tipo es necesario');
	}

	if (typeof ref !== 'string' || typeof tipo !== 'string') {
		throw new Error('ref o tipo es necesario un string');
	}

	useEffect(() => {
		database.ref(`/${ref}`).on(`${tipo}`, respon => {
			const datas = respon.val();
			setData(datas);
			setLoading(false);
		});
	}, []);

	const keys = Object.keys(data || {});
	const parseData = Object.values(data || {}).map(key => key);
	return [parseData, loading, setData, keys];
};

export default useRealtime;
