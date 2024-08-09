import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Form, Button } from 'react-bootstrap';


const possessions = [
  { id: 1, libelle: 'Maison', valeurInitiale: 100000, dateDebut: '2020-01-01', dateFin: '2030-01-01', amortissement: 1000 },
  { id: 2, libelle: 'Voiture', valeurInitiale: 20000, dateDebut: '2022-01-01', dateFin: '2027-01-01', amortissement: 200 },
  // Ajoutez plus de possessions ici si nécessaire
];

function App() {
  const [selectedDate, setSelectedDate] = useState('');
  const [patrimoineValue, setPatrimoineValue] = useState(null);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleCalculatePatrimoine = () => {
    let totalValue = 0;
    const selectedDateObj = new Date(selectedDate);

    possessions.forEach((possession) => {
      const dateDebutObj = new Date(possession.dateDebut);
      const dateFinObj = new Date(possession.dateFin);
      if (selectedDateObj >= dateDebutObj && selectedDateObj <= dateFinObj) {
        const years = (selectedDateObj - dateDebutObj) / (1000 * 60 * 60 * 24 * 365.25);
        const currentValue = possession.valeurInitiale - years * possession.amortissement;
        totalValue += currentValue > 0 ? currentValue : 0;
      }
    });

    setPatrimoineValue(totalValue);
  };

  return (
    <div className="container mt-5">
      <h1>Patrimoine Économique</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Libellé</th>
            <th>Valeur Initiale</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Amortissement</th>
            <th>Valeur Actuelle</th>
          </tr>
        </thead>
        <tbody>
          {possessions.map((possession) => (
            <tr key={possession.id}>
              <td>{possession.libelle}</td>
              <td>{possession.valeurInitiale}</td>
              <td>{possession.dateDebut}</td>
              <td>{possession.dateFin}</td>
              <td>{possession.amortissement}</td>
              <td>{/* Calcul de la valeur actuelle */}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Form.Group controlId="datePicker">
        <Form.Label>Sélectionnez une date</Form.Label>
        <Form.Control type="date" value={selectedDate} onChange={handleDateChange} />
      </Form.Group>
      <Button variant="primary" onClick={handleCalculatePatrimoine} className="mt-3">
        Valider
      </Button>
      {patrimoineValue !== null && (
        <div className="mt-3">
          <h3>Valeur du Patrimoine au {selectedDate}: {patrimoineValue.toFixed(2)} €</h3>
        </div>
      )}
    </div>
  );
}

export default App;
