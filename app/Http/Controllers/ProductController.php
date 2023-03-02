<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;

class ProductController extends Controller
{
    //fonction d'ajouter un produit via un formulaire ...
//    1: on ajoute l'instance de model product
    public function add_product (Request  $request )
    {
//        importer le model responsable de votre Produit a ajouter
        $product = new Product();
        $product->name = $request->name ;
        $product->description = $request->description;
        if($request->photo !="")
        {
            $strpos = strpos($request->photo , ";") ;
            $sub = substr($request->photo , 0,$strpos);
            $ex = explode("/",$sub)[1];
            $name = time().".".$ex ;
            $img = Image::make($request->photo)->resize(550,550) ;
//            apres cette etape la jai ajouter la commande via cmd : composer require intervention / image
//            sans oublier de montionner que jai ajouter la configuration du package Intervention dans config>app.php
//            57:05
            $upload_path = public_path()."/upload/";
            $img->save($upload_path.$name);
            $product->photo = $name ;
        }else {
            $product->photo = "image.png";
        }
        $product->photo = $name ;
        $product->type = $request->type ;
        $product->quantity=$request->quantity;
        $product->description=$request->description ;
        $product->price=$request->price ;
        $product->save();


    }
    // fonction pour recupérer touts les produits pour l'afficher
    public function Get_ALL (){
        $products = Product::all();
        return response()->json([
            'products'=>$products
        ],200);
    }
    //mntn on va creer la fonction responsable sur la modification (obtention des informations via Request GET et les inserer ;o )
    public function get_edit_product($id)
    {
        //ici la recupération du produit a modifier via son ID  ;
        $product = Product::find($id);
        // on va recupérer la response puis la conversion via Une Format Json ;
        return response()->json([
            "product"=>$product
        ],200);
    }
    public function update_product(Request $request  , $id )
    {
     $product = Product ::find($id) ;
     $product->name = $request->name ;
     $product ->description = $request->description ;
     if($product->photo !=$request->photo)
     {
         $strpos = strpos($request->photo , ";") ;
         $sub = substr($request->photo , 0,$strpos);
         $ex = explode("/",$sub)[1];
         $name = time().".".$ex ;
         $img = Image::make($request->photo)->resize(500,500) ;
         $upload_path = public_path()."/upload/";
         $image=$upload_path.$product->photo ;
         $img->save($upload_path.$name);
         if(file_exists($image))
         {
             @unlink($image) ;
         }
     }else
     {
         $name = $product ->photo ;
     }
        $product->photo = $name ;
        $product->type = $request->type ;
        $product->quantity=$request->quantity;
        $product->description=$request->description ;
        $product->price=$request->price ;
        $product->save();
    }
    public function delete_product($id )
    {
        $product = Product::findOrFail($id);
        $image_path = public_path()."/upload/";
        $image = $image_path . $product->photo;
        if(file_exists($image))
        {
            @unlink($image);
        }
        $product->delete();
    }
}
