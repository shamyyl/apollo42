import { useEffect, useRef, useState } from "react";
import { ReactComponent as CommentIcon } from "../../assets/comment.svg";
import { ReactComponent as LikeIcon } from "../../assets/like.svg";
import { SaleType } from "../../dtos/SaleType";

import styles from "./NftCard.module.scss";

interface INftCardProps {
  sale: SaleType;
}

export const NftCard = ({sale}: INftCardProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [likeCount, setLikeCount] = useState(Math.ceil(Math.random() * 150));
  const [viewsCount] = useState(Math.round(Math.random() * 100));

  const [likeInProcess, setLikeInProcess] = useState(false);
  const handleLike = () => {
    setLikeInProcess(true);
    setLikeCount(likeCount + 1);
    setTimeout(() => setLikeInProcess(false), 100);
  }

  const initCard = () => {
    if (cardRef?.current && wrapperRef?.current) {
      const cardHeight = cardRef.current.clientHeight;
      wrapperRef.current.style.height = `${cardHeight}px`;
      cardRef.current.style.position = "absolute";
    }
  }
  useEffect(() => {
    initCard();
    window.addEventListener('resize', initCard);
    return () => window.removeEventListener('resize', initCard);
  }, []);

  const handleMouseEnter = () => {
    window.requestAnimationFrame(() => {
      if (cardRef?.current && wrapperRef?.current) {
        cardRef.current.classList.add(styles["hovered"]);
      }
    });
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      if (cardRef?.current && wrapperRef?.current) {
        cardRef.current.classList.remove(styles["hovered"]);
      }
    });
  };

  return (
    <div
      className={styles["nft-card-wrap"]}
      ref={wrapperRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles["nft-card"]} ref={cardRef}>
        <div className={styles['image-container']}>
          <img
            src="/images/nft-static.png"
            alt=""
            className={styles["main-image"]}
          />
        </div>
        <div className={styles["content"]}>
          <div className={styles["row"]}>
            <img
              src="/images/nft-static-user.jpeg"
              alt="Elena Kutina"
              className={styles["user-image"]}
            />
            <div className={styles["user"]}>
              <p className={styles["name"]}>{sale.ownerId}</p>
              <p className={styles["date"]}>15 days ago</p>
            </div>
            <div className={styles["views-count"]}>
              <img src="/icons/views.svg" alt="views-count" />
              <span>{viewsCount} k</span>
            </div>
          </div>
          <div className={styles["row"]}>
            <p className={styles["nft-name"]}>#1 Cloud Coffee</p>
            <p className={styles["price"]}>{(+sale.price / Math.pow(10, 24)).toFixed(2)} {sale.ftTokenId}</p>
          </div>
          <div className={styles["social"]}>
            <button type="button" className={styles['like']} onClick={handleLike}>
              <LikeIcon className={likeInProcess ? styles['like-animation'] : ''}/>
              <span>{likeCount}</span>
            </button>
            <button type="button" className={styles['comment']}>
              <CommentIcon/>
              <span>23</span>
            </button>
          </div>
        </div>
        <div className={styles["hover-shadow"]} />
      </div>
    </div>
  );
};
