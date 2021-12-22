import React from 'react'
import { Icon, Message } from 'semantic-ui-react'
import { CampaignForm, Layout } from '../../components'
import { factoryInstance, web3 } from '../../ethereum'

const NewCampaign = () => {
  const [error, setError] = React.useState('')

  const createCampaign = async (minContribute) => {
    try {
      const accounts = await web3.eth.getAccounts()
      await factoryInstance.methods.createCampaign(minContribute).send({
        from: accounts[0],
      })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Layout title='Create new Campaings'>
      <CampaignForm onSubmit={createCampaign} />
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
