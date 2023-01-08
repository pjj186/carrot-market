import type { NextPage } from "next";
import Link from "next/link";
import FloatingButton from "@components/floating-button";
import Layout from "@components/layout";
import { Stream } from "@prisma/client";
import useSWR from "swr";
import { useEffect, useState } from "react";
import Image from "next/image";

interface StreamsResponse {
  ok: boolean;
  streams: Stream[];
}

const Streams: NextPage = () => {
  const [page, setPage] = useState(1);
  const [mergedData, setMergedData] = useState<Stream[]>([]);

  const { data } = useSWR<StreamsResponse>(`/api/streams?page=${page}`);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage((prev) => prev + 1);
    }
  };
  useEffect(() => {
    if (data) setMergedData((prev) => prev.concat(data?.streams));
  }, [data]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setPage, page]);

  return (
    <Layout hasTabBar title="라이브">
      <div className=" divide-y-[1px] space-y-4">
        {mergedData.map((stream) => (
          <Link key={stream.id} href={`/streams/${stream.id}`}>
            <span className="pt-4 block  px-4">
              <div className="w-full relative overflow-hidden rounded-md shadow-sm aspect-video">
                <Image
                  layout="fill"
                  alt="thumbnail"
                  src={`https://videodelivery.net/${stream.cloudflareId}/thumbnails/thumbnail.jpg?height=320`}
                />
              </div>
              <h1 className="text-2xl mt-2 font-bold text-gray-900">
                {stream.name}
              </h1>
            </span>
          </Link>
        ))}
        <FloatingButton href="/streams/create">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            ></path>
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Streams;
