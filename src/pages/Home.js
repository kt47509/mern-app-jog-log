import { useEffect, useState } from "react";
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutContext } from "../hooks/useWorkoutContext";

const Home = () => {

  const { workouts, dispatch } = useWorkoutContext()
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchWorkouts = async () => {
      // using proxy (in package.json) for CORS error with non specific url on line below, wont work in production
      const response = await fetch('https://kt-mern-app.herokuapp.com/api/workouts');
      const json = await response.json();
      if (response.ok) {
        setLoading(false);
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }

    fetchWorkouts();
  }, [dispatch])

  if(loading) return "Loading Jogs"; 

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home;