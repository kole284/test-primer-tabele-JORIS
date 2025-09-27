import {useState,useEffect} from 'react';
import './Table.css';
function Table({ filterName = '', filterEmail = '', filterDatumDeaktivacije = '' }) {
    const [klijenti,setKlijenti]=useState([]);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);
    
    const fetchKlijenti = async() => {
        try{
            const response = await fetch('http://localhost:5057/api/klijenti');
            if(!response.ok){
                throw new Error(`HTTP Error, greska: ${response.status}`);
            }
            const data= await response.json();
            setKlijenti(data);
            setLoading(false);
        }
        catch(err){
            setError(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchKlijenti();
    },[]);

    const deaktivirajKlijenta = async (id) => {
        try {
            const response = await fetch(`http://localhost:5057/api/klijenti/${id}/deaktiviraj`, {
                method: 'PUT'
            });
            if (response.ok) {
                // Osveži listu klijenata
                fetchKlijenti();
            } else {
                alert("Greška prilikom deaktivacije klijenta");
            }
        } catch (error) {
            alert("Greška prilikom deaktivacije klijenta");
        }
    };

    if(loading){
        return <div>Loading...</div>
    }
    if(error){
        return <div>{`Greska: ${error.message}`}</div>
    }

    // Filtriranje
    const filtriraniKlijenti = klijenti.filter(klijent => {
        const imeMatch = klijent.name?.toLowerCase().includes(filterName.toLowerCase());
        const emailMatch = klijent.email?.toLowerCase().includes(filterEmail.toLowerCase());
        const datumMatch = filterDatumDeaktivacije
            ? klijent.datumDeaktivacije && klijent.datumDeaktivacije.slice(0, 10) === filterDatumDeaktivacije
            : true;
        return imeMatch && emailMatch && datumMatch;
    });

    return (
        <>
        <div className='sivi-okvir'>
            <table className='narandzasti-okvir'>
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>Email</th>
                        <th>Telefon</th>
                        <th>Poslovno lice</th>
                        <th>Datum kreiranja</th>
                        <th>Aktivan</th>
                        <th>   </th> 
                    </tr>
                </thead>
                <tbody>
                    {filtriraniKlijenti.map(klijent=> (
                        <tr key={klijent.id}>
                            <td>{klijent.name}</td>
                            <td>{klijent.email}</td>
                            <td>{klijent.phone}</td>
                            <td>{klijent.poslovnoLice ? 'Da' : 'Ne'}</td>
                            <td>{new Date(klijent.datumKreiranja).toLocaleDateString()}</td>
                            <td>{klijent.aktivan ? 'Da' : 'Ne'}</td>
                            <td>
                                {klijent.aktivan ? 
                                    <button onClick={() => deaktivirajKlijenta(klijent.id)}>
                                        Deaktiviraj
                                    </button> 
                                    : ' '}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )
}
export default Table;