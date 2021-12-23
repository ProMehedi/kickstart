import { Icon, Message } from 'semantic-ui-react'

const InfoMessage = ({
  title = 'Oops! Something went wrong!',
  message,
  ...restProps
}) => {
  return (
    <Message negative {...restProps}>
      <Message.Header>
        <h4>
          <Icon name='warning circle' />
          {title}
        </h4>
      </Message.Header>
      {message && <p>{message}</p>}
    </Message>
  )
}

export default InfoMessage
