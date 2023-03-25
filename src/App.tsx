import { useState } from "react";
import './App.css';

function App() {

    const [nameInput, setNameInput] = useState<string>('');
    const [apiRequest, setApiRequest] = useState<string>('https://rickandmortyapi.com/api/character');

    const [name, setName] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [species, setSpecies] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [origin, setOrigin] = useState<string>('');
    const [img, setImg] = useState<string>('');

    const fetchData = async (api: string) => {

        const response = await fetch(api);
        const data = await response.json();

        let currentIndex = 0;

        data.results.forEach((charecter: any)=>{
            if(charecter.name.toLowerCase().includes(nameInput.toLowerCase())){
                setName(charecter.name);
                setStatus(charecter.status);
                setSpecies(charecter.species);
                setType(charecter.type);
                setGender(charecter.gender);
                setOrigin(charecter.origin.name);
                setImg(charecter.image);

                return;
            }
            currentIndex++;
        });

        if(currentIndex === 20 && data.info.next !== null){
            fetchData(data.info.next);
        }

    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameInput(event.target.value);
    }

    const handleSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setName('');
        fetchData(apiRequest);
    };

    return(
        <div className='container-app'>
            <h1>Rick and morty API</h1>
            <div className='container-search'>
                <form>
                    <input type='text' placeholder='Type name and search' onChange={handleInputChange}/>
                    <button type='submit' onClick={handleSearch}>Search</button>
                </form>
            </div >
            <div className='container-card'>
                { name === '' ? (
                    <p>not found</p>
                ) : (
                    <div className='container-character'>
                        <img src={img} alt={name} />
                        <div className='info-character'>
                            <section className='left'>
                                <p><b>Name:</b> {name}</p>
                                <p><b>Status:</b> {status}</p>
                                <p><b>Specie:</b> {species}</p>
                            </section>
                            <section className='right'>
                                <p><b>Gender:</b> {gender}</p>
                                <p><b>Origin:</b> {origin}</p>
                                <p><b>Type:</b> {type === '' ? 'null' : type}</p>
                            </section>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )

}
export default App;