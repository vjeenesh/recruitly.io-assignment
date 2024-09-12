import {
  Paper,
  Text,
  TextInput,
  Button,
  Group,
  SimpleGrid,
} from "@mantine/core";
import classes from "./CreateCompany.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function CompanyEdit() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [data, setData] = useState({});
  const { cid } = useParams();
  const companyNameRef = useRef();
  const ownerNameRef = useRef();
  const emailref = useRef();
  const siteRef = useRef();
  const cityRef = useRef();
  const countryRef = useRef();
  const navigate = useNavigate();

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

  async function formSubmitHandler(e) {
    e.preventDefault();
    // console.log(
    // JSON.stringify({
    //   email: emailref.current.value,
    //   name: companyNameRef.current.value,
    //   ownerName: ownerNameRef.current.value,
    //   website: siteRef.current.value,
    //   headOffice: {
    //     address: {
    //       cityName: cityRef.current.value,
    //       countryName: countryRef.current.value,
    //     },
    //   },
    // })
    // );
    try {
      let res_data = await fetch(
        `https://api.recruitly.io/api/company?apiKey=${apiKey}`,
        {
          method: "post",
          body: JSON.stringify({
            id: cid,
            email: emailref.current.value,
            name: companyNameRef.current.value,
            ownerName: ownerNameRef.current.value,
            website: siteRef.current.value,
            headOffice: {
              address: {
                cityName: cityRef.current.value,
                countryName: countryRef.current.value,
              },
            },
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then(async (res) => {
        let resData = await res.json();
        return resData;
      });
      navigate(`/${res_data.id}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Paper shadow="md" radius="lg">
      <div className={classes.wrapper}>
        <form className={classes.form} onSubmit={(e) => formSubmitHandler(e)}>
          <Text fz="lg" fw={700} className={classes.title}>
            Update Company
          </Text>

          <div className={`text-left ${classes.fields}`}>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <TextInput
                label="Company Name"
                placeholder="Your name"
                ref={companyNameRef}
                defaultValue={data.name}
                required
              />
              <TextInput
                label="Owner Name"
                placeholder="FirstName LastName"
                ref={ownerNameRef}
                defaultValue={data.ownerName}
                required
              />
            </SimpleGrid>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <TextInput
                label="Contact Email"
                placeholder="example@email.com"
                ref={emailref}
                defaultValue={data.email}
                required
              />
              <TextInput
                label="Company Website"
                placeholder="www.example.com"
                ref={siteRef}
                defaultValue={data.website}
                required
              />
            </SimpleGrid>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <TextInput
                label="City"
                placeholder="City name"
                ref={cityRef}
                defaultValue={data.headOffice?.address?.cityName}
                required
              />
              <TextInput
                label="Country"
                placeholder="Country Name"
                required
                ref={countryRef}
                defaultValue={data.headOffice?.address?.countryName}
              />
            </SimpleGrid>

            <Group justify="flex-end" mt="md">
              <Button type="submit" className={classes.control}>
                Submit
              </Button>
            </Group>
          </div>
        </form>
      </div>
    </Paper>
  );
}
