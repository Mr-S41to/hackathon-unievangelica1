import React, { useState } from 'react';
import './App.css';

function App() {
  const [popupContent, setPopupContent] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [collectionData, setCollectionData] = useState({
    name: '',
    neighborhood: '',
    zipCode: '',
    wasteTypes: [],
  });

  const handlePopup = (content) => {
    setPopupContent(content);
  };

  const closePopup = () => {
    setPopupContent(null);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCollectionData({ ...collectionData, [name]: value });
  };

  const handleWasteTypeToggle = (type) => {
    setCollectionData((prevState) => {
      const { wasteTypes } = prevState;
      if (wasteTypes.includes(type)) {
        return {
          ...prevState,
          wasteTypes: wasteTypes.filter((waste) => waste !== type),
        };
      } else {
        return { ...prevState, wasteTypes: [...wasteTypes, type] };
      }
    });
  };

  const handleSubmitCollection = () => {
    alert(`Coleta salva com os dados: 
    Nome: ${collectionData.name}
    Bairro: ${collectionData.neighborhood}
    CEP: ${collectionData.zipCode}
    Tipos de resíduos: ${collectionData.wasteTypes.join(', ')}`);
    closePopup();
  };

  const renderPopupContent = () => {
    if (popupContent === 'Horários') {
      return (
        <div className="popup-content">
          <h3>Horários dos Coletores</h3>
          <table>
            <thead>
              <tr>
                <th>Coletor</th>
                <th>Horário</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Coletor A</td>
                <td>7 às 11</td>
              </tr>
              <tr>
                <td>Coletor B</td>
                <td>11 às 15</td>
              </tr>
              <tr>
                <td>Coletor C</td>
                <td>15 às 19</td>
              </tr>
              <tr>
                <td>Coletor D</td>
                <td>19 às 23</td>
              </tr>
              <tr>
                <td>Coletor E</td>
                <td>23 às 7</td>
              </tr>
            </tbody>
          </table>
          <button onClick={closePopup}>Fechar</button>
        </div>
      );
    }

    if (popupContent === 'Requisitar Coleta') {
      return (
        <div className="popup-content">
          <h3>Requisitar Coleta</h3>
          <form>
            <label>
              Nome:
              <input
                type="text"
                name="name"
                value={collectionData.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Bairro:
              <input
                type="text"
                name="neighborhood"
                value={collectionData.neighborhood}
                onChange={handleInputChange}
              />
            </label>
            <label>
              CEP:
              <input
                type="text"
                name="zipCode"
                value={collectionData.zipCode}
                onChange={handleInputChange}
              />
            </label>
            <div>
              <h4>Tipos de Resíduos:</h4>
              {['Orgânico', 'Inorgânico', 'Doméstico', 'Recicláveis'].map((type) => (
                <label key={type}>
                  <input
                    type="checkbox"
                    checked={collectionData.wasteTypes.includes(type)}
                    onChange={() => handleWasteTypeToggle(type)}
                  />
                  {type}
                </label>
              ))}
            </div>
            <button type="button" onClick={handleSubmitCollection}>
              Salvar
            </button>
          </form>
          <button onClick={closePopup}>Fechar</button>
        </div>
      );
    }

    return (
      <div className="popup-content">
        <h3>{popupContent}</h3>
        <p>Conteúdo do pop-up para "{popupContent}"</p>
        <button onClick={closePopup}>Fechar</button>
      </div>
    );
  };

  return (
    <main className="main">
      <header className="header">
        {!isMenuOpen && (
          <svg
            onClick={toggleMenu}
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#fff"
            className="open-menu-icon"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        )}

      </header>

      <div className="App">

        {/* Menu Lateral */}
        <div id="menu" className={isMenuOpen ? '' : 'menu-hidden'}>
          <div className="menu-header">
            <h2>MENU</h2>
            {isMenuOpen && (
              <svg
                onClick={toggleMenu}
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#fff"
                className="close-menu-icon"
              >
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
              </svg>
            )}
          </div>
          {[
            'Rotas', 
            'Coletas', 
            'Relatórios', 
            'Horários', 
            'Requisitar Coleta', 
            'Cadastrar Rotas'
          ].map((item) => (
            <p key={item} onClick={() => handlePopup(item)}>
              {item}
            </p>
          ))}
        </div>

        {popupContent && <div className="popup">{renderPopupContent()}</div>}

      </div>
    </main>
  );
}

export default App;
