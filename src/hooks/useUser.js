import { useQuery } from "@tanstack/react-query"
import { dogFoodApi } from "../components/Api/Api/DogFoodApi"

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => dogFoodApi.getUserInfo(),
  })
}
