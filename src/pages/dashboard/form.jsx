import React, { useEffect, useState } from 'react';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';


export default function FormDashboard({ actionForm, data, setModalVisible, updatedId }) {
  const initialFormValue = {
    name: '',
    stock: 0,
    price: 0,
    book: 0,
    bookedBy: '',
    date: '',
    picture: '',
  };

  const [form, setForm] = useState(initialFormValue);

  const createData = async () => {
    await axios
      .post("http://localhost:8080/armada", form)
      .then(() => {
        data.push(form);
      })
      .catch((err) => alert(err));
    setModalVisible(false);
  };

  const updateData = async () => {
    await axios
      .put(`http://localhost:8080/armada/${updatedId}`, form)
      .then(() => {
        const updatedDataIndex = data.findIndex((p) => p.id === updatedId);
        data[updatedDataIndex] = form;
      })
      .catch((err) => console.error(err));
    setModalVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (actionForm === 'create') return createData();
    return updateData();
  };

  useEffect(() => {
    if (actionForm === 'edit') {
      const editedData = Object.assign(
        {},
        data.find(v => v.id === updatedId)
      )
      delete editedData.id;
      setForm(editedData);
    }
  }, [data, updatedId, actionForm]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {Object.keys(form).map((key, idx) => (
          <div key={idx}>
            <FormGroup>
              <Label>{key}</Label>
              <Input
                type={key === "name" || key === "picture" ? "text" : "number"}
                value={form[key]}
                placeholder={key}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    [key]: e.target.value,
                  }))
                }
              />
            </FormGroup>
          </div>
        ))}
        <br />
        <Button color="primary" type="submit">
          Submit
        </Button>{' '}
        <Button onClick={() => setModalVisible(false)}>Cancel</Button>
      </form>
    </div>
  );
}
