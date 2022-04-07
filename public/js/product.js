async function producto() {
    const api = await fetch(`/apiDB${window.location.pathname}`)
    const producto = await api.json()
    console.log(producto)
    return producto
}



    var  category  = 'algo';
    document.documentElement.style.setProperty('--category', 'white')
    console.log(category)


