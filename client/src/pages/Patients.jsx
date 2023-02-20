import React, { useEffect } from "react";
import styles from "../css/pages/Patients.module.css";
import { BsSearch } from "react-icons/bs";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import instance from "../config/axios.js";
import { NavLink } from "react-router-dom";
import { ContextProvider } from "../config/Context";
const Patients = () => {
  const [data, setData] = React.useState([{}]);
  const { hp } = React.useContext(ContextProvider);
  const [hospitalData, setHospitalData] = hp;
  const getRecentPatients = async () => {
    const patientdata = await instance.post("/hospital/getrecentpatient", {
      hm_hid: hospitalData?.hm_hid,
    });
    setData(patientdata.data.data);
  };
  useEffect(() => {
    getRecentPatients();
  }, []);
  const columns = [
    {
      id: "sn",
      label: "SN",
      minWidth: 50,
    },
    {
      id: "pic",
      label: "Profile Pic",
      minWidth: 100,
    },
    {
      id: "name",
      label: "Name",
      minWidth: 100,
    },
    {
      id: "address",
      label: "Address",
      minWidth: 100,
    },
    {
      id: "contact",
      label: "Contact",
      minWidth: 80,
    },
    {
      id: "gender",
      label: "Gender",
      minWidth: 80,
    },
    {
      id: "blood_group",
      label: "Blood Group",
      minWidth: 80,
      align: "center",
    },
  ];

  // const data = [
  //   {
  //     id: 1,
  //     profile_pic: "/user.jpg",
  //     name: "John Doe",
  //     address: "Kathmandu",
  //     contact: "984567890",
  //     gender: "Male",
  //     blood_group: "A+",
  //   },
  //   {
  //     id: 1,
  //     profile_pic: "/user.jpg",
  //     name: "John Doe",
  //     address: "Kathmandu",
  //     contact: "984567890",
  //     gender: "Male",
  //     blood_group: "A+",
  //   },
  //   {
  //     id: 1,
  //     profile_pic: "/user.jpg",
  //     name: "John Doe",
  //     address: "Kathmandu",
  //     contact: "984567890",
  //     gender: "Male",
  //     blood_group: "A+",
  //   },
  //   {
  //     id: 1,
  //     profile_pic: "/user.jpg",
  //     name: "John Doe",
  //     address: "Kathmandu",
  //     contact: "984567890",
  //     gender: "Male",
  //     blood_group: "A+",
  //   },
  // ];
  return (
    <>
      <div className={styles.patients_con}>
        <div className={styles.patients_top}>
          <p className={styles.title}> Recent Patients</p>
          <div className={styles.search_con}>
            <input type="text" className={styles.search} placeholder="Search" />
            <div className={styles.icon_con}>
              <BsSearch className={styles.icon} />
            </div>
          </div>
        </div>
        <div className={styles.patients_listing}>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        fontWeight: "bold",
                        fontFamily: "Poppins",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, i) => {
                  return (
                    <TableRow hover tabIndex={-1} key={i}>
                      <TableCell
                        key={row?._id}
                        style={{ fontFamily: "Poppins" }}
                      >
                        {i + 1}
                      </TableCell>

                      <TableCell
                        align="right"
                        style={{ fontFamily: "Poppins" }}
                      >
                        <div className={styles.patient_pic}>
                          <NavLink
                            to={`../patient/${row?.p_mid}`}
                            style={{
                              textDecoration: "none",
                              margin: 0,
                            }}
                          >
                            <img
                              src="/assets/avatar.jpeg"
                              className={styles.img}
                            />{" "}
                          </NavLink>
                        </div>
                      </TableCell>

                      <TableCell style={{ fontFamily: "Poppins" }}>
                        <NavLink
                          to={`../patient/${row?.p_mid}`}
                          style={{
                            textDecoration: "none",
                            margin: 0,
                          }}
                        >
                          {" "}
                          {row?.p_name}
                        </NavLink>
                      </TableCell>

                      <TableCell style={{ fontFamily: "Poppins" }}>
                        {row?.p_address}
                      </TableCell>
                      <TableCell style={{ fontFamily: "Poppins" }}>
                        {row?.p_contact}
                      </TableCell>
                      <TableCell style={{ fontFamily: "Poppins" }}>
                        <span className={styles.gender}>{row.p_gender}</span>
                      </TableCell>
                      <TableCell
                        style={{ fontFamily: "Poppins" }}
                        align="center"
                      >
                        {row.p_bg}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default Patients;
