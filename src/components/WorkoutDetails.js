import { useWorkoutContext } from '../hooks/useWorkoutContext';
import format from 'date-fns/format'

const WorkoutDetails = ({ workout }) => {

  const { dispatch } = useWorkoutContext()

  const handleClick = async () => {
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE'
    })
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    }
  }


  return (
    <div className="workout-details">
      <h4>{format(new Date(workout.createdAt), 'PPP')}</h4>
      <p>{workout.distance}km</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default WorkoutDetails;