
//DONE

//get the elements
const searchInput = document.querySelector(".search-input")
const everyCategoryFilter = document.querySelectorAll(".each-category")
const shippingFilter = document.querySelector(".shipping-filter")
const shippingCheckbox = document.querySelector(".shipping-filter > .checkbox")
const clearAllFilters = document.querySelector(".clear-filters")
const priceSlider = document.querySelector(".price-slider")
const fillElement = document.querySelector(".slider-wrapper .fill")
const priceNumber = document.querySelector(".price-amount")
const dropdownParent = document.querySelector(".dropdown-parent")
const dropdownElement = document.querySelector(".dropdown")
const eachSortCategory = document.querySelectorAll(".each-sort")
const sortingCategory = document.querySelector(".sortingCategory")

//main wrapper for the products
const productsMAIN = document.querySelector(".products-content")
const showingProducts = document.querySelector(".foundProducts")
const foundProducts = document.querySelector(".allDBProducts")
const allProductsContent = document.querySelector(".all-products-content")

//small filter elements
const closeFilters = document.querySelector(".filters-relative > svg")
const searchInputSMALL = document.querySelector(".search-input-small")
const everyCategoryFilterSMALL = document.querySelectorAll(".each-category-small")
const shippingFilterSMALL = document.querySelector(".shipping-filter-small")
const shippingCheckboxSMALL = document.querySelector(".shipping-filter-small > .checkbox-small")
const clearAllFiltersSMALL = document.querySelector(".clear-filters-small")
const priceSliderSMALL = document.querySelector(".price-slider-small")
const fillElementSMALL = document.querySelector(".slider-wrapper-small .fill-small")
const priceNumberSMALL = document.querySelector(".price-amount-small")


//get data from our api
const getProductData = async () =>{

    //get the search params from the URL
    //if there are params originally we would use them as filters
    //if not we apply the default ones
    const params = window.location.search
    const urlParams = new URLSearchParams(params)

    //check for and queries
    const queryObject = {}
    const name = urlParams.get("name")
    const freeDelivery = urlParams.get("freeDelivery")
    const category = urlParams.get("category")
    const sort = urlParams.get("sort")
    const numericFilter = urlParams.get("numericFilter")
    const page = urlParams.get("page")

    //console.log(name)
    //console.log(category)

    //when sending a request the backend will deal with all of the validating
    //he we just check whats present
    if(name){
        queryObject.name = name
    }
    if(freeDelivery){
        queryObject.freeDelivery = freeDelivery
    }
    if(category){
        queryObject.category = category
    }
    if(sort){
        queryObject.sort = sort
    }
    if(numericFilter){
        queryObject.numericFilter = numericFilter
    }
    if(Number(page) > 0){
        queryObject.page = page
    }
    if(numericFilter){
        queryObject.numericFilter = numericFilter
    }
    if(sort){
        queryObject.sort = sort
    }

    //turn the object to a string
    const queryString = Object.keys(queryObject).map((key) =>{
        return `${encodeURIComponent(key)}=${encodeURIComponent(queryObject[key])}`
    }).join("&")
    //console.log(queryString)

    //send a request and get data
    try{
        skeletonLoader()
        const request = await fetch(`/api/v1/ecom_store/home?${queryString}`)
        const productData = await request.json()
        
        //console.log(productData)

        constructProductsContent(productData) 
    }catch(err){
        console.log(err)
    }
}
//getProductData()

