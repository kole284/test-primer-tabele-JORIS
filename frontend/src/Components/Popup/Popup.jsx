import './Popup.css';
import { useState } from 'react';

function Popup() {
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Phone, setPhone] = useState("");
    const [PoslovnoLice, setPoslovnoLice] = useState(false);
    const [DatumKreiranja, setDatumKreiranja] = useState("");
    const [imeError, setImeError] = useState("");

    const promeniDugme = (event) => {
        setPoslovnoLice(event.target.value === 'true');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (Name.length < 3) {
            setImeError("Ime mora imati bar 3 karaktera");
            return;
        } else {
            setImeError("");
        }
        const newContact = {
            Name,
            Email,
            Phone,
            PoslovnoLice,
            DatumKreiranja
        };
        try {
            const response = await fetch('http://localhost:5057/api/klijenti', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newContact)
            });
            if (response.ok) {
                setName('');
                setEmail('');
                setPhone('');
                setPoslovnoLice(false);
                setDatumKreiranja('');
                alert("Uspesno dodat novi kontakt");
            } else {
                alert("Doslo je do greske prilikom dodavanja kontakta");
            }
        } catch (error) {
            console.error("Greska prilikom slanja zahteva:", error);
            alert("Doslo je do greske prilikom dodavanja kontakta");
        }
    };

    return (
        <div className="popup-container">
            <h1 className="form-title">Додавање новог контакта</h1>
            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label className="input-label">Назив:</label>
                        <input
                            type="text"
                            name="naziv"
                            className="input-field"
                            value={Name}
                            onChange={e => setName(e.target.value)}
                        />
                        {imeError && <span className="error-message">{imeError}</span>}
                    </div>
                    <div className="form-group">
                        <label className="input-label">Број телефона:</label>
                        <input
                            type="tel"
                            name="broj_telefona"
                            className="input-field"
                            value={Phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group large-field">
                        <label className="input-label">Адреса електронске поште:</label>
                        <input
                            type="email"
                            name="email_adresa"
                            className="input-field"
                            value={Email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group radio-group">
                        <label className="input-label">Пословно лице:</label>
                        <div className="radio-options">
                            <label>
                                Да
                                <input
                                    type="radio"
                                    name="poslovno_lice"
                                    value="true"
                                    checked={PoslovnoLice === true}
                                    onChange={promeniDugme}
                                />
                            </label>
                            <label>
                                Не
                                <input
                                    type="radio"
                                    name="poslovno_lice"
                                    value="false"
                                    checked={PoslovnoLice === false}
                                    onChange={promeniDugme}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="input-label">Датум креирања:</label>
                        <input
                            type="date"
                            name="datum_kreiranja"
                            className="input-field"
                            value={DatumKreiranja}
                            onChange={e => setDatumKreiranja(e.target.value)}
                        />
                    </div>
                </div>
                <button type="submit" className="add-button">Додај</button>
            </form>
        </div>
    );
}

export default Popup;