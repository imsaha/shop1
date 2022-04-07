import { useDispatch } from 'react-redux';
import { AppDispatch } from '../Store';
const useReduxDispatch = () => {
    return useDispatch<AppDispatch>();
};

export default useReduxDispatch;
