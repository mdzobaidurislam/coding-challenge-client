import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { env } from "../../env";
const EditTask = () => {
  const [loading, setSetloading] = useState(false);
  const [loadingTask, setSetloadingTask] = useState(false);
  const [sector, setSector] = useState([]);
  const [sectorsList, setSectorsList] = useState([]);
  const [task, setTask] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();
  //   console.log(id);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const getSectors = async () => {
      try {
        const { data } = await axios.get(`${env.baseUrl}/api/sector`);
        setSectorsList(data.sectorstList);
      } catch (error) {
        console.error(error);
      }
    };
    getSectors();
  }, []);

  useEffect(() => {
    const getTask = async () => {
      setSetloadingTask(true);
      try {
        const { data } = await axios.get(`${env.baseUrl}/api/task/${id}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        });
        console.log(data);
        setTask(data.task);
        setValue("name", task.name);
        setValue("agree", task.agree);
        setSetloadingTask(false);
      } catch (error) {
        console.error(error);
      }
    };
    getTask();
  }, [id, setValue, task.name, task.agree]);

  //   console.log(task);
  const handleSubmitForm = async ({ name, agree }) => {
    setSetloading(true);
    const sectId = [];
    for (let i = 0; i < sector.sectorIds.length; i++) {
      const valll = sector.sectorIds[i];
      if (valll !== sectId[i]?.dd) sectId.push({ sectorId: valll });
    }
    try {
      await axios.put(
        `${env.baseUrl}/api/task/${id}`,
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
      //   console.log(response);

      setSetloading(false);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (evt) => {
    setSector({
      sectorIds: [...evt.target.selectedOptions].map((o) => o.value),
    });
  };
  function createSectors(sectorsList, sectors) {
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
    <Container className=" mt-5">
      <Row>
        <Col lg={8}>
          <Card className=" shadow-lg border-1 p-5 ">
            {loadingTask ? (
              <h1>Loading...</h1>
            ) : (
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
                    type="name"
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
                      {createSectors(sectorsList, task.sector)}
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
                  <button
                    type="submit"
                    className="btn btn-outline-secondary btn-lg w-25"
                  >
                    {loading ? "Loading..." : "Save"}
                  </button>
                </div>
              </form>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditTask;
