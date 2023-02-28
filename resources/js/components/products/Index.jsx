import React  , {useEffect ,useState }from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";






const Index = () => {
    const navigate = useNavigate()
    const [products , setProducts]= useState([])
    const newProduct  = ()=>{
        navigate("/product/new")
    }
    useEffect (()=>{
        getProduct()
    })
    const getProduct= async ()=>{
        await axios.get('/api/get_All')
            .then(({data})=>{
                setProducts(data.products)
            })
    }
    return (
        <div>
            <div className="container">
                <div className="h1 container text-center mt-2 ">
                    Welcom Page
                </div>
                <div className="col-md-12">
                    <div className="titlebar d-flex">
                        <div className="h1">List Products :</div>
                    </div>
                    <div className="titlebar_item ">
                        <button className="btn btn-primary" onClick={()=>newProduct()}>Add Product</button>
                    </div>
                    <table class="table  container mt-2 ">
                        <thead>
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col">Product</th>
                                <th scope="col">Type</th>
                                <th scope="col">Inventory</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                        {
                            products.length > 0 && (
                                products.map((item , key )=>(
                                    <tr>
                                        <td scope="row">
                                            <img src={`/upload/${item.photo}`}  alt="err"  height={"40px"}/>
                                        </td>
                                        <td >
                                            <p>{item.name}</p>
                                        </td>
                                        <td >
                                            <p>{item.type}</p>
                                        </td>
                                        <td >
                                            <p>{item.quantity}</p>
                                        </td>

                                        <div className="col-md-5  d-flex justify-content-between">
                                            <button className="btn  px-5 mx-2 btn-warning">Modifier</button>

                                            <button className="btn border px-5 btn-danger">Supprimer</button>
                                        </div>

                                    </tr>
                                ))
                            )
                        }


                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
};
export default Index;
