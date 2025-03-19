import ItemCard from "@/components/ItemCard";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await fetch("http://localhost:3000/api/productListApi");
  const product = await data.json();
  console.log(product);
  return (
    <div>
      {/* <div>Product: {id}</div> */}
      <div>
        <ItemCard
          id={id}
          title={product[id].title}
          description={product[id].description}
        />
      </div>
    </div>
  );
}
