const data = [
  {
    id: 0,
    Produk: "beras",
    harga: 60000,
    kategori: "Bahan Makanan",
    img: "assets/sembako/beras.jpg",
  },
  {
    id: 1,
    Produk: "telur",
    harga: 50000,
    kategori: "Bahan Makanan",
    img: "assets/sembako/telur.jpg",
  },
  {
    id: 2,
    Produk: "Teh Pucuk",
    harga: 6000,
    kategori: "minuman",
    img: "assets/sembako/teh pucuk.jpg",
  },
  {
    id: 3,
    Produk: "Minyak",
    harga: 14000,
    kategori: "Bahan makanan",
    img: "assets/sembako/minyak.jpg",
  },
  {
    id: 4,
    Produk: "Gula",
    harga: 10000,
    kategori: "Bahan makanan",
    img: "assets/sembako/gula.jpg",
  },
  {
    id: 5,
    Produk: "Mie",
    harga: 14000,
    kategori: "Bahan makanan",
    img: "assets/sembako/mie.jpg",
  },
];

let cart = [];
let costumer = [];
let pembeli = []
let customerId = 0;
const cardProduct = document.getElementById("card-product");

function displayProduk() {
  let card = "";
  data.map((item, index) => {
    card = `
    <div class="col-md-3 col mt-3 d-flex justify-content-center p-4 card-product">
      <div class="card" style="width: 12rem;">
      <input type="hidden" class="form-control" id="input-idSimpan" value="${item.id}">
        <img src="${item.img}" class="card-img-top" alt="...">
        <div class="card-body">
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><span>Produk</span>: ${item.Produk}</li>
            <li class="list-group-item"><span>Harga</span>: ${item.harga}</li>
          </ul>
            <button type="button" class="btn btn-success btn-edit"  onclick=savePembeli("${item.id}") data-bs-toggle="modal" data-bs-target="#saveModal" data-id="${index}">Beli</button>
          
        </div>
      </div>
    </div>
    `;
    cardProduct.innerHTML += card;
  });
}
displayProduk()

function savePembeli(id){
  const namaBarang = document.getElementById('input-idSimpan')
  const hargaAwal = document.getElementById('hargaAwal')
  const jmlSimpan = document.getElementById("jmlSimpan");
  namaBarang.value = data[id].id
  hargaAwal.innerHTML = data[id].harga 
}

function harga(){

}


function beli(){
  const nama = document.getElementById("namaSimpan");
  const alamat = document.getElementById("alamatSimpan");
  const jmlSimpan = document.getElementById("jmlSimpan");
  const namaBarang = document.getElementById('input-idSimpan').value
  const hargaAwal = document.getElementById('hargaAwal')
 
  let dataPembeli = {
    id:  customerId,
    nama: nama.value,
    alamat: alamat.value,
    jumlah:jmlSimpan.value,
    produk:data[namaBarang].Produk,
    harga:hargaAwal.textContent,
    totalBelanja : hargaAwal.textContent * jmlSimpan.value
 
    // namaBarang:namaBarang
    // total: totalBelanja,
  };

  pembeli.push(dataPembeli);
  customerId++
  console.log(pembeli);
  nama.value = ""
  alamat.value = ""
  jmlSimpan.value = ""
  displayCustomer()
}

function addToCart(index) {
  const selectedItem = data.find((item) => item.id === index);

  if (selectedItem) {
    let dataProduk = {
      id: data[index].id,
      nama: data[index].Produk,
      jumlah: 1,
      harga: data[index].harga,
      img: data[index].img,
    };
    cart.push(dataProduk);

    const cartLength = document.getElementById("cart-length");
    cartLength.textContent = cart.length;
  }
}

const formBeli = document.getElementById("form-beli");

formBeli.addEventListener("submit", (e) => {
  e.preventDefault();

  const totalBelanja = cart.reduce((total, item) => total + item.harga, 0);
  const nama = document.getElementById("nama").value;
  const alamat = document.getElementById("alamat").value;

  let dataPembeli = {
    id:  customerId,
    nama: nama,
    alamat: alamat,
    keranjang: [...cart],
    total: totalBelanja,
  };

  costumer.push(dataPembeli);
  cart.splice(0, cart.length);
  customerId++;

  e.target.reset();
  const cartLength = document.getElementById("cart-length");
  cartLength.textContent = cart.length;
  displayCustomer();
});

function displayCustomer() {
  const rowCostumer = document.getElementById("pembeli-table");
  rowCostumer.innerHTML = "";
  let cardCustomer = "";
  if (pembeli.length > 0) {
    pembeli.map((item, index) => {
      cardCustomer = `
      <input type="hidden" value="${item.id}" id="inputID-${index}" />
      <tr>
      <th scope="row">${item.nama}</th>
      <td>${item.produk}</td>
      <td>${item.alamat}</td>
      <td>${item.harga * item.jumlah}</td>
      <td><div class="btn-container"> 
      <button type="button" class="btn btn-success btn-edit"  onclick="saveEdit(${
        item.id
      })" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${index}">Edit</button>
      <button type="button" class="btn btn-danger" onclick="deleteData(${index})">Hapus</button>
      </div>    </td>
    </tr>
      `;
      rowCostumer.innerHTML += cardCustomer;
        
        


    });
  } else {
    cardCustomer = "<p>Tidak ada data customer</p>";
    rowCostumer.innerHTML += cardCustomer;
  }
}

