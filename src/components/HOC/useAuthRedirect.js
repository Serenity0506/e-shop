import { useSelector } from "react-redux"
import { getTokenSelector } from "../redux/slices/userSlice"
import { useEffect } from "react"
import { router } from "../.."

export const useAuthRedirect = () => {
  const token = useSelector(getTokenSelector)

  useEffect(() => {
    if (!token) {
      router.navigate("/signin")
    }
  }, [token])
}
