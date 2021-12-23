import React from 'react'
import { Button, Form, Icon } from 'semantic-ui-react'

const ContributeForm = ({ onSubmit, loading }) => {
  const [contribute, setContribute] = React.useState('')

  return (
    <Form onSubmit={() => onSubmit(contribute)}>
      <Form.Group widths='equal'>
        <Form.Field>
          <input
            type='number'
            placeholder='Amount (Ether)'
            step='any'
            onChange={(e) => setContribute(e.target.value)}
          />
        </Form.Field>
        <Form.Field style={{ width: 'auto' }}>
          <Button
            icon
            labelPosition='right'
            color='green'
            type='submit'
            loading={loading}
            disabled={loading}
          >
            Contribute
            <Icon name='plus' />
          </Button>
        </Form.Field>
      </Form.Group>
    </Form>
  )
}

export default ContributeForm
