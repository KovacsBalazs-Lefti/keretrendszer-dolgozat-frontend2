import { useEffect, useRef } from "react";
import PropTypes from "prop-types"

function TourForm(props) {
    //minden függvényhez ref változót hozunk létre
    const track_nameRef = useRef(null);
    const Country_nameRef = useRef(null);
    const start_dateRef = useRef(null);
    const end_dateRef = useRef(null);
    const lapsRef = useRef(null);
    const cup_nameRef = useRef(null);
    const race_seriesRef = useRef(null);
    const {onSubmit, buttonText, tour} = props;

    const createTour = async () => {
        const tour = {
            track_name: track_nameRef.current.value,
            Country_name: Country_nameRef.current.value,
            start_date: start_dateRef.current.value,
            end_date: end_dateRef.current.value,
            laps: lapsRef.current.value,
            cup_name: cup_nameRef.current.value,
            race_series: race_seriesRef.current.value,
        };
        if (!tour.track_name ||
            !tour.Country_name ||
            !tour.start_date ||
            !tour.end_date ||
            !tour.laps ||
            !tour.cup_name ||
            !tour.race_series) {
            alert("Minden mező kitöltése kötelező!");
            return;
        }
    
        //sikeres művelet esetén a sikeresség letárolása
        const success = await onSubmit(tour);
        if (success){
            resetform();
        }
    }
    const resetform = () => {
        track_nameRef.current.value = "";
        Country_nameRef.current.value = "";
        start_dateRef.current.value = "";
        end_dateRef.current.value = "";
        lapsRef.current.value = "";
        cup_nameRef.current.value = "";
        race_seriesRef.current.value = "";
    };

    useEffect(() => {
        if (tour) {
            track_nameRef.current.value = tour.track_name || '';
            Country_nameRef.current.value = tour.Country_name || '';
            start_dateRef.current.value = tour.start_date || '';
            end_dateRef.current.value = tour.end_date || '';
            lapsRef.current.value = tour.laps || '';
            cup_nameRef.current.value = tour.cup_name || '';
            race_seriesRef.current.value = tour.race_series || '';
        }
    }, [tour]);

    return ( <form onSubmit={event => {event.preventDefault(); createTour();}}>
        
        <div className="mb-3">
            <label htmlFor="track_name" className="form-label">Pálya neve</label>
            <input type="text" className="form-control" id="track_name"placeholder="Pálya neve" ref={track_nameRef}/>
        </div>
        <div className="mb-3">
            <label htmlFor="Country_name" className="form-label">Ország neve</label>
            <input type="text" className="form-control" id="Country_name"placeholder="Ország neve" ref={Country_nameRef}/>
        </div>
        <div className="mb-3">
            <label htmlFor="start_date" className="form-label">Kezdés dátuma</label>
            <input type="date" className="form-control" id="start_date"placeholder="Pálya neve" ref={start_dateRef}/>
        </div>
        <div className="mb-3">
            <label htmlFor="end_date" className="form-label">Befejezés dátuma</label>
            <input type="date" className="form-control" id="end_date"placeholder="Befejezés dátuma" ref={end_dateRef}/>
        </div>
        <div className="mb-3">
            <label htmlFor="laps" className="form-label">Körök száma</label>
            <input type="text" className="form-control" id="laps"placeholder="Körök száma" ref={lapsRef}/>
        </div>
        <div className="mb-3">
            <label htmlFor="cup_name" className="form-label">Kupa neve</label>
            <input type="text" className="form-control" id="cup_name"placeholder="Kupa neve" ref={cup_nameRef}/>
        </div>
        <div className="mb-3">
            <label htmlFor="race_series" className="form-label">Versenysorozat</label>
            <input type="text" className="form-control" id="race_series"placeholder="Versenysorozat" ref={race_seriesRef}/>
        </div>
        <button type="submit" className="btn btn-primary">{buttonText}</button>
    </form> );
}
TourForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    buttonText: PropTypes.string,
    tour: PropTypes.object
}
TourForm.defaultProps = {
    buttonText: "Felvétel",
    tour: null
}

export default TourForm;