//set styles for elements originally
const setPageOriginally = () =>{
    const params = window.location.search
    const urlParams = new URLSearchParams(params)

    const name = urlParams.get("name")
    const freeDelivery = urlParams.get("freeDelivery")
    const category = urlParams.get("category")
    const sort = urlParams.get("sort")
    const numericFilter = urlParams.get("numericFilter")

    if(name){
        searchInput.value = name
        searchInputSMALL.value = name
    }
    if(freeDelivery === "true"){
        shippingCheckbox.classList.add("selected")
        shippingCheckbox.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>`
        
        shippingCheckboxSMALL.classList.add("selected")
        shippingCheckboxSMALL.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>`
    }
    if(category){
        everyCategoryFilter.forEach(prodCategory => prodCategory.classList.remove("selected"))
        everyCategoryFilterSMALL.forEach(prodCategory => prodCategory.classList.remove("selected"))
        
        for(let i = 0; i < everyCategoryFilter.length; i++){
            if(everyCategoryFilter[i].textContent === category && i !== 0){
                everyCategoryFilter[i].classList.add("selected")
                everyCategoryFilter[0].classList.remove("selected")
                break
            }else{
                everyCategoryFilter[0].classList.add("selected")
            }
        }
        for(let i = 0; i < everyCategoryFilterSMALL.length; i++){
            if(everyCategoryFilterSMALL[i].textContent === category && i !== 0){
                everyCategoryFilterSMALL[i].classList.add("selected")
                everyCategoryFilterSMALL[0].classList.remove("selected")
                break
            }else{
                everyCategoryFilterSMALL[0].classList.add("selected")
            }
        }
    }
    if(numericFilter){
        
        const min = priceSlider.min
        const max = priceSlider.max
        
        priceSlider.value = numericFilter.split("=")[1]
        priceSliderSMALL.value = priceSlider.value
        
        const current = priceSlider.value

        //console.log(numericFilter)

        //use a formula to determine the final % based on the min and max
        const finalPercentage = Math.round(((current - min) / (max - min)) * 100)
        fillElement.style.width = `${finalPercentage}%`
        priceNumber.textContent = Number(current).toLocaleString("en-US", {
            //style: "currency",
            //currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })

        fillElementSMALL.style.width = `${finalPercentage}%`
        priceNumberSMALL.textContent = Number(current).toLocaleString("en-US", {
            //style: "currency",
            //currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
    }
    if(sort && dropdownParent){
        for(let i = 0; i < eachSortCategory.length; i++){
            if(eachSortCategory[i].id === sort){
                sortingCategory.textContent = eachSortCategory[i].textContent
                break
            }else{
                sortingCategory.textContent = eachSortCategory[0].textContent
            }
        }
    }
}
setPageOriginally()


//create functionality for events

//search functionality
const searchFunctionality = (inputElement, e) =>{
    const inputValue = inputElement.value 

    const url = new URL(window.location.href)
    const setNewParams = new URLSearchParams(url.search)
    
    if(inputValue.trim().length > 0){
        inputElement.classList.remove("invalid")
    }else{
        setNewParams.delete("name")
        url.search = setNewParams.toString()
        window.history.replaceState({}, "", url)
    }

    if(inputValue.trim().length > 0 && e.key === "Enter"){
        //if every condition is right set property and get back data
        
        setNewParams.delete("page")
        setNewParams.set("name", inputValue.trim())
        url.search = setNewParams.toString()
        window.history.replaceState({}, "", url)
        getProductData()

    }else if(e.key === "Enter" && inputValue.trim().length === 0){
        inputElement.classList.add("invalid")
        inputElement.style.animation = "none"
        inputElement.offsetWidth //reflow of the css (essential)
        inputElement.style.animation = "invalid-input 200ms"
    }
}

//category functionality
const categoryFiltering = (categoryEl) =>{
    const url = new URL(window.location.href)
    const setNewParams = new URLSearchParams(url.search)
    //const categoryParam = setNewParams.get("category")

    if(everyCategoryFilter.length){
        everyCategoryFilter.forEach(cat => cat.classList.remove("selected"))
        categoryEl.classList.add("selected")
        if(categoryEl.textContent === "All"){
            setNewParams.delete("page")
            setNewParams.delete("category")
            url.search = setNewParams.toString()
            window.history.replaceState({}, "", url)

            getProductData()
            return
        }
        if(categoryEl.textContent !== "All"){
            setNewParams.delete("page")
            setNewParams.set("category", categoryEl.textContent)
            url.search = setNewParams.toString()
            window.history.replaceState({}, "", url)

            getProductData()
        }
    }

    if(everyCategoryFilterSMALL.length){
        everyCategoryFilterSMALL.forEach(cat => cat.classList.remove("selected"))
        categoryEl.classList.add("selected")
        if(categoryEl.textContent === "All"){
            setNewParams.delete("page")
            setNewParams.delete("category")
            url.search = setNewParams.toString()
            window.history.replaceState({}, "", url)

            getProductData()
            return
        }
        if(categoryEl.textContent !== "All"){
            setNewParams.delete("page")
            setNewParams.set("category", categoryEl.textContent)
            url.search = setNewParams.toString()
            window.history.replaceState({}, "", url)

            getProductData()
        }
    }
}

//free shipping functionality
const freeShippingFiltering = (checkbox) =>{
    checkbox.classList.toggle("selected")
    const url = new URL(window.location.href)
    const setNewParams = new URLSearchParams(url.search)

    if(checkbox.classList.contains("selected")){
        setNewParams.set("freeDelivery", "true")
        checkbox.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>`
        
        setNewParams.delete("page")
        url.search = setNewParams.toString()
        window.history.replaceState({}, "", url)
        getProductData()
    }else{
        setNewParams.delete("page")
        setNewParams.delete("freeDelivery")
        
        url.search = setNewParams.toString()
        window.history.replaceState({}, "", url)
        getProductData()
    }
}

//price slider functionality
const sliderFunctionality = (e) =>{
    const url = new URL(window.location.href)
    const setNewParams = new URLSearchParams(url.search)
    
    if(fillElement && priceNumber && window.innerWidth > 800){
        const min = priceSlider.min
        const max = priceSlider.max
        const current = priceSlider.value

        //use a formula to determine the final % based on the min and max
        const finalPercentage = Math.round(((current - min) / (max - min)) * 100)
        fillElement.style.width = `${finalPercentage}%`
        priceNumber.textContent = Number(current).toLocaleString("en-US", {
            //style: "currency",
            //currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })

        //console.log(current)

        if(Math.ceil(current) === Number(max)){
            setNewParams.delete("numericFilter")
        }else{
            setNewParams.set("numericFilter", `price<=${current}`)
        }
        
        setNewParams.delete("page")
        url.search = setNewParams.toString()
        window.history.replaceState({}, "", url)
        getProductData()
    }

    if(fillElementSMALL && priceNumberSMALL && window.innerWidth <= 800){
        const min = priceSliderSMALL.min
        const max = priceSliderSMALL.max
        const current = priceSliderSMALL.value

        //use a formula to determine the final % based on the min and max
        const finalPercentage = Math.round(((current - min) / (max - min)) * 100)
        fillElementSMALL.style.width = `${finalPercentage}%`
        priceNumberSMALL.textContent = Number(current).toLocaleString("en-US", {
            //style: "currency",
            //currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })

        //console.log(fillElementSMALL)

        if(Math.ceil(current) === Number(max)){
            setNewParams.delete("numericFilter")
        }else{
            setNewParams.set("numericFilter", `price<=${current}`)
        }
        
        setNewParams.delete("page")
        url.search = setNewParams.toString()
        window.history.replaceState({}, "", url)
        getProductData()
    }
}

//clear filters
const clearAllFiltersFunc = (clearAllBtn) =>{
    const url = new URL(window.location.href)
    const setNewParams = new URLSearchParams(url.search)

    if(searchInput){
        searchInput.value = ""
        searchInput.classList.remove("invalid")
        shippingCheckbox.innerHTML = ``
        shippingCheckbox.classList.remove("selected")
        everyCategoryFilter.forEach(cat => cat.classList.remove("selected"))
        everyCategoryFilter[0].classList.add("selected")
        priceSlider.value = priceSlider.max
        priceNumber.textContent = Number(priceSlider.value).toLocaleString("en-US", {
            //style: "currency",
            //currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
        fillElement.style.width = "100%"
    }
    if(searchInputSMALL){
        searchInputSMALL.value = ""
        searchInputSMALL.classList.remove("invalid")
        shippingCheckboxSMALL.innerHTML = ``
        shippingCheckboxSMALL.classList.remove("selected")
        everyCategoryFilterSMALL.forEach(cat => cat.classList.remove("selected"))
        everyCategoryFilterSMALL[0].classList.add("selected")
        priceSliderSMALL.value = priceSliderSMALL.max
        priceNumberSMALL.textContent = Number(priceSliderSMALL.value).toLocaleString("en-US", {
            //style: "currency",
            //currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
        fillElementSMALL.style.width = "100%"
    }

    const pagitationElements = document.querySelector(".pagitation-wrapper")
    if(pagitationElements){
        pagitationElements.remove()
    }
    setNewParams.delete("page")
    setNewParams.delete("name")
    setNewParams.delete("category")
    setNewParams.delete("freeDelivery")
    setNewParams.delete("numericFilter")

    url.search = setNewParams.toString()
    window.history.replaceState({}, "", url)

    getProductData()
}

//sort functionality
const sortFunctionality = (e) =>{
    e.stopPropagation()
    if(smallFiltersWrapper.classList.contains("move-visible")){
        smallFiltersWrapper.classList.remove("move-visible")
        smallFiltersWrapper.classList.add("move-hidden")
        smallFiltersWrapper.addEventListener("animationend", ()=>{
            smallFiltersWrapper.classList.remove("move-hidden")
        })
    }

    const url = new URL(window.location.href)
    const setNewParams = new URLSearchParams(url.search)

    if(setNewParams.get("page")){
        setNewParams.delete("page")
    }

    if(dropdownParent){
        dropdownElement.style.display = "flex"


        /*
        for(let i = 0; i < eachSortCategory.length; i++){
            if(!eachSortCategory[i].dataset.listenerAttached){
                eachSortCategory[i].addEventListener("click", (e)=>{
                    e.stopPropagation()
                    dropdownElement.style.display = "none"
    
    
                    sortingCategory.textContent = eachSortCategory[i].textContent
                    if(eachSortCategory[i].id){
                        setNewParams.set("sort", eachSortCategory[i].id)
                    }else{
                        setNewParams.delete("sort")
                    }
                    
                    url.search = setNewParams.toString()
                    window.history.replaceState({}, "", url)
                    getProductData()
                    
                })
                eachSortCategory[i].dataset.listenerAttached = "true"
            }
        }
        */
        
        const sortTestFunction = (e, element) =>{
            e.stopPropagation()
            dropdownElement.style.display = "none"

            
            sortingCategory.textContent = element.textContent
            if(element.id){
                setNewParams.set("sort", element.id)
            }else{
                setNewParams.delete("sort")
            }
            //console.log(1)
            
            url.search = setNewParams.toString()
            //window.history.replaceState({}, "", url)
            window.location.href = url.href
            getProductData() 
                
        }
        
        for(let i = 0; i < eachSortCategory.length; i++){
            eachSortCategory[i].addEventListener("click", (e)=>{
                sortTestFunction(e, eachSortCategory[i])
                
            })
        }
    }
}

//set the functions as events
searchInput.addEventListener("keyup", (e)=>{
    searchFunctionality(searchInput, e)
})
searchInputSMALL.addEventListener("keyup", (e)=>{
    searchFunctionality(searchInputSMALL, e)
})

everyCategoryFilter.forEach((category) =>{
    category.addEventListener("click", ()=>{
        categoryFiltering(category)
    })
})
everyCategoryFilterSMALL.forEach((category)=>{
    category.addEventListener("click", ()=>{
        categoryFiltering(category)
        if(smallFiltersWrapper.classList.contains("move-visible")){
            smallFiltersWrapper.classList.remove("move-visible")
            smallFiltersWrapper.classList.add("move-hidden")
            smallFiltersWrapper.addEventListener("animationend", ()=>{
                smallFiltersWrapper.classList.remove("move-hidden")
            })
    
            document.body.style.overflowY = "auto"
        }
    })
})

shippingFilter.addEventListener("click", ()=>{
    freeShippingFiltering(shippingCheckbox)
})
shippingFilterSMALL.addEventListener("click", ()=>{
    freeShippingFiltering(shippingCheckboxSMALL)
})

clearAllFilters.addEventListener("click", ()=>{
    clearAllFiltersFunc(clearAllFilters)
})
clearAllFiltersSMALL.addEventListener("click", ()=>{
    clearAllFiltersFunc()
    if(smallFiltersWrapper.classList.contains("move-visible")){
        smallFiltersWrapper.classList.remove("move-visible")
        smallFiltersWrapper.classList.add("move-hidden")
        smallFiltersWrapper.addEventListener("animationend", ()=>{
            smallFiltersWrapper.classList.remove("move-hidden")
        })

        document.body.style.overflowY = "auto"
    }
})

//prevent the slider event from going crazy
let lastExecutionTime = 0
const throttleDelay = 100 //the delay
priceSlider.addEventListener("input", (e)=>{
    const now = Date.now()
    if(now - lastExecutionTime >= throttleDelay){
        sliderFunctionality(e)
        lastExecutionTime = now
    }
})
priceSliderSMALL.addEventListener("input", (e)=>{
    const now = Date.now()
    if(now - lastExecutionTime >= throttleDelay){
        sliderFunctionality(e)
        lastExecutionTime = now
    }
})


dropdownParent.addEventListener("click", (e)=>{
    sortFunctionality(e)
})
window.addEventListener("click", ()=>{
    if(dropdownParent){
        dropdownElement.style.display = "none"
    }
})

let previousValue = window.innerWidth
window.addEventListener("resize", ()=>{

    if(previousValue <= 800 && window.innerWidth > 800){
        if(smallFiltersWrapper.classList.contains("move-visible")){
            smallFiltersWrapper.classList.remove("move-visible")
            smallFiltersWrapper.classList.add("move-hidden")
            smallFiltersWrapper.addEventListener("animationend", ()=>{
                smallFiltersWrapper.classList.remove("move-hidden")
            })
    
            document.body.style.overflowY = "auto"
        }
        setPageOriginally()
    }
    
    previousValue = window.innerWidth
})

window.addEventListener("scroll", ()=>{
    if(dropdownParent){
        dropdownElement.style.display = "none"
    }
    if(window.innerWidth < 800 && smallFiltersWrapper.classList.contains("move-visible")){
        smallFiltersWrapper.classList.remove("move-visible")
            smallFiltersWrapper.classList.add("move-hidden")
            smallFiltersWrapper.addEventListener("animationend", ()=>{
                smallFiltersWrapper.classList.remove("move-hidden")
            })
    
        document.body.style.overflowY = "auto"
    }
})

//call this function to set all products in the DOM
const constructProductsContent = (PRODUCTS_DATA) =>{
    productsMAIN.innerHTML = ``
    if(PRODUCTS_DATA.products.length){
        showingProducts.textContent = PRODUCTS_DATA.length
        foundProducts.textContent = PRODUCTS_DATA.productsFound

        for(let i = 0; i < PRODUCTS_DATA.products.length; i++){
            //create an element and pass it inside the element
            
            const formattedPrice = Number(PRODUCTS_DATA.products[i].price).toLocaleString("en-US", {
                //style: "currency",
                //currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })
            const picturePath = "./images/"
            const nameClass = PRODUCTS_DATA.products[i].name.length < 45 ? "biggerLettersName" : "smallerLettersName"

            const product = document.createElement("div")
            product.innerHTML = `
                <img src="${picturePath}${PRODUCTS_DATA.products[i].picture1}"/>
                <span class="${nameClass}">${PRODUCTS_DATA.products[i].name}</span>
                <span class="product-price">$ ${formattedPrice}</span>
            `
            product.classList.add("product")
            productsMAIN.appendChild(product)

            product.addEventListener("click", ()=>{
                const url = new URL(window.location.href)
                
                //console.log(`/single-product.html?product=${PRODUCTS_DATA.products[i].name}`)
                window.location.href = `/single-product.html?product=${PRODUCTS_DATA.products[i].name}`
            })
        }

        const pagitationElementsGET = document.querySelector(".pagitation-wrapper")
        if(pagitationElementsGET){
            pagitationElementsGET.remove()
        }

        const pagitationElements = document.createElement("div")
        pagitationElements.classList.add("pagitation-wrapper")

        pagitationElements.innerHTML = `
            <div class="prev-page"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg> </div>
            <div class="all-pages"></div>
            <div class="next-page"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg> </div>
        `
        allProductsContent.appendChild(pagitationElements)

        const allPages = document.querySelector(".all-pages")
        allPages.innerHTML = ``
        const totalPages = Math.ceil(PRODUCTS_DATA.productsFound / 20)

        const url = new URL(window.location.href)
        const setNewParams = new URLSearchParams(url.search) 
        const currentPage = Number(setNewParams.get("page")) || 1
        
        const pagesLeft = totalPages - currentPage

        if(totalPages < 4){
            for(let i = 1; i <= totalPages; i++){
                const pageElement = document.createElement("div")
                pageElement.classList.add("pageElement")
                if(i === currentPage){
                    pageElement.classList.add("current")
                }

                pageElement.textContent = i

                allPages.appendChild(pageElement)
            }
        }else if(totalPages > 4 && pagesLeft < 4){
            let startPage = Math.max(currentPage - 3, totalPages - 3);
            for(let i = startPage; i <= totalPages; i++){
                const pageElement = document.createElement("div")
                pageElement.classList.add("pageElement")
                if(i === currentPage){
                    pageElement.classList.add("current")
                }

                pageElement.textContent = i

                allPages.appendChild(pageElement)
            }

        }else if(totalPages >= 4){
            let iterations = 0
            for(let i = currentPage; i <= totalPages; i++){
                iterations++
                if(iterations > 3){
                    const pageElement = document.createElement("div")
                    pageElement.classList.add("pageElement")
                    pageElement.classList.add("dot")

                    pageElement.textContent = "..."

                    allPages.appendChild(pageElement)
                    break
                }
                const pageElement = document.createElement("div")
                pageElement.classList.add("pageElement")

                if(i === currentPage){
                    pageElement.classList.add("current")
                }

                pageElement.textContent = i

                allPages.appendChild(pageElement)
            }
            const pageElement = document.createElement("div")
            pageElement.classList.add("pageElement")

            pageElement.textContent = totalPages

            allPages.appendChild(pageElement)
        }

        const prevPage = document.querySelector(".prev-page")
        const nextPage = document.querySelector(".next-page")
        const allPagitationElements = document.querySelectorAll(".pageElement:not(.dot)")
        
        if(currentPage === 1){
            prevPage.classList.add("not-allowed")
        }else{
            prevPage.classList.remove("not-allowed")
        }

        if(currentPage === totalPages){
            nextPage.classList.add("not-allowed")
        }else{
            nextPage.classList.remove("not-allowed")
        }

        prevPage.addEventListener("click", ()=>{
            if(!prevPage.classList.contains("not-allowed")){
                if(currentPage - 1 !== 1){
                    setNewParams.set("page", currentPage - 1)
                }else{
                    setNewParams.delete("page")
                }

                url.search = setNewParams.toString()
                window.location.href = url.href
            }
        })
        nextPage.addEventListener("click", ()=>{
            if(!nextPage.classList.contains("not-allowed")){
                setNewParams.set("page", currentPage + 1)

                url.search = setNewParams.toString()
                window.location.href = url.href
            }
        })
        allPagitationElements.forEach((each) =>{
            each.addEventListener("click", ()=>{

                if(Number(each.textContent) === 1){
                    setNewParams.delete("page")
                }else{
                    setNewParams.set("page", each.textContent)
                }

                url.search = setNewParams.toString()
                window.location.href = url.href
            })
        })

    }else{
        //display no products found
        smallFiltersWrapper.style.top = "75px"
        const pagitationElementsGET = document.querySelector(".pagitation-wrapper")
        if(pagitationElementsGET){
            pagitationElementsGET.remove()
        }

        productsMAIN.innerHTML = `
        <div class="no-products-found">
            <img src="./empty-cart.png"/>
            <span class="no-products-bigger">We coudn't find any products based on your filters!</span>
            <span class="no-products-smaller">Try using different filters or <span class="clear">clear</span> them.</span>
        </div>
        `

        const clear = document.querySelector(".no-products-smaller > .clear")
        clear.addEventListener("click", ()=>{
            clearAllFiltersFunc()
        })

        showingProducts.textContent = 0
        foundProducts.textContent = 0
    } 
}

//skeleton loader
const skeletonLoader = () =>{
    productsMAIN.innerHTML =  ``
    for(let i = 0; i < 20; i++){
        const skeletonEl = document.createElement("div")
        skeletonEl.classList.add("skeleton-element")

        skeletonEl.innerHTML = `
        <div class="image-skeleton"></div>
        <div class="name-skeleton"></div>
        <div class="price-skeleton"></div>
        `

        productsMAIN.appendChild(skeletonEl)
    }
}

//functionality of filters for small screens
const filtersButtonSD = document.querySelector(".filters-activate")
const smallFiltersWrapper = document.querySelector(".filters-wrap-small-screen")
filtersButtonSD.addEventListener("click", (e)=>{
    e.stopPropagation()

    setPageOriginally()

    if(CART_PARENT_EL.classList.contains("move-show")){
        CART_PARENT_EL.classList.remove("move-show")
        CART_PARENT_EL.classList.add("move-hide")

        CART_PARENT_EL.addEventListener("animationend", ()=>{
            CART_PARENT_EL.classList.remove("move-hide")
        })
        document.body.style.overflowY = "auto"
    }

    smallFiltersWrapper.classList.add("move-visible")
    dropdownElement.style.display = "none"

    document.body.style.overflowY = "hidden"

    window.addEventListener("click", ()=>{
        if(smallFiltersWrapper.classList.contains("move-visible")){
            smallFiltersWrapper.classList.remove("move-visible")
            smallFiltersWrapper.classList.add("move-hidden")
            smallFiltersWrapper.addEventListener("animationend", ()=>{
                smallFiltersWrapper.classList.remove("move-hidden")
            })
        }

        document.body.style.overflowY = "auto"
    })
    
    if(Math.round(window.scrollY) < 75){
        const scrollAmount = 75 - Math.round(window.scrollY)
        
        smallFiltersWrapper.style.top = scrollAmount + "px"
    }else{
        smallFiltersWrapper.style.top = 0
    }

})
smallFiltersWrapper.addEventListener("click", (e)=>{
    e.stopPropagation()
})
closeFilters.addEventListener("click", ()=>{
    if(smallFiltersWrapper.classList.contains("move-visible")){
        smallFiltersWrapper.classList.remove("move-visible")
        smallFiltersWrapper.classList.add("move-hidden")
        smallFiltersWrapper.addEventListener("animationend", ()=>{
            smallFiltersWrapper.classList.remove("move-hidden")
        })
    }

    document.body.style.overflowY = "auto"
})


//get all products from cart
//UNIVERSAL FOR ALL PAGES
const CART_ELEMENT = document.querySelector("div.cart")
const CART_PARENT_EL = document.querySelector(".cart-contents")
const CART_RELATIVE_EL = document.querySelector(".cart-contents-relative")

const getProductsFromCart = () =>{
    CART_PARENT_EL.classList.add("move-show")
    CART_PARENT_EL.addEventListener("click", e => e.stopPropagation())

    if(smallFiltersWrapper.classList.contains("move-visible")){
        smallFiltersWrapper.classList.remove("move-visible")
        smallFiltersWrapper.classList.add("move-hidden")
        smallFiltersWrapper.addEventListener("animationend", ()=>{
            smallFiltersWrapper.classList.remove("move-hidden")
        })
    }

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


getProductData()