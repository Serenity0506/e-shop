import { useSelector } from 'react-redux'
import { getTokenSelector } from '../redux/slices/userSlice'
import { useEffect } from 'react'
import { redirect } from 'react-router-dom'

export const useAuthRedirect = () => {
  const token = useSelector(getTokenSelector)

  useEffect(() => {
    if (!token) {
      redirect('/signin')
    }
  }, [token])
}
