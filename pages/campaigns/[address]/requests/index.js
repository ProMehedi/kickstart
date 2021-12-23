import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Button, Icon, Table } from 'semantic-ui-react'
import { InfoMessage, Layout } from '../../../../components'
import { campaignInstance, web3 } from '../../../../ethereum'

const Requests = ({ address, requests, approvers }) => {
  const [error, setError] = React.useState('')
  const [approveLoading, setApproveLoading] = React.useState(false)
  const [finalizeLoading, setFinalizeLoading] = React.useState(false)
  const [id, setId] = React.useState(null)

  const router = useRouter()

  // Approve a request
  const onApprove = async (id) => {
    setId(id)
    try {
      setApproveLoading(true)
      const accounts = await web3.eth.getAccounts()
      await campaignInstance(address).methods.approveRequest(id).send({
        from: accounts[0],
      })
      // Re-render the page
      router.replace(router.asPath)

      setApproveLoading(false)
    } catch (err) {
      setError(err.message)
      setApproveLoading(false)
    }
  }

  // Finalize a request
  const onFinalize = async (id) => {
    setId(id)
    try {
      setFinalizeLoading(true)
      const accounts = await web3.eth.getAccounts()
      await campaignInstance(address).methods.finalizeRequest(id).send({
        from: accounts[0],
      })
      // Re-render the page
      router.replace(router.asPath)

      setFinalizeLoading(false)
    } catch (err) {
      setError(err.message)
      setFinalizeLoading(false)
    }
  }

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
                  disabled={
                    request.approvalCount > 0 ||
                    (approveLoading && request.id === id)
                  }
                  loading={approveLoading && request.id === id}
                  onClick={() => onApprove(request.id)}
                >
                  <Icon name='checkmark' />
                  Approve
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  icon
                  labelPosition='right'
                  size='small'
                  color='green'
                  disabled={
                    request.approvalCount !== approvers ||
                    (finalizeLoading && request.id === id) ||
                    request.complete
                  }
                  loading={finalizeLoading && request.id === id}
                  onClick={() => onFinalize(request.id)}
                >
                  <Icon name='check circle' />
                  Finalize
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {error && <InfoMessage message={error} />}
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
