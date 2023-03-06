import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export const useProductsSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [sort, setSort] = useState({
    sortBy: searchParams.get("sort") || "default",
    sortOrder: searchParams.get("order") || "",
  })

  useEffect(() => {
    setSearchParams(
      `sort=${sort.sortBy}${sort.sortOrder ? "&order=" + sort.sortOrder : ""}`
    )
  }, [sort, setSearchParams])

  return [sort, setSort]
}
