import Category from "../../components/Category/Category";
import HeroSection from "../../components/HeroSection/HeroSection";
import HomeProductCard from "../../components/HomeProductCard/HomeProductCard";
import Layout from "../../components/Layout/Layout";
import Loader from "../../components/Loader/Loader";
import MyContext from "../../context/MyContext";
import React, { useContext } from "react";
import Testimonial from "../../components/Testimonial/Testimonial";
import Track from "../../components/Track/Track";
import { Outlet } from "react-router-dom";

function Home() {

  const { name } = useContext(MyContext)
  return (
    <Layout>


      <HeroSection />
      <Category />
      <HomeProductCard />
      <Track />
      <Testimonial />
   
    </Layout>

  )
}

export default Home