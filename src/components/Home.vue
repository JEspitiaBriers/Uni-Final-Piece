<template>
	<div class="cardContainer">
		<div class="row">
			<div class="col">
				<div class="card" style="width: 278px;">
					<img class="card-img-top" :src="itemsObject[0].Image" :alt="itemsObject[0].Alt"
						style="height: 166.8px; width: 278px;">
					<div class="card-body">
						<h5 class="card-title">{{ itemsObject[0].Title }}</h5>
						<p class="card-text">{{ itemsObject[0].Description }}
						</p>
					</div>
					<ul class="list-group list-group-flush">
						<li class="list-group-item">£{{ itemsObject[0].Price }}
							<a class="card-link" @click="addToBasket(itemsObject[0].ID)"><i class="bi bi-cart-plus"></i></a>
							<a class="card-link" @click="addToWishList(itemsObject[0].ID)"><i class="bi bi-bag-heart"></i></a>
						</li>
					</ul>
				</div>
			</div>
			<div class="col">
				<div class="card" style="width: 278px;">
					<img class="card-img-top" :src="itemsObject[0].Image" :alt="itemsObject[0].Alt"
						style="height: 166.8px; width: 278px;">
					<div class="card-body">
						<h5 class="card-title">{{ itemsObject[0].Title }}</h5>
						<p class="card-text">{{ itemsObject[0].Description }}
						</p>
					</div>
					<ul class="list-group list-group-flush">
						<li class="list-group-item">£{{ itemsObject[0].Price }}
							<a class="card-link" @click="addToBasket(itemsObject[0].ID)"><i class="bi bi-cart-plus"></i></a>
							<a class="card-link" @click="addToWishList(itemsObject[0].ID)"><i class="bi bi-bag-heart"></i></a>
						</li>
					</ul>
				</div>
			</div>
			<div class="col">
				<div class="card" style="width: 278px;">
					<img class="card-img-top" :src="itemsObject[0].Image" :alt="itemsObject[0].Alt"
						style="height: 166.8px; width: 278px;">
					<div class="card-body">
						<h5 class="card-title">{{ itemsObject[0].Title }}</h5>
						<p class="card-text">{{ itemsObject[0].Description }}
						</p>
					</div>
					<ul class="list-group list-group-flush">
						<li class="list-group-item">£{{ itemsObject[0].Price }}
							<a class="card-link" @click="addToBasket(itemsObject[0].ID)"><i class="bi bi-cart-plus"></i></a>
							<a class="card-link" @click="addToWishList(itemsObject[0].ID)"><i class="bi bi-bag-heart"></i></a>
						</li>
					</ul>
				</div>
			</div>
			<div class="col">
				<div class="card" style="width: 278px;">
					<img class="card-img-top" :src="itemsObject[0].Image" :alt="itemsObject[0].Alt"
						style="height: 166.8px; width: 278px;">
					<div class="card-body">
						<h5 class="card-title">{{ itemsObject[0].Title }}</h5>
						<p class="card-text">{{ itemsObject[0].Description }}
						</p>
					</div>
					<ul class="list-group list-group-flush">
						<li class="list-group-item">£{{ itemsObject[0].Price }}
							<a class="card-link" @click="addToBasket(itemsObject[0].ID)"><i class="bi bi-cart-plus"></i></a>
							<a class="card-link" @click="addToWishList(itemsObject[0].ID)"><i class="bi bi-bag-heart"></i></a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>


	<!-- <div v-for="(item, index) in itemsObject">
			<div v-if="index % 5 == 0 || index == 0">
				<div class="row">
					<div class="col" v-for="item in itemsObject.slice(index, index + 5)"> 
						<div class="card" style="width: 278px;">
							<img class="card-img-top" :src="item.Image" :alt="item.Alt" style="height: 166.8px; width: 278px;">
							<div class="card-body">
								<h5 class="card-title">{{ item.Title }}</h5>
								<p class="card-text">{{ item.Description }}
								</p>
							</div>
							<ul class="list-group list-group-flush">
								<li class="list-group-item">£{{ item.Price }}
									<a class="card-link" @click="addToBasket(item.ID)"><i class="bi bi-cart-plus"></i></a>
									<a class="card-link" @click="addToWishList(item.ID)"><i class="bi bi-bag-heart"></i></a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div> -->
</template>

<script setup>
import { ref, VueElement } from 'vue'
// addToWishList(){

// }

// addToBasket(){

// }

let itemsObject = [{
	ID: "001",
	Image: '/src/assets/Image_not_available.png',
	Alt: "No Image Available",
	Title: "Large Enclosure - Tall",
	Description: "180x100x100(cm) enclosure with glass sliding doors",
	Price: "89.99"
},
{
	ID: "002",
	Image: '/src/assets/Image_not_available.png',
	Alt: "No Image Available",
	Title: "Large Enclosure - Medium",
	Description: "180x100x80(cm) enclosure with glass sliding doors",
	Price: "69.99"
},
{
	ID: "003",
	Image: '/src/assets/Image_not_available.png',
	Alt: "No Image Available",
	Title: "Large Enclosure - Short",
	Description: "180x100x60(cm) enclosure with glass sliding doors",
	Price: "49.99"
},
{
	ID: "004",
	Image: '/src/assets/Image_not_available.png',
	Alt: "No Image Available",
	Title: "Medium Enclosure - Tall",
	Description: "140x80x100(cm) enclosure with glass sliding doors",
	Price: "79.99"
},
{
	ID: "005",
	Image: '/src/assets/Image_not_available.png',
	Alt: "No Image Available",
	Title: "Medium Enclosure - Medium",
	Description: "140x80x80(cm) enclosure with glass sliding doors",
	Price: "59.99"
},
{
	ID: "006",
	Image: '/src/assets/Image_not_available.png',
	Alt: "No Image Available",
	Title: "Medium Enclosure - Short",
	Description: "140x80x60(cm) enclosure with glass sliding doors",
	Price: "39.99"
},
{
	ID: "007",
	Image: '/src/assets/Image_not_available.png',
	Alt: "No Image Available",
	Title: "Small Enclosure - Tall",
	Description: "100x60x100(cm) enclosure with glass sliding doors",
	Price: "59.99"
},
{
	ID: "008",
	Image: '/src/assets/Image_not_available.png',
	Alt: "No Image Available",
	Title: "Small Enclosure - Medium",
	Description: "100x60x80(cm) enclosure with glass sliding doors",
	Price: "45.99"
},
{
	ID: "009",
	Image: '/src/assets/Image_not_available.png',
	Alt: "No Image Available",
	Title: "Small Enclosure - Short",
	Description: "100x60x60(cm) enclosure with glass sliding doors",
	Price: "30.99"
},
];
</script>

<style>
.cardContainer {
	margin-top: 80px;
}
</style>