import React, { useState, useEffect } from 'react'

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
               
                //setDatas("se requiere un objeto")
                throw new Error("se requiere un objeto");
            }

            try {
                const response = await fetch(url, parameter)
                const data = await response.json()
                if(data){
                    setDatas(data)
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

    }, [])
    

    return datas;
}


export default Services;