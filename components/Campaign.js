import Link from 'next/link'
import { Button, Card, Icon } from 'semantic-ui-react'

const Campaign = ({ data }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{data}</Card.Header>
        <Card.Meta>Co-Worker</Card.Meta>
        <Card.Description>
          Matthew is a pianist living in Nashville.
        </Card.Description>
      </Card.Content>
      <Card.Content>
        <Link href='/campaigns' passHref>
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
