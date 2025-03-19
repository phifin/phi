"use client";
import React, { useEffect, useState } from "react";
import ItemCard from "@/components/ItemCard";

interface ItemCardProps {
  id: string;
  title: string;
  description: string;
}
export default function Page() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/api/productListApi");
      // const result = response.json()
      // setData(result)
      const result = await response.json();
      setData(result);
      console.log("test", result);
    };

    fetchData();
  }, []);
  const renderItem = data.map((item: ItemCardProps) => {
    return (
      <span
        key={item.id}
        className="ml-10 mt-7 grid-cols-4 text-black hover:bg-amber-500"
      >
        <ItemCard
          id={item.id}
          description={item.description}
          title={item.title}
        />
      </span>
    );
  });

  return (
    <div>
      <div className="mt-10 text-center text-3xl font-bold">Product List</div>
      <div className="grid grid-cols-4 mt-10">{renderItem}</div>
    </div>
  );
}
