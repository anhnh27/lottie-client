import { FC } from "react";
import { useSelector } from "react-redux";
import PublicAnimationList from "../components/public-animation-list";
import { selectPublicAnimationFetchParams } from "../slice/public-animations";

const MainPage: FC = () => {
  const { query } = useSelector(selectPublicAnimationFetchParams);

  return (
    <div className="w-11/12 mx-auto">
      <div className="text-3xl font-bold my-4">
        Legendary creators and their creations
      </div>
      <div className="mb-10">
        Welcome to the largest community of designers and developers using
        Lottie. An extensive, curated library of free assets awaits you.
      </div>
      {query && (
        <div className="font-bold text-xl text-start">{`Search results for "${query}"`}</div>
      )}
      <PublicAnimationList />
    </div>
  );
};

export default MainPage;
