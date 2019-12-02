import { useState, useEffect } from 'react'

//consumiendo una API REST con fech
const Services = (url, parameter) => {

    const [datas, setDatas] = useState(null)

    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch(url)
                const data = await response.json()
                //console.log(response.json().data)
                if (data) {
                    setDatas(data)
                }
            } catch (error) {
                console.error(error)
                setDatas("error en la consulta")
            }
        }

        async function setData() {

            if(typeof parameter != 'object'){
                throw new Error("se requiere un objeto");
            }

            if(JSON.stringify(parameter)==='{}'){
                  throw new Error("objeto vacio")  
            }

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(parameter),
                    headers: {
                        'content-type': 'application/json'
                    }
                })

                if(response.ok){
                    const data = await response.json()
                    if(data){
                        setDatas(data)
                    }
                }
               
            } catch (error) {
                console.error(error)
                setDatas("error en la consulta")
            }
        }

        if(!parameter){
            getData();
        }else{
            setData();
        }

    }, [url])
    

    return datas;
}


export default Services;