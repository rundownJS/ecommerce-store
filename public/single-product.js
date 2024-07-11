const setName = new URLSearchParams(window.location.search).get("product")
document.title = `Sell2You: ${setName || "Not Found"}`


//get product and display it
const getProduct = async () =>{
    const url = new URL(window.location.href)
    const getParams = new URLSearchParams(url.search)

    const productName = getParams.get("product")

    const MAIN_CONTENT = document.querySelector(".main-content-wrapper")

    if(productName){
        //true try to send a request
        try{
            const request = await fetch(`/api/v1/ecom_store/product/${encodeURIComponent(productName)}`)
            const { productInfo } = await request.json()
            document.title = `Sell2You: ${productInfo.name || "Not Found"}`

            //console.log(productInfo)

            displayProduct(productInfo)

        }catch(err){
            //404 no product
            document.title = `Sell2You: Not Found`
            MAIN_CONTENT.innerHTML = `
            <div class="product-not-found">
                <img src="./product-not-found.png"/>
                <span>We were not able to find the product you're looking for!</span>
                <span>Visit our <a href="/home.html">home page</a> for a variety of products.</span>
            </div>
            `

            //console.log(err)
        }
    }else{
        //404 no product
        MAIN_CONTENT.innerHTML = `
        <div class="product-not-found">
            <img src="./product-not-found.png"/>
            <span>We were not able to find the product you're looking for!</span>
            <span>Visit our <a href="/home.html">home page</a> for a variety of products.</span>
        </div>
        `
    }
}

