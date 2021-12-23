import Link from 'next/link'
import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { Layout } from '../../../../components'

const Requests = ({ address }) => {
  return (
    <Layout>
      <h1>List of Requests</h1>
      <Link href={`/campaigns/${address}/requests/new`} passHref>
        <Button basic icon labelPosition='right' color='blue' size='large'>
          Create New Request
          <Icon name='plus' />
        </Button>
      </Link>
    </Layout>
  )
}

export default Requests

export const getServerSideProps = ({ query }) => {
  const address = query.address

  return {
    props: {
      address,
    },
  }
}
