import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { InView } from "react-intersection-observer";
import { NftCard } from "../../../components/NftCard/NftCard";
import { SaleType } from "../../../dtos/SaleType";
import { apolloClient } from "../../../utils/apolloClient";

import styles from "./ListSection.module.scss";

const GET_SALES = gql`
  query getSales($skip: Int!) {
    sales(first: 10, skip: $skip, where: {isActive: true}) {
      id
      ownerId
      ftTokenId
      price
    }
  }
`;

const ITEMS_PER_PAGE = 10;

export const ListSection = () => {
  const [skip, setSkip] = useState(0);
  const [sales, setSales] = useState<SaleType[]>([]);
  
  useEffect(() => {
    const getSales = async () => {
      const {data} = await apolloClient.query<{ sales: SaleType[] }>({
        query: GET_SALES,
        variables: {
          skip,
        },
      });
      setSales((s) => [...s, ...data.sales]);
    }
    getSales();
  }, [skip]);

  const handleInView = (index: number, inView: boolean) => {
    if (inView && index === (sales.length - 3)) {
      setSkip(skip + ITEMS_PER_PAGE);
    }
  };

  return (
    <section className={styles["list-section"]}>
      <div className={styles["list"]}>
        {sales.map((sale, index) => (
          <InView onChange={(inView) => handleInView(index, inView)}>
            <NftCard key={sale.id} sale={sale} />
          </InView>
        ))}
      </div>
    </section>
  );
};