const displayProduct = (product) =>{
    const { price, picture1, picture2, picture3, picture4, name, desc, freeDelivery } = product
    
    //console.log(price, picture1, picture2, picture3, picture4, name, desc, freeDelivery)

    const productContent = document.querySelector(".product-content")
    productContent.innerHTML = `
    <div class="product-pictures">
        <div class="picture-big">
            <div class="picture-carousel">
                <img id="picture1" src="./images/${picture1}"/>
                <img id="picture2" src="./images/${picture2}"/>
                <img id="picture3" src="./images/${picture3}"/>
                <img id="picture4" src="./images/${picture4}"/>
            </div>
            <div class="arrow-left-picture">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
            </div>
            <div class="arrow-right-picture">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
            </div>
        </div>
        <div class="small-pictures">
            <div class="small-picture1">
                <img src="./images/${picture1}" />
            </div>
            <div class="small-picture2">
                <img src="./images/${picture2}" />
            </div>
            <div class="small-picture3">
                <img src="./images/${picture3}" />
            </div>
            <div class="small-picture4">
                <img src="./images/${picture4}" />
            </div>
        </div>
    </div>

    <div class="product-details">
        <span class="product-name ${name.length < 60 ? "big" : "small"}">${name}</span>
        <span class="product-desc">${desc}</span>

        <div class="price-quantity-cart">
            <div class="quantity-wrapper">
                <span class="q-text">Quantity:</span>
                <div class="button-wrap">
                    <div class="button-less invalid"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg></div>
                    <span class="product-quantity">1</span>
                    <div class="button-more"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg></div>
                </div>
            </div>

            <div class="add-to-cart">
                <span>Add to cart</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
            </div>

            <div class="price-wrapper">
                <span class="product-price">$ ${Number(price).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}</span>
                <span class="shipping-${freeDelivery}">Free Shipping*</span>
            </div>
        </div>
    </div>
    `
    const productContentSMALL = document.querySelector(".product-content-small-screen")
    productContentSMALL.innerHTML = `
    <span class="product-name-small">${name}</span>

    <div class="small-screens-pictures">
        <div class="picture-carousel-small">
            <img  id="picture1" src="./images/${picture1}"/>
            <img  id="picture2" src="./images/${picture2}"/>
            <img  id="picture3" src="./images/${picture3}"/>
            <img  id="picture4" src="./images/${picture4}"/>
        </div>

        <div class="small-pictures-small">
            <div class="small-picture-small1">
                <img src="./images/${picture1}" />
            </div>
            <div class="small-picture-small2">
                <img src="./images/${picture2}" />
            </div>
            <div class="small-picture-small3">
                <img src="./images/${picture3}" />
            </div>
            <div class="small-picture-small4">
                <img src="./images/${picture4}" />
            </div>
        </div>
    </div>

    <div class="small-price-wrapper">
        <span class="product-price-small">$ ${Number(price).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
        })}</span>

        <span class="shipping-${freeDelivery}-small">Free Shipping*</span>
    </div>

    <div class="quantity-small">
        <span>Quantity:</span>
        <div class="q-buttons-wrapper">
            <div class="button-less-small invalid">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"></path></svg>
            </div>
            <span class="product-quantity-small">1</span>
            <div class="button-more-small">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path></svg>
            </div>
        </div>
    </div>

    <div class="add-cart-small">
        <span>Add to cart</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
    </div>

    <span class="desc-small">
        ${desc}
    </span>

    `

    const mainContentWrapper = document.querySelector(".main-content-wrapper") 
    mainContentWrapper.innerHTML += `
    <div class="bigger-product-images">
        <div class="parent">
            <div class="arrow-left-big-picture">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
            </div>
            <div class="big-picture">
                <img src=""/>
            </div>
            <div class="arrow-right-big-picture">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
            </div>

            <svg class="close-x" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path></svg>
        </div>
    </div>
    `

    const descElement = document.querySelector(".product-desc")

    if(descElement){
        if(descElement.clientHeight > 300){
            descElement.style.margin = "15px 0"
        }else if(descElement.clientHeight > 270){
            descElement.style.margin = "30px 0"
        }else if(descElement.clientHeight > 250){
            descElement.style.margin = "40px 0"
        }
    }

    let amount = 1
    const moreButton = document.querySelector(".button-more")
    const lessButton = document.querySelector(".button-less")
    const productQuantity = document.querySelector(".product-quantity")

    const moreButtonSMALL = document.querySelector(".button-more-small")
    const lessButtonSMALL = document.querySelector(".button-less-small")
    const productQuantitySMALL = document.querySelector(".product-quantity-small")    

    moreButton.addEventListener("click", ()=>{
        amount++
        productQuantity.textContent = amount
        productQuantitySMALL.textContent = amount

        lessButton.classList.remove("invalid")
        lessButtonSMALL.classList.remove("invalid")

        if(amount > 8){
            amount = 9
            productQuantity.textContent = amount
            productQuantitySMALL.textContent = amount

            moreButton.classList.add("invalid")
            moreButtonSMALL.classList.add("invalid")
        }
    })

    lessButton.addEventListener("click", ()=>{
        amount--
        productQuantity.textContent = amount
        productQuantitySMALL.textContent = amount

        moreButton.classList.remove("invalid")
        moreButtonSMALL.classList.remove("invalid")

        if(amount < 2){
            amount = 1
            productQuantity.textContent = amount
            productQuantitySMALL.textContent = amount

            lessButton.classList.add("invalid")
            lessButtonSMALL.classList.add("invalid")
        }
    })

    moreButtonSMALL.addEventListener("click", ()=>{
        amount++
        productQuantity.textContent = amount
        productQuantitySMALL.textContent = amount

        lessButton.classList.remove("invalid")
        lessButtonSMALL.classList.remove("invalid")

        if(amount > 8){
            amount = 9
            productQuantity.textContent = amount
            productQuantitySMALL.textContent = amount

            moreButton.classList.add("invalid")
            moreButtonSMALL.classList.add("invalid")
        }
    })

    lessButtonSMALL.addEventListener("click", ()=>{
        amount--
        productQuantity.textContent = amount
        productQuantitySMALL.textContent = amount

        moreButton.classList.remove("invalid")
        moreButtonSMALL.classList.remove("invalid")

        if(amount < 2){
            amount = 1
            productQuantity.textContent = amount
            productQuantitySMALL.textContent = amount

            lessButton.classList.add("invalid")
            lessButtonSMALL.classList.add("invalid")
        }
    })

    const imageCarousel = document.querySelector(".picture-carousel")
    const imageWidth = document.querySelector(".picture-carousel > img")
    const leftButton = document.querySelector(".arrow-left-picture")
    const rightButton = document.querySelector(".arrow-right-picture")

    const allSmallImages = document.querySelectorAll(".small-pictures > div")

    const allSmallImagesSMALLScreen = document.querySelectorAll(".small-pictures-small > div")
    const imageWidthSMALL = document.querySelector(".picture-carousel-small > img")
    const smallCarousel = document.querySelector(".picture-carousel-small")

    leftButton.addEventListener("click", (e)=>{
        e.stopPropagation()
        if(imageCarousel.scrollLeft === 0){
            imageCarousel.scrollLeft = imageCarousel.scrollWidth - imageCarousel.clientWidth
        }else {
            imageCarousel.scrollLeft -= imageWidth.clientWidth
        }
    })

    rightButton.addEventListener("click", (e)=>{
        e.stopPropagation()
        if(imageCarousel.scrollLeft + imageCarousel.clientWidth >= imageCarousel.scrollWidth){
            imageCarousel.scrollLeft = 0
        }else {
            imageCarousel.scrollLeft += imageWidth.clientWidth
        }
    })

    for(let i = 0; i < allSmallImages.length; i++){
        allSmallImages[i].addEventListener("click", ()=>{
            imageCarousel.scrollLeft = i * imageWidth.clientWidth
        })

        allSmallImagesSMALLScreen[i].addEventListener("click", ()=>{
            smallCarousel.scrollLeft = i * imageWidthSMALL.clientWidth
            
        })
    }

    const bigPicture = document.querySelector(".picture-big")
    const biggerPicturesWrapperElement = document.querySelector(".bigger-product-images")
    const fitImage = document.querySelector(".big-picture > img")
    const fitImageParent = document.querySelector(".big-picture")


    let bigPictureIndex = String
    const buttonLeftBigPicture = document.querySelector(".arrow-left-big-picture")
    const buttonRightBigPicture = document.querySelector(".arrow-right-big-picture")

    buttonLeftBigPicture.addEventListener("click", ()=>{
        bigPictureIndex-=1
        
        if(bigPictureIndex === 0){
            bigPictureIndex = 4
            fitImage.src = `./images/${picture4}`
        }else if(bigPictureIndex === 1){
            fitImage.src = `./images/${picture1}`
        }else if(bigPictureIndex === 2){
            fitImage.src = `./images/${picture2}`
        }else if(bigPictureIndex === 3){
            fitImage.src = `./images/${picture3}`
        }
    })
    buttonRightBigPicture.addEventListener("click", ()=>{
        bigPictureIndex++
        
        if(bigPictureIndex === 5){
            bigPictureIndex = 1
            fitImage.src = `./images/${picture1}`
        }else if(bigPictureIndex  === 2){
            fitImage.src = `./images/${picture2}`
        }else if(bigPictureIndex  === 3){
            fitImage.src = `./images/${picture3}`
        }else if(bigPictureIndex === 4){
            fitImage.src = `./images/${picture4}`
        }
    })

    const parent = document.querySelector(".parent")
    parent.addEventListener("click", e => e.stopPropagation())

    bigPicture.addEventListener("click", (e)=>{
        e.stopPropagation()
        document.body.style.overflowY = "hidden"

        biggerPicturesWrapperElement.classList.add("show")
        fitImage.src = e.target.src
        bigPictureIndex = Number(e.target.id[e.target.id.length - 1])

        parent.classList.add("show")

        if(CART_PARENT_EL.classList.contains("move-show")){
            CART_PARENT_EL.classList.remove("move-show")
            CART_PARENT_EL.classList.add("move-hide")

            CART_PARENT_EL.addEventListener("animationend", ()=>{
                CART_PARENT_EL.classList.remove("move-hide")
            })
        }
    })

    //add the event listener to both buttons
    const cartButton = document.querySelector(".add-to-cart")
    const cartButtonSMALL = document.querySelector(".add-cart-small")

    cartButton.addEventListener("click", ()=>{
        addProduct(product, amount)
    })
    cartButtonSMALL.addEventListener("click", ()=>{
        addProduct(product, amount)
    })

    //listen for a change in dimentions and change height
    const resizeObserver = new ResizeObserver(changes => {
        for (let change of changes){
            if(change.contentRect.height){
                change.target.style.height = Math.round(change.contentRect.width) + "px"
                parent.style.height = Math.round(change.contentRect.width + 64) + "px"
            }
        }
    })

    window.addEventListener("resize", ()=>{
        if(window.innerHeight < 800){
            resizeObserver.observe(fitImageParent)
        }else{
            resizeObserver.unobserve(fitImageParent)
        }
    })
    window.addEventListener("click", ()=>{
        if(biggerPicturesWrapperElement.classList.contains("show")){
            biggerPicturesWrapperElement.classList.remove("show")
            biggerPicturesWrapperElement.classList.add("hide")

            parent.classList.remove("show")
            parent.classList.add("hide")

            parent.addEventListener("animationend", ()=>{
                parent.classList.remove("hide")
                biggerPicturesWrapperElement.classList.remove("hide")
            })
            document.body.style.overflowY = "auto"
        }
    })
    const closeX = document.querySelector(".close-x")
    closeX.addEventListener("click", ()=>{
        if(biggerPicturesWrapperElement.classList.contains("show")){
            biggerPicturesWrapperElement.classList.remove("show")
            biggerPicturesWrapperElement.classList.add("hide")

            parent.classList.remove("show")
            parent.classList.add("hide")

            parent.addEventListener("animationend", ()=>{
                parent.classList.remove("hide")
                biggerPicturesWrapperElement.classList.remove("hide")
            })
            document.body.style.overflowY = "auto"
        }
    })
}

