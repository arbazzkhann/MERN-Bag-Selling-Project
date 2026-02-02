import BagItemSkeleton from "../BagItemsSkeleton/BagItemSkeleton";

export default ({ count }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <BagItemSkeleton key={index} />
      ))}
    </>
  );
};