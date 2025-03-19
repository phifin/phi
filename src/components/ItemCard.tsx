import Link from "next/link";
import React from "react";
import ProductImage from "../app/favicon.ico";
import Image from "next/image";

interface ItemCardProps {
  id: string;
  title: string;
  description: string;
}

export default function ItemCard({ id, title, description }: ItemCardProps) {
  return (
    <Link
      href={`productDetail/${id}`}
      className="flex flex-col justify-between items-center"
    >
      <div className="text-2xl font-bold">{title}</div>
      <Image src={ProductImage} alt="pi" className="mt-7" />
      <div className="mt-4">{description}</div>
    </Link>
  );
}
