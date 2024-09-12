import {
  Paper,
  Text,
  TextInput,
  Button,
  Group,
  SimpleGrid,
} from "@mantine/core";
import classes from "./CreateCompany.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CreateCompany() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  async function formSubmitHandler(e) {
    e.preventDefault();
    console.log(
      JSON.stringify({
        email: formData.company_email,
        name: formData.company_name,
        ownerName: formData.owner_name,
        website: formData.company_website,
        headOffice: {
          address: {
            cityName: formData.city,
            countryName: formData.country,
          },
        },
      })
    );
    try {
      let res_data = await fetch(
        `https://api.recruitly.io/api/company?apiKey=${apiKey}`,
        {
          method: "post",
          body: JSON.stringify({
            email: formData.company_email,
            name: formData.company_name,
            ownerName: formData.owner_name,
            website: formData.company_website,
            headOffice: {
              address: {
                cityName: formData.city,
                countryName: formData.country,
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

  function handleInputChange(e, name) {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <Paper shadow="md" radius="lg">
      <div className={classes.wrapper}>
        <form className={classes.form} onSubmit={(e) => formSubmitHandler(e)}>
          <Text fz="lg" fw={700} className={classes.title}>
            Create A Company!
          </Text>

          <div className={`text-left ${classes.fields}`}>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <TextInput
                label="Company Name"
                placeholder="Your name"
                required
                onChange={(e) => handleInputChange(e, "company_name")}
              />
              <TextInput
                label="Owner Name"
                placeholder="FirstName LastName"
                onChange={(e) => handleInputChange(e, "owner_name")}
                required
              />
            </SimpleGrid>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <TextInput
                label="Contact Email"
                placeholder="example@email.com"
                onChange={(e) => handleInputChange(e, "company_email")}
              />
              <TextInput
                label="Company Website"
                placeholder="www.example.com"
                onChange={(e) => handleInputChange(e, "company_website")}
              />
            </SimpleGrid>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <TextInput
                label="City"
                placeholder="City name"
                onChange={(e) => handleInputChange(e, "city")}
              />
              <TextInput
                label="Country"
                placeholder="Country Name"
                onChange={(e) => handleInputChange(e, "country")}
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
