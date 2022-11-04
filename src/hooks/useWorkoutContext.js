import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutContext = () => {
  const context = useContext(WorkoutsContext)

  if(!context) {
    throw Error('use workoutscontext must be used inside a workoutscontextprovider')
  }

  return context
}
