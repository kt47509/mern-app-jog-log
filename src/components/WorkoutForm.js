import { useState } from 'react';
import { useWorkoutContext } from "../hooks/useWorkoutContext";

const WorkoutForm = () => {
  const {dispatch} = useWorkoutContext();
  const [distance, setDistance] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { distance };

    const response = await fetch('https://kt-mern-app.herokuapp.com/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setDistance('');
      setError(null);
      setEmptyFields([])
      console.log('new workout added', json);
      dispatch({type:'CREATE_WORKOUT', payload: json})
    }

  }

  return (
    <form className='create' onSubmit={handleSubmit}>
      <h3>Add a New Run</h3>

      <label>Distance (in km)</label>
      <input
        type="number"
        onChange={(e) => { setDistance(e.target.value) }}
        value={distance}
        className={emptyFields.includes('distance') ? 'error' : ''}
      />

      <button>Add Run</button>
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default WorkoutForm;