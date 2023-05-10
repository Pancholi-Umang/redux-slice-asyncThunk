import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchSingleCocktail } from '../redux/cocktailSlice';
import { useDispatch, useSelector } from 'react-redux';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSingleCocktail({ id }))
  }, [])

  const data = useSelector(state => state?.cocktailSlice?.cocktail?.[0])
  const { status, error } = useSelector((state) => state?.cocktailSlice);
  if (status == "loading") {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }} >
        <h1>Loading...</h1>
      </div>
    );
  }

  if (status == "failed") {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <p>{error?.message}</p>
      </div>
    );
  }
  return (
    <div style={{ backgroundColor: '#eee' , height:"100vh"}}>
      <section>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-4">
              <div className="card text-black">
                <i className="fab fa-apple fa-lg"/>
                <img src={data?.strDrinkThumb} className="card-img-top" alt="Apple Computer" />
                <div className="card-body">
                  <div className="text-center">
                    <h5 className="card-title">{data?.strDrink}</h5>
                    <p className="text-muted mb-4">{data?.strCategory}</p>
                  </div>
                  <div>
                    <div className="d-flex justify-content-center">
                      <span>{data?.strGlass}</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center total font-weight-bold mt-4">
                    <Link to="/" className='btn btn-outline-dark'>Go Back</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default ProductDetails