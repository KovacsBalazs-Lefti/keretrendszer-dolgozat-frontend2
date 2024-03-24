import PropTypes from "prop-types"

function TourCard(props) {
    const {tour, updateClick, deleteClick} = props; //tour objektum létrehozása
    
    return ( <div className="col">
        <div className="card">
        <div className="card-header">
           <h4>{tour.track_name}</h4> 
        </div>
        <div className="card-body">
            <table className="table">
                <tbody>
                    <tr>
                        <th>Pálya neve</th>
                        <td>{tour.track_name}</td>
                    </tr>
                    <tr>
                        <th>Ország neve</th>
                        <td>{tour.Country_name}</td>
                    </tr>
                    <tr>
                        <th>Kezdés dátuma</th>
                        <td>{tour.start_date}</td>
                    </tr>
                    <tr>
                        <th>Befejezés dátuma</th>
                        <td>{tour.end_date}</td>
                    </tr>
                    <tr>
                        <th>Körök száma</th>
                        <td>{tour.laps}</td>
                    </tr>
                    <tr>
                        <th>Kupa neve</th>
                        <td>{tour.cup_name}</td>
                    </tr>
                    <tr>
                        <th>Versenysorozat</th>
                        <td>{tour.race_series}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="card-footer">
            <div className="d-grid gap-1">
                <button className="btn btn-secondary" onClick={() =>{updateClick(tour.id)}}>Módosítás</button>
                <button className="btn btn-danger" onClick={() =>{deleteClick(tour.id)}}>Törlés</button>
            </div>
        </div>
        </div>
    </div> );
}
TourCard.propTypes = {
    tour: PropTypes.object.isRequired, //PropTypes importot figyelni, hogy helyesen legyen importálva
    updateClick: PropTypes.func.isRequired,
    deleteClick: PropTypes.func.isRequired
}
export default TourCard;