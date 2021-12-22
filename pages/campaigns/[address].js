import { Layout } from '../../components'
import { campaignInstance } from '../../ethereum'

const Campaigns = ({ campaign }) => {
  console.log(campaign)
  return (
    <Layout title='Single Campaing'>
      <h1>Campaings</h1>
    </Layout>
  )
}

export default Campaigns

export const getServerSideProps = async ({ query }) => {
  const Campaign = campaignInstance(query.address)
  const campaign = await Campaign.methods.getSummary().call()
  console.log(campaign)

  return {
    props: {
      campaign,
    },
  }
}
