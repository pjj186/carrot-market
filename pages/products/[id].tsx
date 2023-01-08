import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import Link from "next/link";
import Image from "next/image";
import Skeleton from "@mui/material/Skeleton";
import { Product, User } from "@prisma/client";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import useUser from "@libs/client/useUser";
import client from "@libs/server/client";

interface ProductWithUser extends Product {
  user: User;
}

interface ItemDetailResponse {
  ok: boolean;
  product: ProductWithUser;
  relatedProducts: Product[];
  isLiked: boolean;
}

const ItemDetail: NextPage<ItemDetailResponse> = ({
  product,
  relatedProducts,
  isLiked,
}) => {
  const { user, isLoading } = useUser({});
  const router = useRouter();
  const { mutate: unBoundMutate } = useSWRConfig();
  const { data, mutate: boundMutate } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/products/${router.query.id}` : null
  );
  const [toggleFav] = useMutation(`/api/products/${router.query.id}/fav`);
  const onFavClick = () => {
    if (!data) return;
    boundMutate((prev) => prev && { ...prev, isLiked: !prev.isLiked }, false);
    toggleFav({});
    // unBoundMutate("/api/users/me", { ok: false }, false);
  };

  return (
    <Layout canGoBack>
      <div className="px-4  py-4">
        <div className="mb-8">
          <div className="relative pb-80">
            <Image
              src={`https://imagedelivery.net/DJ4KAEvQ7GPpnrP9HPsyuA/${product.image}/public`}
              className="bg-slate-300 object-cover"
              layout="fill"
              alt="productImage"
            />
          </div>
          <div className="flex cursor-pointer py-3 border-t border-b items-center space-x-3">
            <Image
              width={48}
              height={48}
              src={`https://imagedelivery.net/DJ4KAEvQ7GPpnrP9HPsyuA/${product.user.avatar}/avatar`}
              className="w-12 h-12 rounded-full bg-slate-300"
              alt="avatar"
            ></Image>
            <div>
              {!data ? (
                <Skeleton animation="wave" width={80} height="auto" />
              ) : (
                <p className="text-sm font-medium text-gray-700">
                  {product?.user?.name}
                </p>
              )}
              {!data ? (
                <Skeleton animation="wave" width={80} height="auto" />
              ) : (
                <Link href={`users/profiles/${product?.user?.id}`}>
                  <span className="text-xs font-medium text-gray-500">
                    View profile &rarr;
                  </span>
                </Link>
              )}
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">
              {!data ? (
                <Skeleton animation="wave" width={100} height="auto" />
              ) : (
                product?.name
              )}
            </h1>
            <span className="text-2xl block mt-3 text-gray-900">
              {!data ? (
                <Skeleton animation="wave" width={80} height="auto" />
              ) : (
                "$" + product?.price
              )}
            </span>
            <p className=" my-6 text-gray-700">{product?.description}</p>
            <div className="flex items-center justify-between space-x-2">
              <Button large text="Talk to seller" />
              <button
                className={cls(
                  "p-3 rounded-md flex items-center hover:bg-gray-100 justify-center",
                  isLiked
                    ? "text-red-500 hover:text-red-600"
                    : "text-gray-400 hover:text-gray-500"
                )}
                onClick={onFavClick}
              >
                {isLiked ? (
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6 "
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Similar items</h2>
          <div className=" mt-6 grid grid-cols-2 gap-4">
            {relatedProducts.map((product) => (
              <Link href={`/products/${product?.id}`} key={product.id}>
                <div className="cursor-pointer">
                  <div className="h-56 w-full mb-4 bg-slate-300" />
                  <h3 className="text-gray-700 -mb-1">{product.name}</h3>
                  <span className="text-sm font-medium text-gray-900">
                    ${product.price}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  if (!ctx?.params?.id) {
    return {
      props: {},
    };
  }
  const product = await client.product.findUnique({
    where: {
      id: +ctx?.params?.id?.toString()!,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });

  const terms = product?.name.split(" ").map((word) => ({
    name: {
      contains: word,
    },
  }));

  const relatedProducts = await client.product.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: product?.id,
        },
      },
    },
  });

  const isLiked = false;
  // Boolean(
  //   await client.fav.findFirst({
  //     where: {
  //       productId: product?.id,
  //       userId: user?.id,
  //     },
  //     select: {
  //       id: true,
  //     },
  //   })
  // );
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      relatedProducts: JSON.parse(JSON.stringify(relatedProducts)),
      isLiked,
    },
  };
};

export default ItemDetail;
