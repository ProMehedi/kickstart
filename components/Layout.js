import { Container, Grid } from 'semantic-ui-react'
import Header from './Header'

const Layout = ({ children, wider = false }) => {
  return (
    <>
      <Header />
      <Container text={!wider}>
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