window.addEventListener("resize", ()=>{
    const desc = document.querySelector(".product-desc")

    if(desc){
        if(desc.clientHeight > 300){
            desc.style.margin = "15px 0"
        }else if(desc.clientHeight > 270){
            desc.style.margin = "30px 0"
        }else if(desc.clientHeight > 250){
            desc.style.margin = "40px 0"
        }else {
            desc.style.margin = "57px 0"
        }
    }
})


//event function to add a product to the cart
const addProduct = (productData, amount) =>{
    const { name, picture1, price } = productData

    const productDataJSON = JSON.stringify({name, picture1, price, amount})

    if(localStorage.getItem(name)){
        let currentProductAmount = localStorage.getItem(name)
        currentProductAmount = JSON.parse(currentProductAmount).amount

        amount = currentProductAmount + amount

        if(amount > 99){
            amount = 99
        }

        const updatedProductAmountDataJSON = JSON.stringify({name, picture1, price, amount})

        localStorage.setItem(name, updatedProductAmountDataJSON)
        if(localStorage.getItem("debug")){
            productsInCartAmount.textContent = localStorage.length - 1
        }else{
            productsInCartAmount.textContent = localStorage.length
        }
        
        //console.log(localStorage.getItem(name))
        //console.log(currentProductAmount)
        return
    }

    localStorage.setItem(name, productDataJSON)

    if(localStorage.getItem("debug")){
        productsInCartAmount.textContent = localStorage.length - 1
    }else{
        productsInCartAmount.textContent = localStorage.length
    }
}


