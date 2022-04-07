import { useSelector } from 'react-redux';
import { RootState } from '../Store';

function useReduxSelector<TState = RootState, TSelected = unknown>(
    selector: (state: TState) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean,
): TSelected {
    return useSelector(selector, equalityFn);
}

export default useReduxSelector;
