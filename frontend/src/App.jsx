import Table from './Components/Table/Table.jsx';
import Popup from  './Components/Popup/Popup.jsx';
import {useState} from 'react'
import './App.css';

function App() {
  const [visible, setVisible] = useState(false); 

  // Filter states
  const [filterName, setFilterName] = useState('');
  const [filterEmail, setFilterEmail] = useState('');
  const [filterDatumDeaktivacije, setFilterDatumDeaktivacije] = useState('');

  const handleButtonClick = () => {
    setVisible(true);
  };

  return (
    <>
      <div className='wrapper'>
        <div className='container'>
          {!visible ? (
            <>
              <div className='search'>
                <input
                  type="text"
                  placeholder="Pretraga po imenu..."
                  className='pretraga'
                  value={filterName}
                  onChange={e => setFilterName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Pretraga po emailu..."
                  className='pretraga'
                  value={filterEmail}
                  onChange={e => setFilterEmail(e.target.value)}
                />
                <input
                  type="date"
                  placeholder="Datum deaktivacije"
                  className='pretraga'
                  value={filterDatumDeaktivacije}
                  onChange={e => setFilterDatumDeaktivacije(e.target.value)}
                />
              </div>
              <Table
                filterName={filterName}
                filterEmail={filterEmail}
                filterDatumDeaktivacije={filterDatumDeaktivacije}
              />
              <button className='dodaj' onClick={handleButtonClick}>
                Dodaj novi kontakt
              </button>
            </>
          ) : (
            <Popup />
          )}
        </div>
      </div>
    </>
  );
}

export default App;