import React, {useEffect, useState} from 'react'
import '../Styles/EndScene.css'
import { ref, set, get, child } from 'firebase/database';
import { v4 } from 'uuid';
import { database } from '../Components/Firebase'; 


 
export default function EndScene(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [highScores, setHighScores] = useState([]);

    // Write data and make it ready to upload
    function writeUserData(name, score) {

        // Data get a randomly number from v4
        set(ref(database, 'users/' + v4()), {
          username: name,
          score: score,
        });
    }

    // Read data from database
    function readDataBase() {
        const dbRef = ref(database);
        get(child(dbRef, `users/`)).then((snapshot) => {
          if (snapshot.exists()) {
            setHighScores(Object.entries(snapshot.val()))
          } else {
            console.log("No data available");
          }

          // If process is done, loading while false and data is display 
          setIsLoading(false)
        }).catch((error) => {
          console.error(error);
          setIsLoading(false)
        });
        
    }

    // Read database in the beginning of the code
    useEffect(() => {
        readDataBase()
    }, []);
    
    function uploadUsername() {
        const input = document.getElementById('userName')
        const text = input.value
        writeUserData(text, props.score)
        props.handleButton()
    }

    return (
        <div className='outerDiv'>
            <div className='endSceneDiv border p-4 bg-white rounded input-group shadow'>
                <h2>Highscore</h2>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <div className='w-100 listDiv'>
                        <ul className="highScore list-group w-100">
                            {highScores.map(([key, entry]) => (
                            <li key={key} className="list-group-item">
                                {entry.username}: {entry.score}
                            </li>
                            ))}
                        </ul>
                    </div>
                 
                )}
                <input id='userName' type="text" className='form-control mt-3 w-100' placeholder='Enter your name'/>
                <div className='d-flex mt-3'>
                    <button onClick={uploadUsername} className='btn btn-success'>Save Score</button>
                    <button onClick={props.handleButton} className='btn btn-info mx-2'>New Game</button>
                </div>
            </div>
        </div>
    )
}
