import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { env } from "../../env";

const AllTask = ({ dataList }) => {
  const [loading, setSetloading] = useState(false);
  const [datas, setData] = useState([]);

  const getTasks = async () => {
    try {
      setSetloading(true);
      const { data } = await axios.get(`${env.baseUrl}/api/task`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      setData(data.tasks);
      setSetloading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getTasks();
  }, [dataList]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const url = `${env.baseUrl}/api/task/${id}`;
          const { data } = await axios.delete(url, {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          });
          if (data.status) {
            Swal.fire(`Deleted!`, data.message, `success`);
          } else {
            Swal.fire(`Deleted!`, data.message, `success`);
          }
          getTasks();
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <Container className="mt-4">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div>
            <Link to="/">Back</Link>
          </div>
          <Table responsive hover>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Sectors</th>
                <th scope="col">Agree</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {datas &&
                datas.map((item, index) => (
                  <tr key={item._id}>
                    <th scope="row" key={item._id}>
                      {index + 1}
                    </th>
                    <td>{item.name}</td>
                    <td>
                      {item.sector.length > 0
                        ? item.sector.map((item, i) => (
                            <span
                              key={item.sectorId._id}
                              className="badge bg-secondary m-2"
                            >
                              {item.sectorId.name}
                            </span>
                          ))
                        : "No"}
                    </td>
                    <td>
                      {item.agree ? (
                        <span className="badge bg-success m-2">Active</span>
                      ) : (
                        <span className="badge bg-warning m-2">In Active</span>
                      )}
                    </td>
                    <td>
                      <Link to={`/task/${item._id}`} className="btn btn-light ">
                        Edit
                      </Link>
                      <Button
                        type="button"
                        className="btn btn-dark"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default AllTask;
