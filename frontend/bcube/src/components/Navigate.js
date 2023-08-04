import { useNavigate } from 'react-router-dom';
export  const withNavigateHook = (Component) => {
    return (props) => {
        const navigation = useNavigate();
  
        return <Component navigation={navigation} {...props} />
    }
  }

