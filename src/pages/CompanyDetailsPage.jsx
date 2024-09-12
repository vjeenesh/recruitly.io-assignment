import { Badge, Button, Group, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import classes from "../components/BadgeCard.module.css";
import { useLogin } from "../App";

const CompanyDetailsPage = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [data, setData] = useState({});
  const { cid } = useParams();
  const { isLoggedIn } = useLogin();

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
          <h1 className="font-semibold md:text-6xl text-4xl">
            {data.name}{" "}
            {isLoggedIn && (
              <span className="inline-block font-semibold md:text-6xl text-4xl">
                <NavLink to={`/${cid}/edit`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-edit"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                    <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                    <path d="M16 5l3 3" />
                  </svg>
                </NavLink>
              </span>
            )}
          </h1>
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
