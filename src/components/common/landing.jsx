import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // if using shadcn/ui
import { IndianRupee, Store, Truck } from "lucide-react";
import { useSelector } from "react-redux";

const Landing = () => {
    const {user}=useSelector((state)=>state.auth);
    const navigate=useNavigate();
    useEffect(()=>{
        if(!user){
            navigate('/auth/login');
        }
        else{
            if(user?.role === 'admin') navigate('/admin/dashboard');
            else navigate('/shop/home');
        }
    })
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between p-8 lg:p-16 bg-gradient-to-br from-pink-100 via-white to-blue-100">
        <div className="max-w-xl text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Discover Trendy Fashion, Curated Just for You
          </h1>
          <p className="text-gray-700 text-lg mb-6">
            Shop stylish clothing, shoes, and accessories from top brands. Your style journey starts here.
          </p>
          <Link to="/shop/home">
            <Button className="text-lg px-6 py-3 rounded-2xl shadow-md">
              Start Shopping
            </Button>
          </Link>
        </div>
        <img
          src="/cartzy.png" // replace with actual hero image
          alt="Fashion Models"
          className="w-full max-w-md rounded-2xl shadow-xl mb-10 lg:mb-0"
        />
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 bg-gray-100 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div>
          {/* <img src="/icons/free-shipping.svg" alt="Free Shipping" className="mx-auto mb-4 w-12" /> */}
          <Truck className="mx-auto mb-4 w-12 h-12"/>
          <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
          <p className="text-gray-600">On all orders above $50. Fast and reliable delivery.</p>
        </div>
        <div>
          {/* <img src="/icons/secure-payment.svg" alt="Secure Payment" className="mx-auto mb-4 w-12" /> */}
          <IndianRupee className="mx-auto mb-4 w-12 h-12"/>
          <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
          <p className="text-gray-600">100% secure payment gateway with multiple options.</p>
        </div>
        <div>
          {/* <img src="/icons/return.svg" alt="Easy Returns" className="mx-auto mb-4 w-12" /> */}
          <Store className="mx-auto mb-4 w-12 h-12"/>
          <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
          <p className="text-gray-600">Hassle-free returns within 7 days of purchase.</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-black text-white py-12 px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Style is Just a Click Away</h2>
        <p className="text-lg mb-6">Join thousands who trust our platform for their fashion needs.</p>
        <Link to="/shop/home">
          <Button variant="outline" className="text-black bg-white hover:bg-gray-100 text-lg px-6 py-3 rounded-2xl">
            Explore Now
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Landing;
