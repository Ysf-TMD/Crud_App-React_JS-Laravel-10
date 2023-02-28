import React from "react"
import { Routes , Route} from 'react-router-dom'
import IndexProduct from "../components/products/Index"
import NotFound from "../components/NotFound"
import New from "../components/products/New"

const Router = ()=>{
    return (
        <div>
            <Routes>
                <Route  path={"/"} element={<IndexProduct/>} />
                <Route path={"/*"} element={<NotFound/>} />
                <Route path={"/product/new"} element={<New/>} />
            </Routes>
        </div>
    )
}
export default Router