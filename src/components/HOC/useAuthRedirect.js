import { useSelector } from "react-redux"
import { getTokenSelector } from "../redux/slices/userSlice"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const useAuthRedirect = () => {
  const token = useSelector(getTokenSelector)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate("/signin")
    }
    // eslint-disable-next-line
  }, [token])
}
