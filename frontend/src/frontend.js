export function getAllProducts(setProduct) {
    fetch("http://127.0.0.1:8081/api/get")
        .then((response) => response.json())
        .then((data) => {
            console.log("Show Catalog of Products :");
            console.log(data);
            setProduct(data);
        });
}

export function deleteOneProduct(deleteid) {
    console.log("Product to delete :", deleteid);
    console.log(JSON.stringify({ id: deleteid }));
    fetch("http://localhost:8081/api/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteid}),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Delete a product completed : ", deleteid);
            console.log(data);
            if (data) {
                const key = Object.keys(data);
                const value = Object.values(data);
                alert(key + value);
            }
        });
    console.log("test");
    //setChecked4(!checked4);
}

export function postMethod(addNewProduct,highestId) {
    console.log(addNewProduct);
    let product = {
        id: highestId,
        title: addNewProduct.title,
        price: addNewProduct.price,
        description: addNewProduct.description,
        category: addNewProduct.category,
        image: addNewProduct.image,
        rate: addNewProduct.rating.rate,
        count: addNewProduct.rating.count
    }
    fetch("http://127.0.0.1:8081/api/post", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(product)
    }).then((response) => response.json())
    .then((data) => {
        console.log("POST completed")
        console.log(data);
        if(data){
            const key = Object.keys(data);
            const value = Object.values(data);
            alert(key + value);
        }
    });
}
export function putMethod(Product){
    console.log(Product);
    let newProduct = {
        id: Product.id,
        title: Product.title,
        price: Product.price,
        description: Product.description,
        category: Product.category,
        image: Product.image,
        rate: Product.rating.rate,
        count: Product.rating.count
    };
    fetch("http://127.0.0.1:8081/api/update",{
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct)
});
}