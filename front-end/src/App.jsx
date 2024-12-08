import React, {
  useState,
  useEffect
} from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents
} from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import "./App.css";
import Button from "./components/Button";
import Input from "./components/Input";
import Radio from "./components/Radio";
import Label from "./components/Label";

function App() {
  const [popupContent, setPopupContent] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [collectionData, setCollectionData] = useState({
    name: "",
    neighborhood: "",
    zipCode: "",
    wasteTypes: [],
  });

  const User = {
    id: 1,
    nome: "João da Silva",
    login: "joaodasilva01",
    password: "12345678",
    tipo: "coperativa",
    cpfCnpj: "12345678901",
    coords: [-16.286652, -48.9498957]
  } // Dados de usuario para teste.
  console.log("Dados de Usuário: ", User);

  //Variaveis de localização e solicitação.
  const [position, setPosition] = useState(null);
  console.log("Cood", position);
  const [data, setData] = useState(new Date());
  console.log("Data Atual: ", data);
  const [tipoRejeito, setTipoRejeito] = useState(null);
  const [status, setStatus] = useState("Solicitado");
  const [dataColetasSolicitadas, setDataColetasSolicitadas] = useState([]);
  const [pontoColeta, setPontoColeta] = useState(null);
  const [dataPontoColeta, setDataPontoColeta] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          console.error("Erro ao obter localização:", err);
          //Define uma posição padrão caso a localização não seja obtida.
          setPosition([-15.8267, -47.9218]); //Brasília.
        }
      );
    }
  }, []);

  //Custumização de Maker do usúario.
  const UserMaker = L.divIcon({
    className: "custom-icon", // Nome da classe para estilização
    html:
      `<div style="
      width: 20px; 
      height: 20px; 
      background-color: #03045e; 
      border-radius: 50%; 
      box-shadow: 0 0 10px rgba(0, 0, 255, 0.5);">
    </div>`,
    iconSize: [20, 20],
  });

  const ColetasMaker = L.divIcon({
    html:
      `<div style="
      width: 20px; 
      height: 20px; 
      background-color: #d10000; 
      border-radius: 50%; 
      box-shadow: 0 0 10px rgba(0, 0, 255, 0.5);">
    </div>`,
    iconSize: [20, 20]
  })

  const PontoColetaMaker = L.divIcon({
    html:
      `<div style="
      width: 20px; 
      height: 20px; 
      background-color: #00aa80; 
      border-radius: 50%; 
      box-shadow: 0 0 10px rgba(0, 0, 255, 0.5);">
    </div>`,
    iconSize: [20, 20]
  })

  //Funções de post e get.
  const url = "http://localhost:3001";
  const headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const solicitarColeta = async () => {
    try {
      const response = await axios.post(`${url}/solicitar-coleta`, {
        coords: position,
        data: data,
        tipoRejeito: tipoRejeito,
        status: status,
        userId: User.id
      },
        headers
      );
      console.log(response.data);
      closePopup();
    } catch (error) {
      console.error("Erro", error);
    }
  }

  useEffect(() => {
    const getColetasSolicitadas = async () => {
      try {
        const response = await axios.get(`${url}/solicitar-coleta`, headers);
        setDataColetasSolicitadas(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Erro ao recuperar solicitações: ", error);
      }
    };
    getColetasSolicitadas();
  }, []);

  //Salvar ponto de coleta.
  const salvarPontoColeta = async () => {
    try {
      const response = await axios.post(`${url}/ponto-coleta`, {
        coords: pontoColeta
      },
        headers
      );
      console.log(response.data);
      closePopup();
    } catch (error) {
      console.error("Erro", error);
    }
  }

  //Get Pontos de Coleta.
  useEffect(() => {
    const getPontosColeta = async () => {
      try {
        const response = await axios.get(`${url}/ponto-coleta`, headers);
        setDataPontoColeta(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Erro ao recuperar pontos de coleta: ", error);
      }
    };
    getPontosColeta();
  }, []);


  //Pegar Maker.
  const ClickPontoColeta = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng; // Obtém latitude e longitude do local clicado
        setPontoColeta([lat, lng]); // Define o novo marcador
        console.log("Coordenadas clicadas:", { lat, lng }); // Exibe as coordenadas no console
      },
    });
    return null;
  };

  const handlePopup = (content) => {
    setPopupContent(content);
  };

  const closePopup = () => {
    setPopupContent(null);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderPopupContent = () => {
    if (popupContent === "Horários") {
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

    //Solicitar Coleta PopUp.
    if (popupContent === "Requisitar Coleta") {
      return (
        <div className="popup-content">
          <h3>Requisitar Coleta</h3>

          {position ? (
            <MapContainer
              center={position}
              zoom={15}
              style={{
                height: "50vh",
                width: "100%",
                border: "2.5px solid #000000",
                borderRadius: "32px",
              }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker
                position={position}
                icon={UserMaker}
              >
                <Popup>Solicitar Coleta para essa localização...</Popup>
              </Marker>
            </MapContainer>
          ) : (
            <p>Carregando mapa...</p>
          )}

          <div className="column">
            <Label title="Tipo de Resíduos" />
            <Radio
              name="tipoRejeito"
              value="Recicláveis"
              title="Recicláveis"
              checked={tipoRejeito === "Recicláveis"}
              onChange={() => setTipoRejeito("Recicláveis")}
            />
            <Radio
              name="tipoRejeito"
              value="Eletrônico"
              title="Eletrônico"
              checked={tipoRejeito === "Eletrônico"}
              onChange={() => setTipoRejeito("Eletrônico")}
            />
            <Radio
              name="tipoRejeito"
              value="Outros"
              title="Outros"
              checked={tipoRejeito === "Outros"}
              onChange={() => setTipoRejeito("Outros")}
            />
          </div>
          <div className="row">
            <Button
              title="Cancelar"
              onClick={() => closePopup()}
            />

            <Button
              title="Solicitar"
              onClick={() => solicitarColeta()}
            />
          </div>
        </div>
      );
    }

    //Pop-up para cadastrarpontos de coleta.
    if (popupContent === "Cadastrar Pontos de Coleta") {
      return (
        <div className="popup-content">
          <h3>Cadastrar Pontos de Coleta</h3>
          {position ? (
            <MapContainer
              center={position}
              zoom={15}
              style={{
                height: "50vh",
                width: "100%",
                border: "2.5px solid #000000",
                borderRadius: "32px",
              }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />

              <Marker position={position} icon={UserMaker}>
                <Popup>Sua localização inicial</Popup>
              </Marker>

              {/* Componente que coloca o Maker. */}
              <ClickPontoColeta />

              {pontoColeta && (
                <Marker position={pontoColeta} icon={PontoColetaMaker}>
                  <Popup>
                    <div>
                      <p>Coordenadas:</p>
                      <p>Latitude: {pontoColeta[0]}</p>
                      <p>Longitude: {pontoColeta[1]}</p>
                    </div>
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          ) : (
            <p>Carregando mapa...</p>
          )}
          <div className="row">
            <Button
              title="Cancelar"
              onClick={() => closePopup()}
            />

            <Button
              title="Salvar"
              onClick={() => salvarPontoColeta()}
            />
          </div>
        </div>
      )
    }

    if (popupContent === "Instruções") {
      return (
        <div className="popup-content">
          <h3>Como e Por Que Separar o Lixo?</h3>
          <p><b>Importância da Reciclagem</b></p>
          <p>A reciclagem é uma prática essencial para reduzir o impacto ambiental. Ela diminui a extração de matéria-prima da natureza, economiza recursos como água e energia e reduz a disposição inadequada de resíduos, além de gerar renda para catadores. Segundo o Ministério do Meio Ambiente, ações simples, como a separação correta do lixo doméstico, podem fazer uma enorme diferença na preservação do meio ambiente e no aproveitamento dos resíduos sólidos.</p>

          <p><b>O Cenário no Brasil</b></p>
          <p>O Brasil produz cerca de 180 mil toneladas de resíduos sólidos por dia, segundo a Pesquisa Nacional de Saneamento Básico do IBGE. Grande parte desse lixo ainda é descartada em lixões a céu aberto, gerando prejuízos econômicos de mais de R$ 8 bilhões anuais. Apenas 18% das cidades brasileiras possuem coleta seletiva. Com a separação adequada, é possível aumentar a reciclagem, prolongar a vida útil de aterros sanitários, reduzir o impacto ambiental e melhorar as condições de trabalho dos catadores.</p>

          <p><b>O que é Reciclável?</b></p>
          <p>São recicláveis materiais como papel (jornais, revistas, caixas de papelão, folhas e aparas de papel), plástico (garrafas PET, recipientes de limpeza, sacos plásticos, brinquedos quebrados), vidro (garrafas e frascos limpos e secos, exceto lâmpadas, cristais e espelhos) e metal (latas de alumínio, tampinhas, pregos e parafusos). Para separar corretamente o lixo doméstico, mantenha recicláveis separados de resíduos orgânicos como sobras de alimentos e cascas de frutas. Lave e seque embalagens antes de descartá-las, embrulhe materiais cortantes em papel grosso ou caixas para evitar acidentes e evite descartar itens como papel sujo, cerâmica, porcelana, pilhas e baterias junto com recicláveis comuns.</p>

          <p><b>Benefícios da Reciclagem</b></p>
          <p>A prática da reciclagem traz inúmeros benefícios. Por exemplo, uma única lata de alumínio reciclada economiza energia suficiente para manter uma TV ligada por três horas. Cerca de 100 mil pessoas no Brasil vivem exclusivamente da coleta de latas de alumínio, com uma renda média de três salários mínimos. Além disso, uma tonelada de papel reciclado economiza 10 mil litros de água e evita o corte de 17 árvores. Adotar a separação do lixo é um pequeno gesto com grande impacto ambiental e social.</p>

          <p><b>Saiba Mais</b></p>
          <p>Para saber mais, confira a matéria completa no site do Ministério do Meio Ambiente: <a href="https://www.gov.br/mma/pt-br/noticias/como-e-porque-separar-o-lixo" target="_blank">Como e por que separar o lixo</a>.</p>

          <p><small>Fonte: Ministério do Meio Ambiente, artigo publicado em 17/07/2012, atualizado em 24/07/2012, por Rafaela Ribeiro.</small></p>
          <div className="center">
            <Button
              title="Fechar"
              onClick={() => closePopup()}
            />
          </div>
        </div>
      )
    }

    //Base pop-up.
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
        <div id="menu" className={isMenuOpen ? "" : "menu-hidden"}>
          <div>
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
          {/* Itens do Menu lateral para abri PopUps. */}
          {[
            "Requisitar Coleta",
            "Cadastrar Pontos de Coleta",
            "Horários",
            "Cadastrar Rotas",
            "Instruções"
          ].map(
            (item) => (
              <p key={item} onClick={() => handlePopup(item)}>
                {item}
              </p>
            )
          )}
        </div>

        <h1>GREENPICK</h1>
        {position ? (
          <MapContainer
            center={position}
            zoom={15}
            style={{
              margin: 60,
              height: "65vh",
              width: "100%",
              border: "2.5px solid #000000",
              borderRadius: "32px"
            }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Marcador da posição atual */}
            <Marker position={position} icon={UserMaker}>
              <Popup>Sua localização atual</Popup>
            </Marker>

            {/* Exibir marcadores para cada ponto de coleta */}
            {dataColetasSolicitadas.map((coleta) => (
              <Marker
                key={coleta.id}
                position={coleta.coords}
                icon={ColetasMaker}
              >
                <Popup>
                  <strong>Data:</strong> {new Date(coleta.data).toLocaleString()}<br />
                  <strong>Tipo de Rejeito:</strong> {coleta.tipoRejeito || "Não informado"}<br />
                  <strong>Status:</strong> {coleta.status}<br />
                  <strong>ID do Usuário:</strong> {coleta.userId}
                </Popup>
              </Marker>
            ))}

            {dataPontoColeta.map((pontos) => (
              <Marker
                key={pontos.id}
                position={pontos.coords}
                icon={PontoColetaMaker}>

              </Marker>
            ))}
          </MapContainer>
        ) : (
          <p>Carregando mapa...</p>
        )}

        {popupContent && <div className="popup">{renderPopupContent()}</div>}

        <div className="legenda">
          <div className="row">
            <Label title="Legenda do Mapa" />
            <div className="ponto" />
            <p>Pontos de Coleta</p>
            <div className="solicitacao" />
            <p>Solicitações de Coleta</p>
            <div className="localizacao" />
            <p>Sua Localização Atual</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
