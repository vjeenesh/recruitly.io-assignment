import React, { Suspense, useEffect, useState } from "react";
import { BadgeCard } from "../components/Card";
import { SimpleGrid } from "@mantine/core";

const HomePage = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let res_data = await fetch(
          `https://api.recruitly.io/api/company/list?apiKey=${apiKey}`
        ).then(async (res) => {
          let resData = await res.json();
          console.log(resData);
          return resData;
        });

        setData(res_data.data);

        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        {data && data.length > 0 ? (
          data.map((item) => (
            <BadgeCard
              id={item.id}
              key={item.id}
              company_name={item.name}
              employees_count={item.employees}
              industries={item.industries}
              city_country={
                item.headOffice?.address?.cityName +
                ", " +
                item.headOffice?.address?.country
              }
            />
          ))
        ) : (
          <p>No data available</p>
        )}
      </SimpleGrid>
    </div>
  );
};

export default HomePage;
