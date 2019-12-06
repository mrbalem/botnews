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

/** Guia para utilizar @useServices **/
/**
 * ---------------  @importar ---------------
 *
 *     import useService from '../services/index.js'    directorio es relativo
 *
 * ------------------ uso -------------------------
 *
 *          por defecto el hook expone dos parametros @datas y @setConfig
 *          @datas : recibe los datos obenidos de la base de datos y los errores
 *          @setConfig : contiene la configuracion necesaria para las peticiones.
 *                      Ejemplo get
 *                      @setConfigGET : {
 *                                type: 'get',
 *                                urls: 'url',    @url del servicio
 *                                isrequest: true  @isrequest es falso la peticion no se realizar es importnte este valor
 *                          }
 *
 *                     Ejemplo post
 *                     @setConfigPOST : {
 *                                type: 'post',
 *                                urls: 'url',    @url del servicio
 *                                parameters: {    @parametes por defecto espera un objeto. de lo contrario mostrara un error!.
 *                                       parameter1: "nam1"
 *                                       parameter2: "name2"
 *                                       parameter2: "name3"
 *                                }
 *                                isrequest: true
 *                              }
 *
 *       uso de @useService
 *
 *      **de esta manera se estara utilizando el servicio por defecto no realizara ninguna consulta**
 *
 *      const [datas, setConfig] = useService()
 *
 *      **Realizar consultas**
 *
 *          GET
 *       @setConfigGET
 *
 *           or
 *
 *          POST
 *       @setConfigPOST
 *
 *      **despues de haber modificado la configurancion automaticamente se realizara la consulta**
 *
 *      **recuperar datos**
 *
 *      consol.log(datas)
 *
 *
 *     **consultar, insertar, actualisar, eleminar dinamicamente ejemplo**
 *
 *      const getServices = (type, url, parameters) => {
 *          setConfig({
 *              type: type,
 *              urls: url
 *              parameters: parameters
 *              isrequest: true
 *          })
 *      }
 *
 *       **reutilzar la funcion creada**
 *
 *      getServices('get', 'httt:...')
 *                  or
 *      getServices('post', 'http: ...', {name: "joalk", hola: "...." ...})
 *
 *      **recuperar datos**
 *
 *      console.log(datas)
 *
 *
 */
