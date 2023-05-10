import React, { useEffect } from "react";
import Layout from "./Layout";
import Footer from "./Footer";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchCocktails } from "../redux/cocktailSlice";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { cocktails, status, error } = useSelector(
    (state) => state?.cocktailSlice);

  useEffect(() => {
    dispatch(fetchCocktails());
  }, []);

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
    <Layout>
      <Header />
      <div className="container-fluid mx-auto mt-2 row">
        {cocktails?.map((cocktailsValue) => {
          const { strDrink, strDrinkThumb, strCategory, idDrink } = (cocktailsValue);
          return (
            <div className="col-lg-3 col-md-4 col-sm-6 col-12 my-2" key={idDrink}>
              <div className="card">
                <img src={strDrinkThumb} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{strDrink}</h5>
                  <p className="card-text"><strong>Category : </strong>{strCategory}</p>
                  <Link className="btn btn-sm btn-primary" to={`/products/${idDrink}`}>Buy Now</Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </Layout>
  );
};

export default Home;
