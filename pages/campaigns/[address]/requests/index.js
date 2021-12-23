import Link from 'next/link'
import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { Layout } from '../../../../components'
import { campaignInstance } from '../../../../ethereum'

const Requests = ({ address, requests }) => {
  return (
    <Layout>
      <h1>List of Requests</h1>
      {requests.map((request, index) => (
        <div key={index}>
          <h3>{request.description}</h3>
        </div>
      ))}
      <Link href={`/campaigns/${address}/requests/new`} passHref>
        <Button
          basic
          icon
          labelPosition='right'
          color='blue'
          size='large'
          style={{ marginTop: 30 }}
        >
          Create New Request
          <Icon name='plus' />
        </Button>
      </Link>
    </Layout>
  )
}

export default Requests

export const getServerSideProps = async ({ query }) => {
  const address = query.address
  const reqCount = await campaignInstance(address)
    .methods.getRequestsCount()
    .call()
  let requests = []
  for (let i = 0; i < reqCount; i++) {
    const request = await campaignInstance(address).methods.request(i).call()
    // remove Object Key
    const requestObj = { ...request, id: i }
    requests.push(requestObj)
  }

  return { props: { address, requests } }
}
