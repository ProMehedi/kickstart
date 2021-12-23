import React from 'react'
import { Button, Form, Icon } from 'semantic-ui-react'

const RequestForm = ({ onSubmit, loading }) => {
  const [request, setRequest] = React.useState({
    description: '',
    value: '',
    recipient: '',
  })

  const handleChange = (e) => {
    setRequest({
      ...request,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Form onSubmit={() => onSubmit(request)}>
      <Form.Field
        control='input'
        label='Description'
        name='description'
        placeholder='Description'
        onChange={handleChange}
      />
      <Form.Field
        control='input'
        label='Recipient'
        name='recipient'
        placeholder='Recipient'
        onChange={handleChange}
      />
      <Form.Field
        control='input'
        name='value'
        label='Value in Ether'
        type='number'
        placeholder='Amount (Ether)'
        step='any'
        onChange={handleChange}
      />
      <Form.Field style={{ width: 'auto' }}>
        <Button
          icon
          labelPosition='right'
          color='green'
          type='submit'
          loading={loading}
          disabled={loading}
        >
          Create Request
          <Icon name='plus' />
        </Button>
      </Form.Field>
    </Form>
  )
}

export default RequestForm
