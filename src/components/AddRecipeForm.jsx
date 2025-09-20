import axios from "axios";
import { useEffect, useState } from "react";

export default function AddRecipeForm() {
  const [dishName, setDishName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState("");
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState("");
  const [recipes, setRecipes] = useState([]);

  const apiUrl = "https://6880ebc1f1dcae717b63f960.mockapi.io/recepies";
  const fetchRecipes = async () => {
    try {
      const res = await axios.get(apiUrl);
      setRecipes(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleTagChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (o) => o.value);
    setTags(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecipe = {
      dishName,
      Ingredients: ingredients.split(",").map((i) => i.trim()),
      description,
      Steps: steps,
      tags,
      image,
      link: "#",
    };

    try {
      await axios.post(apiUrl, newRecipe);
      fetchRecipes();

      setDishName("");
      setIngredients("");
      setDescription("");
      setSteps("");
      setTags([]);
      setImage("");
      alert("Recipe added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add recipe!");
    }
  };

  return (
    <div className="w-50 mx-auto p-3">
      <h2 className="text-center mb-3">Upload Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Recipe Title"
          value={dishName}
          onChange={(e) => setDishName(e.target.value)}
          required
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Ingredients (comma separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
          className="form-control mb-2"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="form-control mb-2"
        />
        <textarea
          placeholder="Steps"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          required
          className="form-control mb-2"
        />
        <select
          multiple
          value={tags}
          onChange={handleTagChange}
          className="form-select mb-2"
        >
          <option>Spicy</option>
          <option>Chai</option>
          <option>Snacks</option>
        </select>
        <input
          type="file"
          className="form-control mb-2"
          onChange={handleImageChange}
        />
        <button className="btn btn-primary w-100" type="submit">
          Submit Recipe
        </button>
      </form>
    </div>
  );
}
