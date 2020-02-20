import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Card,
  CardBody,
  CardHeader,
  Spinner
} from "reactstrap"

import StudentModal from "./StudentModal"
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent
} from "../../actions/studentActions"
const initialState = {
  name: "",
  email: "",
  document: "",
  phone: ""
}

const StudentList = () => {
  const dispatch = useDispatch()
  const students = useSelector(state => state.students.data)
  const isLoading = useSelector(state => state.students.loading)
  const [modal, setModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentItem, setCurrentItem] = useState(initialState)

  useEffect(() => {
    dispatch(getStudents())
  }, [dispatch])

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Card>
            <CardHeader>Students</CardHeader>
            <CardBody>
              <Button
                color="primary"
                className="mb-2"
                onClick={() => setModal(!modal)}
              >
                Create
              </Button>
              {isLoading ? (
                <div className="text-center mx-auto">
                  <Spinner color="primary" />
                </div>
              ) : (
                <Table dark>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Document</th>
                      <th>Phone</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map(item => {
                      return (
                        <tr key={item.pk}>
                          <th scope="row">{item.pk}</th>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.document}</td>
                          <td>{item.phone}</td>
                          <td className="d-flex">
                            <Button
                              color="warning"
                              className="mr-2"
                              onClick={() => {
                                setIsEditing(true)
                                setModal(!modal)
                                setCurrentItem(item)
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              color="danger"
                              onClick={() => dispatch(deleteStudent(item.pk))}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
      <StudentModal
        modal={modal}
        toggle={() => {
          setModal(!modal)
          setIsEditing(false)
          setCurrentItem(initialState)
        }}
        createItem={item => dispatch(createStudent(item))}
        updateItem={item => dispatch(updateStudent(item))}
        currentItem={currentItem}
        isEditing={isEditing}
      />
    </Container>
  )
}

export default StudentList
