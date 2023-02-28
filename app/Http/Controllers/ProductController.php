<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;

class ProductController extends Controller
{
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
            $img = Image::make($request->photo)->resize(117,100) ;
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
    public function Get_ALL (){
        $products = Product::all();
        return response()->json([
            'products'=>$products
        ],200);
    }
}
