import { Badge, Button, Card, Group, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import classes from "../components/BadgeCard.module.css";

const CompanyDetailsPage = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [data, setData] = useState({});
  const { cid } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        let res_data = await fetch(
          `https://api.recruitly.io/api/company/${cid}?apiKey=${apiKey}`
        ).then(async (res) => {
          let resData = await res.json();
          // console.log(resData);
          return resData;
        });

        setData(res_data);

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [cid]);

  const industry = data?.industries?.length > 0 ? data?.industries[0].name : "";
  const city_country =
    data.headOffice?.address?.cityName +
    ", " +
    data.headOffice?.address?.country;

  const features = data.industries?.map((badge) => (
    <Badge className="mx-2" variant="light" key={badge.name}>
      {badge.name}
    </Badge>
  ));

  return (
    <div>
      {data && (
        <main>
          <h1 className="font-semibold md:text-6xl text-4xl">{data.name}</h1>
          <p className="my-3">
            {city_country +
              " | " +
              (data.employees
                ? data.employees?.includes("employees")
                  ? data.employees
                  : data.employees + " employees"
                : "Unknown")}
          </p>
          <p className="my-3">
            Owned by:{" "}
            <span>
              {data.ownerName
                ?.split(" ")
                .map(
                  (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join(" ")}
            </span>
          </p>
          <div className="w-1/2 mx-auto my-3">
            <section className={`h-full ${classes.section}`}>
              <Text mt="md" className="text-start inline-block" c="dimmed">
                Industry:
              </Text>
              <Group className="inline-block ml-2" gap={7} mt={5}>
                {features}
              </Group>
            </section>
          </div>
          <p className="my-3">
            Address: <span>{data.headOffice?.address?.addressLabel}</span>
          </p>
          <p className="my-3">
            Contact:{" "}
            <NavLink target="_blank" to={`mailto:${data.email}`}>
              <span className="text-blue-600 font-semibold">{data.email}</span>
            </NavLink>
          </p>
          <NavLink target="_blank" to={data.website}>
            <Button radius="md">Visit Company Site</Button>
          </NavLink>
        </main>
      )}
    </div>
  );
};

export default CompanyDetailsPage;
