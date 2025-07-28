import { Link, useNavigate } from "react-router-dom"

function HomePage(){
    const navigate = useNavigate()

    function navigateHandler() {
        navigate("/products")
    }

    return (
        <>
            <h1>My Homepage</h1>
            <p>
                Go to <Link to="products">the list of products</Link>
            </p>
            <button onClick={navigateHandler}>
                Go to Products
            </button>
        </>
        
    )
}

export default HomePage