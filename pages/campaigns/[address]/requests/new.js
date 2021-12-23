import Link from 'next/link'
import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { InfoMessage, Layout, RequestForm } from '../../../../components'
import { campaignInstance, web3 } from '../../../../ethereum'

const NewRequests = ({ address }) => {
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const makeRequest = async (request) => {
    const { description, value, recipient } = request
    try {
      setLoading(true)
      const accounts = await web3.eth.getAccounts()
      await campaignInstance(address)
        .methods.createRequest(
          description,
          web3.utils.toWei(value, 'ether'),
          recipient
        )
        .send({
          from: accounts[0],
        })
      setLoading(false)
      setError('')
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <Layout>
      <h1>Requests!</h1>
      <RequestForm onSubmit={makeRequest} loading={loading} />
      {error && <InfoMessage error={error} />}
      <Link href={`/campaigns/${address}/requests`} passHref>
        <Button
          basic
          icon
          labelPosition='left'
          size='large'
          color='blue'
          style={{ marginTop: 30 }}
        >
          Back to Requests
          <Icon name='left arrow' />
        </Button>
      </Link>
    </Layout>
  )
}

export default NewRequests

export const getServerSideProps = ({ query }) => {
  const address = query.address

  return {
    props: {
      address,
    },
  }
}
