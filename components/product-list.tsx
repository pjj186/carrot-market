import { ProductsWithFav } from "pages";
import useSWR from "swr";
import Item from "./item";

interface ProductListProps {
  kind: "favs" | "purchases" | "sales";
}

interface Record {
  id: number;
  product: ProductsWithFav;
}

interface ProductListResponse {
  [key: string]: Record[];
}

export default function ProductList({ kind }: ProductListProps) {
  const { data } = useSWR<ProductListResponse>(`/api/users/me/${kind}`);
  return data ? (
    <>
      {data[kind]?.map((record) => (
        <Item
          id={record.product.id}
          key={record.id}
          title={record.product.name}
          price={record.product.price}
          hearts={record.product._count.favs}
        />
      ))}
    </>
  ) : null;
}
