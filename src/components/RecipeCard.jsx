import axios from "axios";
import { useEffect, useState } from "react";
import Banner1 from "../assets/Banner.png";
import Chai from "../assets/Chai.jpg";
import Banner3 from "../assets/VadaPav.png";

const RecipeCard = () => {
  const [recipes, setRecipes] = useState([]);
  const [displayedRecipes, setDisplayedRecipes] = useState([]);
  const [likes, setLikes] = useState({});
  const [searchText, setSearchText] = useState("");

  const apiUrl = "https://6880ebc1f1dcae717b63f960.mockapi.io/recepies";

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(apiUrl);
        setRecipes(res.data);
        setDisplayedRecipes(res.data);
        const likesInit = res.data.reduce((acc, r) => {
          acc[r.id] = false;
          return acc;
        }, {});
        setLikes(likesInit);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    };
    fetchRecipes();
  }, []);

  const toggleLike = (id) => {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchText.trim() === "") {
      setDisplayedRecipes(recipes);
      return;
    }

    const filtered = recipes.filter((r) =>
      String(r.dishName || "")
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
    setDisplayedRecipes(filtered);
  };

  return (
    <div className="align-items-center justify-content-around d-flex flex-column mt-1 w-100 px-3">
      <div className="container-fluid p-0">
        <div
          id="heroCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {/* Slide 1 */}
            <div className="carousel-item active m-0 p-0">
              <div
                style={{
                  backgroundImage: `linear-gradient(rgba(50, 50, 50, 0.6), rgba(50, 50, 50, 0.6)), url(${Banner1})`,
                  height: "400px",
                  width: "100%",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="d-flex flex-column justify-content-center align-items-center text-center h-100">
                  <h1 className="fs-1 fw-bold text-white">
                    Warm Recipes for Rainy Days
                  </h1>
                  <p className="text-white">
                    Browse & share your favorite monsoon treats
                  </p>
                  {/* <button className="btn btn-light btn-lg mt-2">
                    Explore Recipes
                  </button> */}
                </div>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="carousel-item">
              <div
                style={{
                  backgroundImage: `linear-gradient(rgba(50, 50, 50, 0.6), rgba(50, 50, 50, 0.6)), url(${Chai})`,
                  height: "400px",
                  width: "100%",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="d-flex flex-column justify-content-center align-items-center text-center h-100">
                  <h1 className="fs-1 fw-bold text-white">
                    Hot Soups & Snacks
                  </h1>
                  <p className="text-white">
                    Perfect comfort food for monsoon season
                  </p>
                  {/* <button className="btn btn-light btn-lg mt-2">Try Now</button> */}
                </div>
              </div>
            </div>

            {/* Slide 3 */}
            <div className="carousel-item">
              <div
                style={{
                  backgroundImage: `linear-gradient(rgba(50, 50, 50, 0.6), rgba(50, 50, 50, 0.6)), url(${Banner3})`,
                  height: "400px",
                  width: "100%",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="d-flex flex-column justify-content-center align-items-center text-center h-100">
                  <h1 className="fs-1 fw-bold text-white">Seasonal Treats</h1>
                  <p className="text-white">
                    Enjoy flavors of the rainy season
                  </p>
                  {/* <button className="btn btn-light btn-lg mt-2">
                    Get Recipes
                  </button> */}
                </div>
              </div>
            </div>
          </div>

          {/* Carousel controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <form className="w-100 mt-5" onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between align-items-center w-100">
          <div>
            <select className="form-select" style={{ maxWidth: "200px" }}>
              <option>Filter by Tag</option>
              <option>Chai</option>
              <option>Spicy</option>
              <option>Snacks</option>
            </select>
          </div>

          {/* Search + Button */}
          <div
            className="d-flex gap-2"
            style={{ maxWidth: "400px", width: "100%" }}
          >
            <input
              type="text"
              placeholder="Search by dish name"
              className="form-control"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>
        </div>
      </form>

      {/* Cards */}
      <div className="row row-cols-1 row-cols-md-3 g-4 mt-4 w-100">
        {displayedRecipes.map((recipe) => (
          <div className="col" key={recipe.id}>
            <div className="card h-100 shadow-sm custom-card">
              {recipe.image && (
                <img
                  src={recipe.image}
                  className="card-img-top"
                  alt={recipe.dishName}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{recipe.dishName}</h5>
                <p className="card-text">{recipe.Ingredients}</p>
                <p className="card-text">{recipe.tags}</p>
                <p className="card-text">{recipe.description}</p>
              </div>
              <button
                className="btn btn-outline-primary btn-sm w-25 mx-3 mb-3"
                onClick={() => toggleLike(recipe.id)}
                type="button"
              >
                {likes[recipe.id] ? (
                  <>
                    Liked <span style={{ color: "red" }}>❤</span>
                  </>
                ) : (
                  <>Like</>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeCard;
