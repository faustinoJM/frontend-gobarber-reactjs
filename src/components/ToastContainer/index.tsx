import { ToastMessage } from "../../hooks/toast";
import { Container } from "./styles";
import { useTransition } from '@react-spring/web'
import Toast from "./Toast";

interface ToastContainerProps {
  messages: ToastMessage[]
}

export default function ToastContainer({ messages }: ToastContainerProps) {
  // const { removeToast } = useToast();
  const messagesWithTransitions = useTransition(
    messages,
    {
      keys: (message) => message.id,
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1},
      leave: { right: '-120%', opacity: 0 },
    },
  )

  return (
    <Container>
      { messagesWithTransitions((style, item, props) => (
        <Toast key={props.key} style={style} message={item} />
        )    
      )}
    </Container>
  )
}
