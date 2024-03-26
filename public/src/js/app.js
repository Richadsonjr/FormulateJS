// const { default: axios } = require("axios")

var CSVTRAYDATA = []
const stsData = {}


// Rotas para os menus dos aplicativos =================================================================================================

const MyRequests = async(routeX) => {
    await route(routeX)
    await getMyRequests()

}