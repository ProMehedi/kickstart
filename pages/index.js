import Link from 'next/link'
import { Button, Card, Icon } from 'semantic-ui-react'
import { Layout } from '../components'
import { factoryInstance } from '../ethereum/instance'

const Home = ({ campaigns }) => {
  return (
    <Layout title='Created Campaigns:'>
      {campaigns.map((campaign, index) => (
        <Card fluid key={index}>
          <Card.Content>
            <Card.Header>{campaign}</Card.Header>
          </Card.Content>
          <Card.Content>
            <Link href={`/campaigns/${campaign}`} passHref>
              <Button basic icon labelPosition='right' color='green'>
                View Campaign
                <Icon name='right arrow' />
              </Button>
            </Link>
          </Card.Content>
        </Card>
      ))}
    </Layout>
  )
}

export default Home

export const getServerSideProps = async () => {
  const campaigns = await factoryInstance.methods.getDeployedCampaigns().call()

  return {
    props: {
      campaigns,
    },
  }
}