function deleteData(index) {
  pembeli.splice(index, 1);
  displayCustomer();
}



function saveEdit(index) {
  const namaEdit = document.getElementById("nama-edit");
  const alamatEdit = document.getElementById("alamat-edit");
  const inputID = document.getElementById(`input-id`)
  const jumlahEdit = document.getElementById(`jumlah-edit`)
  inputID.value = pembeli[index].id
  namaEdit.value = pembeli[index].nama;
  alamatEdit.value = pembeli[index].alamat;
  jumlahEdit.value = pembeli[index].jumlah;

  const editBtn = document.getElementById("edit-btn");
 
editBtn.addEventListener("click", (e) => {

  const namaEdit = document.getElementById("nama-edit");
  const alamatEdit = document.getElementById("alamat-edit");
  const jumlahEdit = document.getElementById(`jumlah-edit`)

 console.log(inputID.value);
  
    pembeli[inputID.value].nama = namaEdit.value;
    pembeli[inputID.value].alamat = alamatEdit.value;
    pembeli[inputID.value].jumlah = jumlahEdit.value;
   
  

  displayCustomer();
});
  
}





function toggleCart() {
  document.querySelector(".sidecart").classList.toggle("open-cart");

  console.log(cart);
  displayCart();
}

function displayCart() {
  const listCart = document.getElementById("list-cart");
  listCart.innerHTML = "";
  let content = "";
  if (cart.length > 0) {
    cart.map((barang, index) => {
      content = `
      <li class="nav-link d-flex flex-wrap flex-row">
      <div class="col-4 p-0">
        <img class="img-fluid" src="${barang.img}" alt="">
      </div>
      <div class="col-2 bg-primary text-light justify-content-around d-flex flex-column">
        <i class="fas fa-plus" onclick="tambahJumlah(${index})">+</i>
        <div class="product-quantity m-0 p-0 h5">${barang.jumlah}</div>
        <i class="fas fa-minus" onclick="kurangjumlah(${index})">-</i>
      </div>
      <div class="sidecart-price pl-0 col-6 bg-primary text-right d-flex flex-wrap text-light">
        <div class="text-right text-dark d-flex flex-row justify-content-end align-items-center h6 m-0 p-0 remover">Remover <span class="h5 ml-2 m-0 p-0 " onclick="removeCart(${index})"><b>X</b></span></div>
        <div class="product-price">Rp. ${barang.harga}</div>
       
      </div>
    </li>
      `;

      listCart.innerHTML += content;
    });
    const sidecartTotal = document.getElementById("sidecart-total-products");
    const totalBelanja = cart.reduce((total, item) => total + item.harga, 0);
    sidecartTotal.textContent = "Rp." + totalBelanja;
  }
}

function removeCart(index) {
  cart.splice(index, 1);
  displayCart();
  const cartLength = document.getElementById("cart-length");
  cartLength.textContent = cart.length;
}

function tambahJumlah(index) {
  const hargaAwal = data.find((item) => item.id === data[index].id).harga;
  if (data[index]) {
    data[index].jumlah += 1;

    data[index].harga = cart[index].jumlah * hargaAwal;

    displayCart();
  }
}

function kurangjumlah(index) {
  const hargaAwal = data.find((item) => item.id === data[index].id).harga;
  if (data[index]) {
    data[index].jumlah -= 1;
    data[index].harga = data[index].harga - hargaAwal;
    if (data[index].jumlah < 1) {
      data[index].jumlah = 1;
      data[index].harga = hargaAwal;
    }

    displayCart();
  }
}
const closeCart = document.getElementById("close-cart");

closeCart.addEventListener("click", () => {
  document.querySelector(".sidecart").classList.toggle("open-cart");
});

displayProduk();



{/* <div class="col-sm-4 card-container">
<div class="card card-user" style="width: 10rem; ">

  <!-- <img src="..." class="card-img-top" alt="..."> -->
  <div class="card-body">
  <input type="hidden" value="${item.id}" id="inputID-${index}" />
    <ul class="list-group list-group-flush">
      <li class="list-group-item"><span>Nama</span>: ${item.nama}</li>
      <li class="list-group-item"><span>Alamat</span>: ${item.alamat}</li>
      <li class="list-group-item"><span>Belanjaan</span>: ${item.produk
      }</li>
      <li class="list-group-item"><span>Total Harga</span>:</li>
      ${item.harga * item.jumlah}
    </ul>
    <div class="btn-container"> 
    <button type="button" class="btn btn-outline-success btn-edit"  onclick="saveEdit(${
      item.id
    })" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${index}">Edit</button>
    <button type="button" class="btn btn-outline-danger" onclick="deleteData(${index})">Hapus</button>
    </div>         
  </div>
</div>
</div>     */}