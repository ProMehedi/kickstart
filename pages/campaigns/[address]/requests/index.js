import Link from 'next/link'
import React from 'react'
import { Button, Icon, Table } from 'semantic-ui-react'
import { Layout } from '../../../../components'
import { campaignInstance, web3 } from '../../../../ethereum'

const Requests = ({ address, requests, approvers }) => {
  console.log(approvers)
  return (
    <Layout>
      <h1>List of Requests</h1>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Recipient</Table.HeaderCell>
            <Table.HeaderCell>Approval Count</Table.HeaderCell>
            <Table.HeaderCell>Approve</Table.HeaderCell>
            <Table.HeaderCell>Finalize</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {requests.map((request) => (
            <Table.Row key={request.id}>
              <Table.Cell>{request.id + 1}</Table.Cell>
              <Table.Cell>{request.description}</Table.Cell>
              <Table.Cell>
                {web3.utils.fromWei(request.value, 'ether') + ' ETH'}
              </Table.Cell>
              <Table.Cell>{request.recipient}</Table.Cell>
              <Table.Cell>
                {request.approvalCount} / {approvers}
              </Table.Cell>
              <Table.Cell>
                <Button
                  basic
                  icon
                  labelPosition='right'
                  size='small'
                  color='green'
                  disabled={request.approvalCount > 0}
                >
                  <Icon name='checkmark' />
                  Approve
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  basic
                  icon
                  labelPosition='right'
                  size='small'
                  color='red'
                >
                  <Icon name='x' />
                  Finalize
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
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
  const approversCount = await campaignInstance(address)
    .methods.approversCount()
    .call()

  return { props: { address, requests, approvers: approversCount } }
}
