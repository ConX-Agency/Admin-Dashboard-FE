import { Card } from "@/components/ui/card";
import React from "react";

const Blocks = ({ keyProp, isFocused }: { keyProp: string, isFocused: boolean }) => {

  return (
    <Card
      className={`h-full w-full flex flex-col justify-center items-center relative dark:text-white text-black 
        dark:shadow-dark-box-shadow overflow-hidden text-3xl rounded-3xl`} 
        style={{ opacity: isFocused ? 1 : 0.25, transition: '.3s opacity ease-out'}}
    >
        {keyProp}
    </Card>
  );
};

export default Blocks;
