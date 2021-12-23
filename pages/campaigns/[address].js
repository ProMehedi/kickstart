import { useRouter } from 'next/router'
import React from 'react'
import { Card } from 'semantic-ui-react'
import { ContributeForm, Layout } from '../../components'
import { campaignInstance, web3 } from '../../ethereum'

const Campaign = ({ campaign }) => {
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const router = useRouter()

  const contribute = async (value) => {
    try {
      setLoading(true)
      const accounts = await web3.eth.getAccounts()
      await campaignInstance(campaign.address)
        .methods.contribute()
        .send({
          from: accounts[0],
          value: web3.utils.toWei(value, 'ether'),
        })
      setLoading(false)
      // Re-render the page
      router.replace(router.asPath)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <Layout title='Single Campaing'>
      <Card.Group itemsPerRow={2}>
        <Card fluid>
          <Card.Content>
            <Card.Header style={{ lineBreak: 'anywhere' }}>
              {campaign.manager}
            </Card.Header>
            <Card.Meta>Address of Manager</Card.Meta>
            <Card.Description>
              The manager cretaed this campaign and can create requests to
              withdraw money.
            </Card.Description>
          </Card.Content>
        </Card>
        <Card fluid>
          <Card.Content>
            <Card.Header>{campaign.minContribute}</Card.Header>
            <Card.Meta>Minimum Contribution(wei)</Card.Meta>
            <Card.Description>
              You must contribute at least this much wei to become an approver
            </Card.Description>
          </Card.Content>
        </Card>
        <Card fluid>
          <Card.Content>
            <Card.Header>{campaign.requestsCount}</Card.Header>
            <Card.Meta>Number of Requests</Card.Meta>
            <Card.Description>
              A request tries to withdraw money from the contract. Requests must
              be approved by approvers.
            </Card.Description>
          </Card.Content>
        </Card>
        <Card fluid>
          <Card.Content>
            <Card.Header>{campaign.approversCount}</Card.Header>
            <Card.Meta>Number of Approvers</Card.Meta>
            <Card.Description>
              Number of people who have already donated to this campaign.
            </Card.Description>
          </Card.Content>
        </Card>
        <Card fluid>
          <Card.Content>
            <Card.Header>{campaign.balance}</Card.Header>
            <Card.Meta>Campaign Balance</Card.Meta>
            <Card.Description>
              The balance is how much money this campaign has left to spend.
            </Card.Description>
          </Card.Content>
        </Card>
        <Card fluid>
          <Card.Content>
            <Card.Header>Contribute</Card.Header>
            <Card.Meta>Amount to Contribute</Card.Meta>
            <Card.Description>
              <ContributeForm onSubmit={contribute} loading={loading} />
              <h4>{error}</h4>
            </Card.Description>
          </Card.Content>
        </Card>
      </Card.Group>
    </Layout>
  )
}

export default Campaign

export const getServerSideProps = async ({ query }) => {
  const Campaign = campaignInstance(query.address)
  const campaignData = await Campaign.methods.getSummary().call()
  const campaign = {
    minContribute: campaignData[0],
    balance: campaignData[1],
    requestsCount: campaignData[2],
    approversCount: campaignData[3],
    manager: campaignData[4],
    address: query.address,
  }

  return {
    props: {
      campaign,
    },
  }
}
