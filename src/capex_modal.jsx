const React = require('react');

const CapExModal = (props) => {
  const closeModal = (event) => {
    event.preventDefault();
    let modal = document.getElementById('modal');
    modal.style.display = 'none';
    if(props.state.capEx.length > 1){
      let modalButton = document.getElementById('modalButton');
      modalButton.style.color = '#5a83db';
    }
  }
  const openModal = (event) => {
    event.preventDefault();
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
  }

  return (
    <div className="inputWrapper">
    <button id='modalButton' className="modalButton" onClick={openModal}> Cap Ex / Renovations </button>
    <div id='modal' className="modal">
      <div className="modal-content">
        <button className="modal-close" onClick={closeModal}>X</button>
        <div className="inputWrapper">
          <label>
            Renovation Total Amount
          </label>
            <input name="capEx" type="text" value={props.state.capEx} onChange={props.handleCurrency} placeholder="$0"/>
        </div>
        <div className="inputWrapper">
          <label>
            Starting Month
          </label>
            <input name="capExStart" type="number" value={props.state.capExStart} onChange={props.handleOtherChange} />
        </div>
        <div className="inputWrapper">
        <label>
          Ending Month
        </label>
          <input name="capExEnd" type="number" value={props.state.capExEnd} onChange={props.handleOtherChange} />
        </div>
      </div>
    </div>
    </div>
  )
}

module.exports = CapExModal;