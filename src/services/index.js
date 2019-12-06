/** @format */

import { useState, useEffect } from 'react';

//consumiendo una API REST con fech
const useServices = () => {
	const configServiceDefault = {
		type: 'get',
		urls: '',
		parameters: null,
		isrequest: false
	};

	const [datas, setDatas] = useState(null);
	const [config, setConfig] = useState(configServiceDefault);

	useEffect(() => {
		async function getData() {
			try {
				if (config.type === 'get') {
					const response = await fetch(config.urls);
					const data = await response.json();
					if (data) {
						setDatas(data);
					}
				} else {
					if (JSON.stringify(config.parameters) === '{}') {
						throw new Error('objeto vacio');
					}

					if (typeof config.parameters != 'object') {
						throw new Error('se requiere un objeto');
					}

					const response = await fetch(config.urls, {
						method: 'POST',
						body: JSON.stringify(config.parameters),
						headers: {
							'content-type': 'application/json'
						}
					});

					if (response.ok) {
						const data = await response.json();
						if (data) {
							setDatas(data);
						}
					}
				}
			} catch (error) {
				console.error(error);
				setDatas('error en la consulta');
			}
		}

		if (config.isrequest) {
			getData();
		}
	}, [config]);

	return [datas, setConfig];
};

export default useServices;
