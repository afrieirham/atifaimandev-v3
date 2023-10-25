import { useLottie } from "lottie-react";
import { NextPage } from "next";
import Link from "next/link";
import Default from "../components/layout/Default";

const Page404: NextPage = ({}) => {
  const style = {
    height: 300,
  };

  const options = {
    animationData: require("/animation/lost-in-forest.json"),
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options, style);

  console.log(
    "%cDid you just lost and try to find a way back through console? 👀",
    "background: #222; color: #bada55"
  );

  return (
    <Default title="Are you lost?">
      {View}

      <Link href="/"  className="my-12 px-8 mx-auto py-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-700 hover:to-indigo-700 transition-colors duration-300 w-max rounded-md text-white font-bold">
        🗺️ &nbsp; &nbsp;Show me da wae?
      </Link>
    </Default>
  );
};

export default Page404;
