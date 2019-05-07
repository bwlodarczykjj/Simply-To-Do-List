import React from 'react';
import image from './img/logo.png'

export class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      buyItems: ['Mleko', 'Chleb', 'Owoce'],
      message: ''

    }
  }

  addItem = (e) => {
    e.preventDefault();
    const { buyItems } = this.state;
    const newItem = this.newItem.value;

    const isOnTheList = buyItems.includes(newItem); // Metoda includes(), sprawdza czy jest dana pozycja, jesli jest zwraca TRUE, jesli nie ma FALSE

    if (isOnTheList) {
      this.setState({
        message: alert("Ta pozycja jest już na liście!")
      })

    } else {
      newItem !== "" && this.setState({
        buyItems: [...this.state.buyItems, newItem],
        message: ""
      })
    }

    this.addForm.reset()
  }

  removeItem(item) {
    const newBuyItems = this.state.buyItems.filter(buyItem => { // Przypisuje do nowej zmiennej newBuyitems poprzedni STATE this.state.buyItems i wykonuje na nowej tablicy zespredowanej w setState, metode filter()
      return buyItem !== item
    })

    this.setState({
      buyItems: [...newBuyItems]// Ustawiam nowy State. Spread'uje stare buyItems do nowej tablicy newBuyItems
    })

    if (newBuyItems.length === 0) {
      this.setState({
        message: alert("Na Twojej liście nie ma żadnej pozycji...")
      })
    }

  }

  clearAll() {
    this.setState({
      buyItems: [],
      message: alert("Lista wyczyszczona!")
    })
  }

  render() {
    const { buyItems } = this.state; //Desktrukturyzacja
    return (
      <div className="App">
        <header className="header">
          <img src={image} className="img-logo" alt="logo" />
          <h1>Lista zakupów</h1>
          <form ref={(input) => { this.addForm = input }} className='form-inline' onSubmit={e => this.addItem(e)}>
            <div className='form-group'>
              <label className='sr-only' htmlFor='newItemInput'>Dodaj nową pozycję</label>
              <input ref={(input) => { this.newItem = input }} type='text' placeholder='np. Chleb' className='form-control' id='newItemInput' />
            </div>
            <button type='sumbit' className='btn btn-dark'>Dodaj!</button>
          </form>
        </header>
        <div className='content'>
          <table className='table table-hover table-dark'>
            <thead className='thead-light'>
              <tr>
                <th>#</th>
                <th>Przedmiot</th>
                <th>Usuń</th>
              </tr>
            </thead>
            <tbody>
              {
                buyItems.map(item => {
                  return (
                    <tr key={item}>
                      <th scope="row">1</th>
                      <td>{item}</td>
                      <td className="text-center">
                        <button onClick={() => this.removeItem(item)} type="button" className="btn btn-danger btn-sm">Usuń</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2">&nbsp;</td>
                <td className="text-right">
                  <button onClick={() => this.clearAll()} className="btn btn-danger btn-sm">Wyczyść!</button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div >
    );
  }
}


export default App;
