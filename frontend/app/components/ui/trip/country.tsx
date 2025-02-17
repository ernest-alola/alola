import Image from "next/image";
import Wrapper from "./components/wrapper";

interface CountryProps {
  name: string;
  description: string;
  imageUrl: string;
  city: string;
}

export default function Country({ 
    city,
    name, 
    description, 
    imageUrl
}: CountryProps) {
  return (
    <Wrapper>
      <h2 className="text-xl font-bold py-4">{city}, {name}</h2>
      {/* Country Info */}
      <div className="space-y-2 flex flex-row">
        <p className="text-gray-600 text-sm">{description}</p>
        {/* Country Image */}
        <div className="relative w-full h-40">
          <Image 
            src={imageUrl} 
            alt={name} 
            layout="fill" 
            objectFit="cover" 
            className="rounded-t-2xl"
          />
        </div>
      </div>
    </Wrapper>
  );
}
