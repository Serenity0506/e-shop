import { useQuery } from "@tanstack/react-query"
import { dogFoodApi } from "../components/Api/Api/DogFoodApi"

export const useProducts = ({ isEnabled = true }) => {
  return useQuery({
    queryKey: ["productsfetch"],
    queryFn: () => dogFoodApi.getAllProducts(),
    enabled: isEnabled,
  })
}
