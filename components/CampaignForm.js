import React from 'react'
import { Button, Form, Icon } from 'semantic-ui-react'

const CampaignForm = ({ onSubmit }) => {
  const [contribute, setContribute] = React.useState(0)

  const values = {
    contribute,
  }

  return (
    <Form onSubmit={() => onSubmit(values)}>
      <Form.Group widths='equal'>
        <Form.Field
          control='input'
          type='number'
          placeholder='Minimum Contribution'
          onChange={(e) => setContribute(e.target.value)}
        />
        <Form.Field style={{ width: 'auto' }}>
          <Button icon labelPosition='right' color='green' type='submit'>
            Create
            <Icon name='plus' />
          </Button>
        </Form.Field>
      </Form.Group>
    </Form>
  )
}

export default CampaignForm
