// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { getAllProducts, deleteOneProduct, postMethod, putMethod } from './APIFrontend';

function App() {
  const [pageID, setPageID] = useState(0);
  const [curPostID, setCurProduct] = useState(0);
  const [Products, setProducts] = useState([]);
  const [addNewProduct, setAddNewProduct] = useState({
    id: 0,
    title: "",
    price: 0.0,
    description: "",
    category: "",
    image: "http://127.0.0.1:4000/images/",
    rating: 0.0,
  });

  React.useEffect(() => {
    getAllProducts(setProducts);
  }, []);

  return (
    <div className="App">
      {navBar(setPageID, setCurProduct, Products, setProducts)}
      {getPage(pageID, setPageID, Products, setProducts, curPostID, setCurProduct, addNewProduct, setAddNewProduct)}
    </div>
  );
}

function getPage(pageID, setPageID, Products, setProducts, curPostID, setCurProduct, addNewProduct, setAddNewProduct) {
  if (pageID == 0) {
    return renderGet(pageID, Products, setProducts);
  }
  if (pageID == 1) {
    return renderPostPage(Products, setProducts, addNewProduct, setAddNewProduct);
  }
  if (pageID == 2) {
    return renderPutPage(Products, curPostID, setProducts);
  }
  if (pageID == 4){
    return (<div>
      Kenny Epstein kepstein@iastate.edu
      <br></br>
      Austin Dart aedart@iastate.edu
      <br></br>
      COMS 319 Construction of User Interfaces
      <br></br>
      Taught by Prof Abraham Aldaco
    </div>)
  }
}

function navBar(setPageID, setCurProduct, Products, setProducts) {
  return (
    <div style={{ marginRight: "75%" }}>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => setIds(setPageID, 0, setCurProduct, Products, setProducts)}>Get Post</button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => setIds(setPageID, 1, setCurProduct, Products, setProducts)}>Post Post</button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => setIds(setPageID, 2, setCurProduct, Products, setProducts)}>Put Post</button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => setIds(setPageID, 3, setCurProduct, Products, setProducts)}>Delete Post</button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => setIds(setPageID, 4, setCurProduct, Products, setProducts)}>About Page</button>
      <br></br>
      <label for="idText">Id of Put or Delete</label>
      <input id="idText" type='number' style={{ width: "20%", border: "solid" }}></input>
    </div>
  )
}
function setIds(setPageID, id, setCurProduct, Products, setProducts) {
  setPageID(id);
  if (id == 2) {
    setCurProduct(document.getElementById("idText").value);
  }
  if (id == 3) {
    deleteOneProduct(document.getElementById("idText").value)
    setPageID(0);
  }
  getAllProducts(setProducts);
}

function renderGet(pageID, Products, setProducts) {
  return (
    <div>
      {Products.map((cur_product, index) => (
        <div>
          {renderSingleProduct(cur_product)}
        </div >
      ))
      }
    </div >
  )
}

function renderSingleProduct(cur_product) {
  return (
    <div style={{ border: "solid", position: "relative", marginTop: "2%" }} className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <h1>
        {cur_product.title}
      </h1>
      <p>
        Category: {cur_product.category}
      </p>
      <img src={cur_product.image}></img>
      <h2>
        ${cur_product.price}
      </h2>
      <p style={{ color: "gray" }}>
        {cur_product.description}
      </p>
      <p>
        Product ID: {cur_product.id}
      </p>
      <p>
        Rating: {cur_product.rating.rate} / 5<br></br>
        ({cur_product.rating.count} ratings)
      </p>
    </div>
  );
}
function editPage() {
  return (
    <div>

      <form>
        <div class="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
            <input type="text" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title" required>
            </input>
          </div>
          <div>
            <label for="Price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
            <input type="text" id="Price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Price" required>

            </input>
          </div>
          <div>
            <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
            <input type="text" id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Category" required>

            </input>
          </div>
          <div>
            <label for="image" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">image</label>
            <input type="tel" id="image" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Image" required>

            </input>
          </div>
          <div>
            <label for="rating-rate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rating: Rate</label>
            <input type="url" id="rating-rate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Rating: Rate" required>

            </input>
          </div>
          <div>
            <label for="rating-count" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rating: Count</label>
            <input type="number" id="rating-count" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Rating: Count" required>

            </input>
          </div>
        </div>
        <div class="mb-6">
          <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
          <input type="textarea" id="description" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description" required>

          </input>
        </div>
      </form>

    </div>
  )
}
function getDataFromInput(addNewProduct, setAddNewProduct,highestId) {
  let x = (
    {
      title: document.getElementById("title").value,
      price: document.getElementById("Price").value,
      description: document.getElementById("description").value,
      category: document.getElementById("category").value,
      image: document.getElementById("image").value,
      rating: {
        rate: document.getElementById("rating-rate").value,
        count: document.getElementById("rating-count").value
      },
    }
  );
  console.log(x);
  postMethod(x,highestId);
}
function renderPostPage(Product, setProducts, addNewProduct, setAddNewProduct) {
  let highestId = 0;
  for (let i = 0; i < Product.length; i++) {
    if (Product[i].id > highestId) {
      highestId = Product[i].id;
    }
  }
  highestId++; //set it to next ID
  return (
    <div>
      {editPage([])}
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => getDataFromInput(addNewProduct, setAddNewProduct,highestId)}>Submit</button>
    </div>
  )
}
function renderPutPage(Product, id, setProducts) {
  console.log(id == Product[1].id);
  for (let i = 0; i < Product.length; i++) {
    console.log(Product[i]);
    if (Product[i].id + "" == id + "") {
      console.log("found");
      return (
        <div>
          {renderSingleProduct(Product[i])}
          <div>
            <label for="price_edit" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
            <input type="text" id="price_edit" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Price" required>
            </input>
          </div>
          <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => updatePrice(Product[i], setProducts)}>Submit</button>
        </div>
      )
    }
  }
}
function updatePrice(Product, setProducts) {
  Product.price = document.getElementById("price_edit").value;
  putMethod(Product, setProducts);
}
function getData() {

}

export default App;