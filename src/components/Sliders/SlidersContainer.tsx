import {connect} from "react-redux";
import {getBackgroundsList} from "../../store/Actions/SlidersActions";
import {RootState} from "../../store/redux-store";
import Slider from "./Slider";

type MapStatePropsType = {
    backgroundsList: Array<string>
}

type MapDispatchPropsType = {
    getBackgroundsList: () => void
}

type OwnPropsType = {}

let mapStateToProps = (state: RootState) => {
    return {
        backgroundsList: state.sliders.backgroundsList
    }
}

const SlidersContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, RootState>(
    mapStateToProps, {getBackgroundsList}
)(Slider)

export default SlidersContainer
export type SlidersPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType