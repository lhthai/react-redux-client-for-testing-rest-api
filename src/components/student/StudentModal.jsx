import React, { useEffect } from "react"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Col
} from "reactstrap"
import { useState } from "react"
const initialState = {
  name: "",
  email: "",
  document: "",
  phone: ""
}
const StudentModal = ({
  modal,
  toggle,
  createItem,
  updateItem,
  currentItem,
  isEditing
}) => {
  const [item, setItem] = useState(initialState)

  useEffect(() => {
    setItem(currentItem)
  }, [currentItem])

  const handleChange = e => {
    const { name, value } = e.target
    setItem({ ...item, [name]: value })
  }

  const handleSubmit = () => {
    if (isEditing) {
      updateItem(item)
    } else {
      createItem(item)
    }
    setItem(initialState)
    toggle()
  }

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        {isEditing ? "Update" : "Create"} Item
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup row>
            <Label sm={2}>Name</Label>
            <Col sm={10}>
              <Input
                type="text"
                name="name"
                value={item.name}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>Email</Label>
            <Col sm={10}>
              <Input
                type="email"
                name="email"
                value={item.email}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>Document</Label>
            <Col sm={10}>
              <Input
                type="text"
                name="document"
                value={item.document}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2}>Phone</Label>
            <Col sm={10}>
              <Input
                type="text"
                name="phone"
                value={item.phone}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
          {isEditing ? "Update" : "Create"}
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default StudentModal
