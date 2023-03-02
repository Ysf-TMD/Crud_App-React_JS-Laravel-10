import React , {useEffect , useState} from "react"
import {useNavigate , useParams} from "react-router-dom";
const Edit=()=>{
    //pour naviguer
    const navigate = useNavigate();
    //recupération de l'id via URL  ;
    const {id} = useParams();
    // initialiser les champs via useState
    const [name , setName ] = useState("")
    const [description , setDescription ] = useState("")
    const [photo , setPhoto]=useState("")
    const [type , setType] = useState("")
    const [price , setPrice ]=useState("")
    const [quantity , setQuantity] = useState("")
    const [avatar , setAvatar ]=useState(true)

    // exécution de la fonction getProduct apres chaque changement effectué sur state on generale ;
    useEffect(()=>{
        getProduct();
    },[])
    const getProduct= async ()=>{
        // on va creer l'api qui permet d'avoir les donnes des produits
        await axios.get(`/api/get_edit_product/${id}`)
        // faut ajouter le route de l'api  correspondant dans le dossier Routes  > fichier api.php > Route::get("/edite_product..... , ControllerNom :: class , action a exécuter ...;)
           // apres l'ajoute faut recupérer data (produit a modifier NB: controller deja activé )
            .then(({data})=>{
                console.log(data)
                // on va destructurer data qui porte touts les informations de notre Produit
                const {name ,description , photo , type , quantity , price } = data.product
                //affectation des valeurs vers UseState();
                setName(name)
                setPhoto(photo)
                setDescription(description)
                setPrice(price  )
                setType(type)
                setQuantity(quantity)
            })
            .catch(
                ({response:{data}})=>{

                }
            )
    }
    const ourImage = (img)=>{
        return "/upload/"+img ;
    }
    const changeHandler =(e)=>{
        let file = e.target.files[0]

        let limit = 1024 * 1024 * 2
        if (file["size"]>limit){
            Swal.fire({
                type : "error" ,
                title : "Oops...",
                text : "SomeThing Went wrong ",
                footer : "why Do I Have This Issue ..?? ",
            })
        }
        else {
             let reader = new FileReader()
                reader.onload= e=>
                {
                    setAvatar(false )
                    setPhoto(e.target.result)
                }
            reader.readAsDataURL(file);
        }

    }
    const updateProduct= async (e)=>{
        e.preventDefault();
        const formDate = new FormData ;
        const formData = new FormData()
        formData.append("name",name);
        formData.append("description" , description );
        formData.append( "photo" , photo);
        formData.append( "type" , type);
        formData.append("quantity",quantity);
        formData.append("price",price);
        await axios.post(`/api/update_product/${id}` , formData)
            .then((data)=>{
                toast.fire({
                    incon : "success",
                    title : "Product updated successfully"
                })
                navigate("/")
            })
            .catch((response)=>{
                console.log(response)
            })
    }



    return (
        <>
        <div className="container">
            <div className="container d-flex mt-3">
                <div className="  col-md-6">
                    <div className="h2 text-center container mt-4"> Edit Product <i className="bi bi-pencil"></i> </div>
                    <div className="container w-50 mx-auto">
                        <button className="btn-primary btn form-control" onClick={(e)=>updateProduct(e) } >Edite</button>
                    </div>
                    <div className="container main">
                        <label>Name</label>
                        <input type="text" name="" value = {name} id="" className='form-control' onChange={(e)=>setName(e.target.value)}/>
                        <hr/>
                        <label>Description (Optional)</label>
                        <textarea name="" id="" cols="10" rows="5" className='form-control' value={description} onChange={(e)=>setDescription(e.target.value)}>
                        </textarea>
                        <hr/>


                        {
                            avatar === true
                                ?<img src={ourImage(photo)} alt=" " className={"my-2 container "} width={'100px'}  />
                                :<img src={photo} alt=" " className={"my-2 container "} width={'100px'}  />
                        }
                        <form   method="post" className="form-group"  >

                            <label htmlFor="" className="my-3">
                                Add Image :)
                                <hr/>
                            </label>
                            <input type="file" name="" id="" className="form-control" onChange={changeHandler}/>
                        </form>
                        <div className="container form-control   my-2" >


                        </div>

                    </div>


                </div>

                <div className=" col-md-6 container mt-5 "> {/*wrapper right*/}


                    {/*hna dar div dial card hta nrj3 liha */}

                    <div className="container mt-5">  {/*wrapper right */}
                        <p> Product type : </p>
                        <input type="text" name="" id="" className={"form-control"} value={type} onChange={(e)=>setType(e.target.value)}/>
                        <hr/>
                        <p>Inventory</p>
                        <input type="text" name="" id="" className={"form-control"} value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
                        <hr/>
                        <p>Price </p>
                        <input type="text" name="" id="" className={"form-control"} value={price} onChange={(e)=>setPrice(e.target.value)} />
                    </div>
                    <div className="h2 text-center container mt-4"> </div>
                    <div className="container w-50 mx-auto">
                        <button className="btn-primary btn form-control "  onClick={(e)=>updateProduct(e)} >Edite Product</button>
                    </div>
                </div>

            </div>
        </div>
        </>
    )
}
export default Edit ;