//get all products from cart
//UNIVERSAL FOR ALL PAGES
const CART_ELEMENT = document.querySelector("div.cart")
const CART_PARENT_EL = document.querySelector(".cart-contents")
const CART_RELATIVE_EL = document.querySelector(".cart-contents-relative")

const getProductsFromCart = () =>{
    CART_PARENT_EL.classList.add("move-show")
    CART_PARENT_EL.addEventListener("click", e => e.stopPropagation())

    if(Math.round(window.scrollY) < 75){
        const scrollAmount = 75 - Math.round(window.scrollY)
        
        CART_PARENT_EL.style.top = scrollAmount + "px"
    }else{
        CART_PARENT_EL.style.top = 0
    }

    document.body.style.overflowY = "hidden"

    CART_RELATIVE_EL.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path></svg>
    `

    let TOTAL_PRICE = 0
    if((localStorage.getItem("debug") && localStorage.length > 1) || (!localStorage.getItem("debug") && localStorage.length)){
        //display products in the cart
        for(let i = 0; i < localStorage.length; i++){
            if(localStorage.key(i) === "debug"){
                continue
            }
            const { name, amount, picture1, price } = JSON.parse(localStorage.getItem(localStorage.key(i)))

            const productInCartElement = document.createElement("div")
            productInCartElement.classList.add("each-product-cart")

            productInCartElement.innerHTML = `
            <div class="product-cart-image">
                <img src="./images/${picture1}" />
            </div>
            <div class="name-quantity">
                <span class="product-cart-name ${name.length < 50 ? "bigger" : "smaller"}">${name}</span>
                <div class="cart-quantity-wrapper">
                    <div class="cart-button-less invalid">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"></path></svg>
                    </div>
                    <span class="in-cart-amount">${amount}</span>
                    <div class="cart-button-more">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"></path></svg>
                    </div>

                    <div class="remove-product">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path></svg>
                    </div>
                </div>
            </div>

            <span class="product-cart-price">$ ${Number(price * amount).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
            })}</span>
            `
            CART_RELATIVE_EL.appendChild(productInCartElement)
        }

        const ALLcartButtonMore = document.querySelectorAll(".cart-button-more")
        const ALLcartButtonLess = document.querySelectorAll(".cart-button-less")
        const ALLinCartAmountElement = document.querySelectorAll(".in-cart-amount")
        const ALLremoveProductX = document.querySelectorAll(".remove-product")
        const PRODUCT_ELEMENT = document.querySelectorAll(".each-product-cart")

        const PRODUCT_NAME = document.querySelectorAll(".product-cart-name")
        const PRODUCT_PRICE = document.querySelectorAll(".product-cart-price")
        const PRODUCT_IMAGE = document.querySelectorAll(".product-cart-image")

        for(let i = 0; i < ALLcartButtonMore.length; i++){
            let inCartAmountNumber = Number(ALLinCartAmountElement[i].textContent)
            if(inCartAmountNumber === 99){
                ALLcartButtonMore[i].classList.add("invalid")
            }else{
                ALLcartButtonMore[i].classList.remove("invalid")
            }

            if(inCartAmountNumber === 1){
                ALLcartButtonLess[i].classList.add("invalid")
            }else{
                ALLcartButtonLess[i].classList.remove("invalid")
            }

            ALLcartButtonMore[i].addEventListener("click", ()=>{
                if(ALLcartButtonMore[i].classList.contains("invalid")){
                    return
                }
                inCartAmountNumber++

                if(inCartAmountNumber >= 99){
                    inCartAmountNumber = 99
                    ALLcartButtonMore[i].classList.add("invalid")

                    ALLinCartAmountElement[i].textContent = inCartAmountNumber
                }
                ALLcartButtonLess[i].classList.remove("invalid")

                ALLinCartAmountElement[i].textContent = inCartAmountNumber

                //update the total price
                const currentProductPrice = Number(PRODUCT_PRICE[i].textContent.split("$")[1].replace(",", ""))
                const FinalPrice = currentProductPrice / (inCartAmountNumber-1) * inCartAmountNumber
                PRODUCT_PRICE[i].textContent = `$ ${Number(FinalPrice).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}`
                //console.log(currentProductPrice / (inCartAmountNumber < 99 ? inCartAmountNumber-1 : 99) * inCartAmountNumber)
                //console.log(currentProductPrice, (inCartAmountNumber-1), inCartAmountNumber)

                setNewTotalPrice()

                //get the product from local storage and update it
                const PRODUCT = localStorage.getItem(PRODUCT_NAME[i].textContent)
                const PRODUCT_CONVERTED = JSON.parse(PRODUCT)

                PRODUCT_CONVERTED.amount = inCartAmountNumber

                const UPDATED_PRODUCT = JSON.stringify(PRODUCT_CONVERTED)

                localStorage.setItem(PRODUCT_NAME[i].textContent, UPDATED_PRODUCT)
            })
            ALLcartButtonLess[i].addEventListener("click", ()=>{
                if(ALLcartButtonLess[i].classList.contains("invalid")){
                    return
                }
                
                inCartAmountNumber--
    
                if(inCartAmountNumber <= 1){
                    inCartAmountNumber = 1
                    ALLcartButtonLess[i].classList.add("invalid")
                }
                ALLcartButtonMore[i].classList.remove("invalid")
    
                ALLinCartAmountElement[i].textContent = inCartAmountNumber

                const currentProductPrice = Number(PRODUCT_PRICE[i].textContent.split("$")[1].replace(",", ""))
                const FinalPrice = (currentProductPrice / (inCartAmountNumber+1) * inCartAmountNumber)
                PRODUCT_PRICE[i].textContent = `$ ${Number(FinalPrice).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}`

                setNewTotalPrice()

                //get the product from local storage and update it
                const PRODUCT = localStorage.getItem(PRODUCT_NAME[i].textContent)
                const PRODUCT_CONVERTED = JSON.parse(PRODUCT)

                PRODUCT_CONVERTED.amount = inCartAmountNumber

                const UPDATED_PRODUCT = JSON.stringify(PRODUCT_CONVERTED)

                localStorage.setItem(PRODUCT_NAME[i].textContent, UPDATED_PRODUCT)
            })

            ALLremoveProductX[i].addEventListener("click", ()=>{
                localStorage.removeItem(PRODUCT_NAME[i].textContent)

                if(localStorage.getItem("debug")){
                    productsInCartAmount.textContent = localStorage.length - 1
                }else{
                    productsInCartAmount.textContent = localStorage.length
                }
                PRODUCT_ELEMENT[i].remove()

                setNewTotalPrice()

                if((localStorage.getItem("debug") && localStorage.length === 1) || (!localStorage.getItem("debug") && localStorage.length === 0)){
                    const totalElementWrapper = document.querySelector(".grand-total")
                    if(totalElementWrapper){
                        totalElementWrapper.remove()
                    }

                    const noProducts = document.createElement("div")
                    noProducts.classList.add("cart-empty")

                    noProducts.innerHTML = `
                    <img src="./empty-little-cart.png" />
                    <span>Your cart is currently empty!</span>
                    `
                    CART_RELATIVE_EL.appendChild(noProducts)
                }
            })

            PRODUCT_NAME[i].addEventListener("click", ()=>{
                window.location.href = `/single-product.html?product=${PRODUCT_NAME[i].textContent}`
            })
            PRODUCT_IMAGE[i].addEventListener("click", ()=>{
                window.location.href = `/single-product.html?product=${PRODUCT_NAME[i].textContent}`
            })

            TOTAL_PRICE += Number(PRODUCT_PRICE[i].textContent.split("$")[1].replace(",", ""))
        }  
        
        const totalElementWrapper = document.createElement("div")
        totalElementWrapper.classList.add("grand-total")

        totalElementWrapper.innerHTML = `
        <div class="proceed-to-checkout">
            <span>Proceed to Checkout</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>        </div>
        <span>$ ${Number(TOTAL_PRICE).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}</span>
        `
        const setNewTotalPrice = () =>{
            const GRAND_TOTAL_PRICE = document.querySelector(".grand-total > span")
            const ALL_CHILDREN = document.querySelectorAll(".each-product-cart")
            const ALL_PRICES = document.querySelectorAll(".product-cart-price")

            TOTAL_PRICE = 0
            for(let i = 0; i < ALL_CHILDREN.length; i++){
                const eachPrice = Number(ALL_PRICES[i].textContent.split("$")[1].replace(",", ""))
                TOTAL_PRICE += eachPrice
                //console.log(PRODUCT_PRICE[i].textContent.split("$")[1])
            }
            //console.log(TOTAL_PRICE)
            GRAND_TOTAL_PRICE.textContent = `$ ${Number(TOTAL_PRICE).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}`
        }

        CART_RELATIVE_EL.appendChild(totalElementWrapper)
    }else{
        //no products in cart page
        const totalElementWrapper = document.querySelector(".grand-total")
        if(totalElementWrapper){
            totalElementWrapper.remove()
        }

        const noProducts = document.createElement("div")
        noProducts.classList.add("cart-empty")

        noProducts.innerHTML = `
        <img src="./empty-little-cart.png" />
        <span>Your cart is currently empty!</span>
        `
        CART_RELATIVE_EL.appendChild(noProducts)
    }

    const closeCart = document.querySelector(".cart-contents-relative > svg")
    closeCart.addEventListener("click", ()=>{
        CART_PARENT_EL.classList.remove("move-show")
        CART_PARENT_EL.classList.add("move-hide")

        CART_PARENT_EL.addEventListener("animationend", ()=>{
            CART_PARENT_EL.classList.remove("move-hide")
        })
        document.body.style.overflowY = "auto"
    })

    window.addEventListener("click", ()=>{
        if(CART_PARENT_EL.classList.contains("move-show")){
            CART_PARENT_EL.classList.remove("move-show")
            CART_PARENT_EL.classList.add("move-hide")

            CART_PARENT_EL.addEventListener("animationend", ()=>{
                CART_PARENT_EL.classList.remove("move-hide")
            })
            document.body.style.overflowY = "auto"
        }
    })
    window.addEventListener("scroll", ()=>{
        if(CART_PARENT_EL.classList.contains("move-show")){
            CART_PARENT_EL.classList.remove("move-show")
            CART_PARENT_EL.classList.add("move-hide")

            CART_PARENT_EL.addEventListener("animationend", ()=>{
                CART_PARENT_EL.classList.remove("move-hide")
            })
            document.body.style.overflowY = "auto"
        }
    })
}

CART_ELEMENT.addEventListener("click", (e)=>{
    e.stopPropagation()
    getProductsFromCart()
}) 

const productsInCartAmount = document.querySelector("span.cart-amount")
if(localStorage.getItem("debug")){
    productsInCartAmount.textContent = localStorage.length - 1
}else{
    productsInCartAmount.textContent = localStorage.length 
}
 
getProduct()