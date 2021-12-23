import React from 'react'
import { useRouter } from 'next/router'
import { Icon, Message } from 'semantic-ui-react'
import { CampaignForm, Layout } from '../../components'
import { factoryInstance, web3 } from '../../ethereum'

const NewCampaign = () => {
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const router = useRouter()

  const createCampaign = async (minContribute) => {
    try {
      setLoading(true)
      const accounts = await web3.eth.getAccounts()
      await factoryInstance.methods.createCampaign(minContribute).send({
        from: accounts[0],
      })
      setLoading(false)

      // NextJs Back to homepage
      router.push('/')
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <Layout title='Create new Campaings'>
      <h1>Create New Campaign</h1>
      <CampaignForm onSubmit={createCampaign} loading={loading} />
      {error && (
        <Message negative>
          <Message.Header>
            <h4>
              <Icon name='warning circle' />
              Oops! Something went wrong!
            </h4>
          </Message.Header>
          <p>{error}</p>
        </Message>
      )}
    </Layout>
  )
}

export default NewCampaign
