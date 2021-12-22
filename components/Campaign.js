import Link from 'next/link'
import { Button, Card, Icon } from 'semantic-ui-react'

const Campaign = ({ data }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{data}</Card.Header>
        <Card.Meta>Address of Manager</Card.Meta>
        <Card.Description>
          The manager cretaed this campaign and can create requests to withdraw
          money.
        </Card.Description>
      </Card.Content>
      <Card.Content>
        <Link href={`/campaigns/${data}`} passHref>
          <Button basic icon labelPosition='right' color='green'>
            View Campaign
            <Icon name='right arrow' />
          </Button>
        </Link>
      </Card.Content>
    </Card>
  )
}

export default Campaign
