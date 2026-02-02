import "./BagItemSkeleton.css";

export default function BagItemSkeleton() {
  return (
    <div className="bag-list">
      <div className="bag-item skeleton">
        <div className="bag-item-image-container">
          <div className="skeleton-image"></div>
        </div>

        <div className="bag-item-info">
          <div className="bag-item-name-rating">
            <div className="skeleton-text title"></div>
            <div className="skeleton-rating"></div>
          </div>

          <div className="skeleton-text mrp"></div>
          <div className="skeleton-text price"></div>
        </div>
      </div>
    </div>
  );
}