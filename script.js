const PASSWORD = "4030";

const adminBtn = document.getElementById("adminBtn");
const adminPanel = document.getElementById("adminPanel");
const loginBtn = document.getElementById("login");
const closePanel = document.getElementById("closePanel");
const adminArea = document.getElementById("adminArea");

const nameInput = document.getElementById("productName");
const priceInput = document.getElementById("productPrice");
const categoryInput = document.getElementById("productCategory");
const imageInput = document.getElementById("productImage");
const saveBtn = document.getElementById("saveProduct");

const productsBox = document.getElementById("products");

let currentCategory = "همه";

let products = JSON.parse(localStorage.getItem("cafeProducts")) || [];

function saveProducts(){
    localStorage.setItem(
        "cafeProducts",
        JSON.stringify(products)
    );
}

function renderProducts(){

    productsBox.innerHTML = "";

    let list = products;

    if(currentCategory !== "همه"){
        list = products.filter(
            p => p.category === currentCategory
        );
    }

    list.forEach((item,index)=>{

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <img src="${item.image}">
            <div class="info">
                <h3>${item.name}</h3>

                <div class="category">
                    ${item.category}
                </div>

                <div class="price">
                    ${Number(item.price).toLocaleString()} تومان
                </div>

                <button
                class="deleteBtn"
                onclick="deleteProduct(${index})">

                حذف محصول

                </button>

            </div>
        `;

        productsBox.appendChild(card);

    });

}

renderProducts();
adminBtn.onclick = () => {
    adminPanel.style.display = "flex";
};

closePanel.onclick = () => {
    adminPanel.style.display = "none";
};

loginBtn.onclick = () => {

    if(document.getElementById("password").value === PASSWORD){

        adminArea.style.display = "block";

        alert("ورود موفق");

    }else{

        alert("رمز اشتباه است");

    }

};

saveBtn.onclick = () => {

    if(
        nameInput.value.trim()==="" ||
        priceInput.value.trim()==="" ||
        !imageInput.files.length
    ){

        alert("همه فیلدها را تکمیل کنید.");

        return;

    }

    const reader = new FileReader();

    reader.onload = function(e){

        products.push({

            name:nameInput.value,

            price:priceInput.value,

            category:categoryInput.value,

            image:e.target.result

        });

        saveProducts();

        renderProducts();

        nameInput.value="";
        priceInput.value="";
        imageInput.value="";

        alert("محصول ثبت شد.");

    };

    reader.readAsDataURL(imageInput.files[0]);

};

function deleteProduct(index){

    const pass = prompt("رمز حذف:");

    if(pass !== PASSWORD){

        alert("رمز اشتباه است.");

        return;

    }

    products.splice(index,1);

    saveProducts();

    renderProducts();

}

document.querySelectorAll(".cat").forEach(btn=>{

    btn.onclick = ()=>{

        document
        .querySelectorAll(".cat")
        .forEach(c=>c.classList.remove("active"));

        btn.classList.add("active");

        currentCategory = btn.dataset.category;

        renderProducts();

    };

});

const logo = document.getElementById("logoImage");
const placeholder = document.getElementById("logoPlaceholder");

logo.onload = () => {
    placeholder.style.display = "none";
};

logo.onerror = () => {
    logo.style.display = "none";
    placeholder.style.display = "flex";
};

window.addEventListener("load", renderProducts);
