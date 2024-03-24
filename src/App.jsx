import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import './App.css'
import TourCard from "./components/TourCard";
import { useState } from "react";
import { useEffect } from "react";
import TourForm from "./components/TourForm";

//video: Frontend és Backend programozás-20240222_171359-Meeting Recording - Írásvédett mód
//törlés,modosítas

function App() {
  // rownál oszlopok rendezése
  //több elem megjelenítése egy listából, state változóként felveszem
  //üres listaként veszem fel, és beimportálom a ustate függvényt
  const backend_url = "http://localhost:8000/api/TournamentCalendar";
  const [tourdates, setTourDates] = useState([]);
  //amikor először megjelenítünk, feltételhez kötve, pl ha az oldal betöltődik
  //módosításhoz:
  const [updateId, setupdateId] = useState(0);
  const [updateTourData, setUpdateTourData] = useState({});

  useEffect(() => {
    readTour();
  }, []);

  //map függvénnyel fogok végigmenni a listán

  //adatfeltöltés fetch függvénnyel, amihez létrehozok egy egy constanst
  const readTour = async () => {
    try {
      const response = await fetch(backend_url);
      const data = await response.json();
      setTourDates(data);

      // Ellenőrizzük, hogy a data egy tömb-e és nem üres-e
      if (Array.isArray(data) && data.length > 0) {
        setTourDates(data);
      } else {
        console.error("Invalid data format or empty array received.");
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  //függvény meghívása amikor betöltődik az alkalmazás, hogy ne ismétlödjön a hívás, nem domcontentloaded esemény kell
  const createTour = async (tour) => {
    const response = await fetch(backend_url, {
      method: "POST",
      body: JSON.stringify(tour),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });

    //hibaüzenet az adatok kitöltésére, sikeres művelet esetén alaphelyzetbe
    const data = await response.json();
    if (response.ok) {
      readTour();
      return true;
    } else {
      alert(data.message);
      return false;
    }
  };

  //törlési adat
  const deleteTour = async (id) => {
    const response = await fetch(`${backend_url}/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json"
      }
    });
    if (response.ok) {
      readTour();
    } else {
      const data = await response.json();
      alert(data.message);
    }
  };
  //módosítási űrlap betöltése
  const loadUpdateForm = async (id) => {
    setupdateId(id);
  }

  const readSingleTour = async () => {
    try {
      const response = await fetch(`${backend_url}/${updateId}`, {
        headers: {
          Accept: "application/json"
        }
      });
      const data = await response.json();
      console.log(data); // Logolás hozzáadása
      if (response.ok) {
        setUpdateTourData(data);
      } else {
        setUpdateTourData(null);
        alert(data.message);
      }
    } catch (error) {
      console.error("Error fetching single tour: ", error);
    }
  };
  
  //updateTour függvény létrehozása a módosítához
  const updateTour = async (tour) => {
    const response = await fetch(`${backend_url}/${updateId}`, {
      method: "PATCH",
      body: JSON.stringify(tour),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      } 
    });
    const data = await response.json();
    if (response.ok) {
      readTour();
      setupdateId(0);
      return true;
    } else {
      alert(data.message);
      return false;
    }
};

//useeffect függvény ha az update id változik
useEffect(() => {
  if (updateId == 0) {
    setUpdateTourData(null);
  }
  else {
    readSingleTour();
  }
}, [updateId]);

return (
  <main className='container'>
      
    <section>
    {
        updateTourData == null ?
          <>
            <h2>Új Pálya felvétele</h2>
            <TourForm onSubmit={createTour} />
          </>
          :
          <>
            <h2>{updateTourData.track_name} adatainak módosítás</h2>
            <TourForm onSubmit={updateTour} buttonText={"Módosítás"} tour={updateTourData} />
          </>
      }
    </section>
    <section>
      <h2>GT circuits</h2>
      <div className="row row-cols-lg-2 row-cols-1 gy-3">
        {tourdates.map(tour => <TourCard tour={tour} key={tour.id} updateClick={loadUpdateForm} deleteClick={deleteTour} />)}
      </div>
    </section>

  </main>
  );
}
export default App;
