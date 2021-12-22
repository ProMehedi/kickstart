import { Container, Grid } from 'semantic-ui-react'
import Header from './Header'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container text>
        <Grid centered>
          <Grid.Row>
            <Grid.Column>
              <div style={{ padding: '40px 0' }}>{children}</div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </>
  )
}

export default Layout
