import React from 'react';
import './App.css';
import useRealtime from './services/Realtime'
import { CSSTransitionGroup } from 'react-transition-group' // ES6
import useServices from './services/index'

const App = props => {


  const [datas, loading, setData] = useRealtime('cars/User', 'value');
  const [datos, setconfig] = useServices();

  const handleAdd = () => {
    // const newItems = datas.concat([{name: prompt('Enter some text')}])
    const name = prompt('Enter some text')

   setconfig({
    type: 'post',
    urls: 'https://us-central1-botnews-97552.cloudfunctions.net/setUser',
    parameters: {
      name: name,
      apellido: "benito",
      mail: "altarp@gmail.com",
      passUser: "ajajajjajajajajaj"
    },
    isrequest: true
   })

   console.log(datos)
   // setConfig(config)
    //setRequest(true)
    //alert(newItems)
    //setData(newItems)
    //database.ref(`/cars/User`).set(newItems)

  }


  console.log(datos)





  // const dasd = useServices('https://us-central1-botnews-97552.cloudfunctions.net/setUser', {
  // name: "braulio",
  // apellido: "benito",
  // mail: "altarp@gmail.com",
  // passUser: "ajajajjajajajajaj"
  // })



  const deleteIten = i => {
    let newintenst = datas.slice()
    newintenst.splice(i, 1)
    setData(newintenst)
  }

  if (loading) {
    return (
      <div>
        cargando..
           </div>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleAdd}>Add Item</button>
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {datas.map((data, key) => (
            <div key={`${key}`} onClick={deleteIten.bind(key)} > {data.name}  </div>
          ))}
        </CSSTransitionGroup>

      </header>




    </div>
  );
}

export default App;
