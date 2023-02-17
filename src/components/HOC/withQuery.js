

import Loader from '../Loader/Loader'

export const withQuery = (WrappedComponent) => function ({
    isError, error, isLoading, ...rest
}) {
    if (isError) {
        return (
            <div className="errorMessage">
                {error.message}
            </div>
        )
    }
    if (isLoading) return <Loader />
    return (
        <WrappedComponent {...rest} />
    )
}