import { Card } from 'semantic-ui-react'
import { Layout } from '../../components'
import { campaignInstance } from '../../ethereum'

const Campaigns = ({ campaign }) => {
  console.log(campaign)
  return (
    <Layout title='Single Campaing'>
      <Card fluid>
        <Card.Content>
          <Card.Header>{campaign.manager}</Card.Header>
          <Card.Meta>Address of Manager</Card.Meta>
          <Card.Description>
            The manager cretaed this campaign and can create requests to
            withdraw money.
          </Card.Description>
        </Card.Content>
      </Card>
    </Layout>
  )
}

export default Campaigns

export const getServerSideProps = async ({ query }) => {
  const Campaign = campaignInstance(query.address)
  const campaignData = await Campaign.methods.getSummary().call()
  const campaign = {
    minContribute: campaignData[0],
    balance: campaignData[1],
    requestsCount: campaignData[2],
    approversCount: campaignData[3],
    manager: campaignData[4],
  }

  return {
    props: {
      campaign,
    },
  }
}
