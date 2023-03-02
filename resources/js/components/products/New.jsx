import React , {useState} from 'react'
import {useNavigate} from "react-router-dom";


const New = ()=>{
    const navigate = useNavigate()
    const [name , setName ] = useState("")
    const [description , setDescription ] = useState("")
    const [photo , setPhoto]=useState("")
    const [type , setType] = useState("")
    const [quantity , setQuantity] = useState("")
    const [price, setPrice] =useState("")
    const changeHandler =(e)=>{
        let file = e.target.files[0]
        let reader = new FileReader()
        let limit = 1024 * 1024 * 2
        if (file["size"]>limit){
            Swal.fire({
                type : "error" ,
                title : "Oops...",
                text : "SomeThing Went wrong ",
                footer : "why Do I Have This Issue ..?? ",
            })
        }
        reader.onloadend=(file)=>{
            setPhoto(reader.result)
        }
        reader.readAsDataURL(file )





    }
    /*ajouter la fonction responsable d'ajouter un produit  on prenant les informations via FormData  c'est un class respo
        qui prend les valeurs et les combinées .... faut faire des recherches sur ce FormData
    */
    const createProduct =async (e)=>{
        e.preventDefault();

        const formData = new FormData()
        formData.append("name",name);
        formData.append("description" , description );
        formData.append( "photo" , photo);
        formData.append( "type" , type);
        formData.append("quantity",quantity);
        formData.append("price",price);
        await axios
            .post("/api/AjouterProduit/", formData)
            .then(({ data }) => {
                toast.fire({
                    icon: "success",
                    title: "Product Add Successfully",
                });
                navigate("/");
            })
            .catch((response) => {

            });
    }
    return (<>
        <div className="container d-flex mt-3">
            <div className="  col-md-6">
                <div className="h2 text-center container mt-4"> Add Product </div>
                <div className="container w-50 mx-auto">
                   {/* <button className="btn-primary btn form-control" onClick={(event)=>{createProduct(event)}} >Save</button>*/}
                </div>
                <div className="container main">
                    <label>Name</label>
                    <input type="text" name="" value = {name} onChange={(e)=>{setName(e.target.value)}} id="" className='form-control'/>
                    <label>Description (Optional)</label>
                    <textarea name="" id="" cols="10" rows="5" className='form-control' value={description} onChange={(e)=>{setDescription(e.target.value)}}>

                </textarea>




                    <form   method="post" className="form-group"  >

                        <label htmlFor="" className="my-3">
                            Add Image :)
                        </label>
                        <input type="file" name="" id="" className="form-control" onChange={changeHandler}/>
                    </form>
                    <div className="container form-control   my-2">
                        <img src={photo} alt=" " className={"my-2 container "} width={'100px'} height={300} />
                    </div>

                </div>


            </div>

            <div className=" col-md-6 container "> {/*wrapper right*/}

                {/*<div className="container ">wrapper left</div>*/}
                {/*hna dar div dial card hta nrj3 liha */}

                <div className="container mt-5">  {/*wrapper right */}
                    <p> Product type : </p>
                    <input type="text" name="" id="" className={"form-control"} value ={type} onChange={(e)=>{setType(e.target.value)}}/>
                    <hr/>
                    <p>Inventory</p>
                    <input type="text" name="" id="" className={"form-control"} value ={quantity} onChange={(e)=>{setQuantity(e.target.value)}}/>
                    <hr/>
                    <p>Price </p>
                    <input type="text" name="" id="" className={"form-control"} value ={price} onChange={(e)=>{setPrice(e.target.value)}}/>
                </div>
                <div className="h2 text-center container mt-4"> </div>
                <div className="container w-50 mx-auto">
                    <button className="btn-primary btn form-control " onClick={(event)=>{createProduct(event)}} >Save</button>
                </div>
            </div>

        </div>
        </>
    )
}
export default New ;

