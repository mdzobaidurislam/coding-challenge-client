import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AllTask from "./AllTask";
import { Button, Col, Container, Row } from "react-bootstrap";
import { env } from "../../env";

const Task = () => {
  const [loading, setSetloading] = useState(false);
  const [sector, setSector] = useState([]);
  const [sectorsList, setSectorsList] = useState([]);
  const [dataList, setDataList] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const getSectors = async () => {
      try {
        const { data } = await axios.get(`${env.baseUrl}/api/sector`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        });
        setSectorsList(data.sectorstList);
      } catch (error) {
        console.error(error);
      }
    };
    getSectors();
  }, []);

  const handleSubmitForm = async ({ name, agree }) => {
    setSetloading(true);
    const sectId = [];
    for (let i = 0; i < sector.sectorIds.length; i++) {
      const valll = sector.sectorIds[i];
      if (valll !== sectId[i]?.dd) sectId.push({ sectorId: valll });
    }
    try {
      const response = await axios.post(
        `${env.baseUrl}/api/task`,
        {
          name,
          sectId,
          agree,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      if (response.status === 201) {
        setSetloading(false);
        setDataList(response);
        reset();
      }
      // console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (evt) => {
    setSector({
      sectorIds: [...evt.target.selectedOptions].map((o) => o.value),
    });
  };
  function createSectors(sectorsList) {
    const sectorList = [];
    // console.log(sectorsList);
    for (let cate of sectorsList) {
      sectorList.push(
        <>
          <option
            className={cate.parentId ? "parentId" : "noparentId"}
            key={cate._id}
            value={cate._id}
          >
            {cate.name}
          </option>
          {cate.children.length > 0 ? createSectors(cate.children) : ""}
        </>
      );
    }
    return sectorList;
  }

  return (
    <Container className="container mt-5">
      <Row>
        <Col lg="5">
          <div className="card shadow-lg border-1 p-5 ">
            <form onSubmit={handleSubmit(handleSubmitForm)}>
              <h4 className="card-title mb-3">
                Please enter your name and pick the Sectors you are currently
                involved in.
              </h4>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  {...register("name", {
                    required: "Please enter name",
                  })}
                  placeholder="Enter name"
                />
                {errors.name && (
                  <div className="text-danger">{errors.name.message}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="sectors" className="form-label">
                  Sectors:
                </label>
                <div>
                  <select
                    id="sectors"
                    className="form-control"
                    multiple={true}
                    size="6"
                    {...register("sectorsName", {
                      required: "Select a sectors",
                    })}
                    onChange={handleChange}
                  >
                    {createSectors(sectorsList)}
                  </select>
                </div>
                {errors.sectorsName && (
                  <div className="text-danger">
                    {errors.sectorsName.message}
                  </div>
                )}
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="agree"
                  {...register("agree", {
                    required: "Please agree the condition",
                  })}
                />
                <label className="form-check-label" htmlFor="agree">
                  Agree to terms
                </label>
                {errors.agree && (
                  <div className="text-danger">{errors.agree.message}</div>
                )}
              </div>
              <div className="mb-3 mt-3">
                {/* <Button
                  type="submit"
                  className="btn btn-outline-secondary btn-lg lg-w-25"
                >
                  {loading ? "Loading..." : "Save"}
                </Button> */}
                <Button
                  type="submit"
                  variant="outline-secondary"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Save"}
                </Button>
              </div>
            </form>
          </div>
        </Col>
        <Col lg="7">
          <AllTask dataList={dataList} />
        </Col>
      </Row>
    </Container>
  );
};

export default Task;
