import React, { useState, useEffect, useRef, useReducer } from 'react';
import mondaySdk from "monday-sdk-js";
import Header from "./components/Header.jsx"
import Footer from './components/Footer';
import Container from './components/Container';
import { postData } from './client-rest/index';
import './App.css';
import "monday-ui-react-core/dist/main.css";

function App() {
  const ref = useRef(null)
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState("");
  const [item, setItem] = useState("");
  const URL = "https://asistente2-cbbytzoija-uc.a.run.app/query";
  const monday = mondaySdk();
  const initialState = { conversation: [] };

  const grabarDatos = (tab, item, dataMesages) => {
    let dashbord = {
      [tab]: {
        [item]: dataMesages.conversation
      }
    }
    let newItem = { ...dashbord }

    monday.storage.instance.setItem(item, JSON.stringify(newItem)).then(res => {
    });
  }

  const leerDatos = (item, data) => {
    const DATA_STORE = JSON.parse(data);
    let respuesta = []
    for (const data_table in DATA_STORE) {
      respuesta = DATA_STORE[data_table][item];
    }
    return respuesta
  }


  function reducer(state, action) {
    switch (action.type) {
      case 'addO':
        let operator = { conversation: [...state.conversation, ['operator', action.message]] }
        ref.current?.scrollIntoView({ behavior: 'smooth' })
        grabarDatos(action.ID_BOARDS, action.ID_ITEM, operator)
        return operator
      case 'addV':
        let visitor = { conversation: [...state.conversation, ['visitor', action.message]] }
        ref.current?.scrollIntoView({ behavior: 'smooth' })
        grabarDatos(action.ID_BOARDS, action.ID_ITEM, visitor)
        return visitor
      case 'recover':
        let recover = { conversation: [...action.valor] }
        return recover
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const url = window.location.href;
    let idxBoard = url.search("boardId=");
    const ID_BOARDS = url.substring(idxBoard + 8, idxBoard + 18);
    setTab(ID_BOARDS);

    let idxItem = url.search("itemId=");
    const ID_ITEM = url.substring(idxItem + 7, idxItem + 17);
    setItem(ID_ITEM);

    const fetchPost = async () => {
      let body = {
        board_id : ID_BOARDS,
        item_id  : ID_ITEM,
        query    : 'first'
      }
      let respuesta = await postData( URL, { ...body } );
      dispatch({ type: 'addV', message: respuesta.answer, ID_BOARDS, ID_ITEM })
    }

    monday.storage.instance.getItem(ID_ITEM).then(res => {
      if (res.data.value) {
        const valor = leerDatos(ID_ITEM, res.data.value)
        if (valor !== undefined) {
          dispatch({ type: 'recover', valor })
        } else {
          fetchPost()
        }
      } else {
        fetchPost()
      }
    });

  }, [])

  const handleSend = async () => {
    if (message) {
      dispatch({ type: 'addO', message, ID_BOARDS: tab, ID_ITEM: item })
      setMessage("")
      let body = {
        board_id : tab,
        item_id  : item,
        query    : message
      }
      let respuesta = await postData( URL, { ...body } );
      dispatch({ type: 'addV', message: respuesta.answer, ID_BOARDS: tab, ID_ITEM: item })
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  return (
    <div className='App-header'>
      <Header />
      <Container ref={ref} data={state.conversation} />
      <Footer
        messageValue  = { message }
        onFuntChange  = { (e) => {setMessage(e)} }
        onFuntClick   = { () => handleSend() }
        onFuntKeyDown = { (e) => handleEnter(e) }
      />
    </div>
  );
}

export default App;
