import { Container, Grid } from 'semantic-ui-react'
import Header from './Header'

const Layout = ({ children, title }) => {
  return (
    <>
      <Header />
      <Container>
        <Grid centered>
          <Grid.Row>
            <Grid.Column width={10}>
              <div style={{ padding: '40px 0' }}>
                <h2>{title}</h2>
                {children}
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </>
  )
}

export default Layout
