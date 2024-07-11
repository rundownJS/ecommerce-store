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